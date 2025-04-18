'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      membershipId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
    await queryInterface.createTable('leaderboard', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers', // References the customers table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },

    });

    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      isRedeemed: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      redeemedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers', // References the customers table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },

    });

    await queryInterface.createTable('quizQuestions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      publishDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },

    });
    await queryInterface.createTable('quizQuestionOptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      optionLabel: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      optionText: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isCorrect: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      questionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'quizQuestions', // References the quizQuestions table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },

    });
    await queryInterface.createTable('quizSelectedByUser', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers', // References the customers table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      selectedOptionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quizQuestionOptions', // References the quizQuestionOptions table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      questionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'quizQuestions', // References the quizQuestions table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isCorrect: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },

    });

    // await queryInterface.createTable('accounts', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   username: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     unique: true,
    //   },
    //   password: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   mobile: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   },
    //   resetToken: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   },
    //   mobileVerified: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false,
    //     allowNull: false,
    //   },
    //   emailVerified: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false,
    //     allowNull: false,
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: true,
    //   },
    // });

    // await queryInterface.createTable('accessRoles', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   name: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     unique: true,
    //   },
    //   all: {
    //     type: Sequelize.TINYINT,
    //     defaultValue: 0,
    //     allowNull: false,
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: true,
    //   },
    // });

    // // Add the unique index for name
    // await queryInterface.addIndex('accessRoles', ['name'], {
    //   unique: true,
    //   name: 'coyRoleName',
    // });

    // await queryInterface.createTable('accessRoleRights', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   accessRoleId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'accessRoles', // References the accessRoles table
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   accessClassName: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   key: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: true,
    //   },
    // });

    // Add unique index for (accessRoleId, accessClassName, key)
    // await queryInterface.addIndex(
    //   'accessRoleRights',
    //   ['accessRoleId', 'accessClassName', 'key'],
    //   {
    //     unique: true,
    //     name: 'roleRights',
    //   }
    // );
    // await queryInterface.createTable('brands', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   brandName: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     unique: true,
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: true,
    //   },
    // });
    // await queryInterface.createTable('models', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   modelName: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   brandId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'brands', // References the brands table
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },

    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: true,
    //   },
    // });
    // await queryInterface.createTable('userProfiles', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   status: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     defaultValue: 'active',
    //   },
    //   firstName: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   lastName: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   email: {
    //     type: Sequelize.STRING,
    //   },
    //   contact: {
    //     type: Sequelize.STRING,
    //     unique: true,
    //   },
    //   role: {
    //     type: Sequelize.STRING,
    //   },
    //   accountId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'accounts', // References the accounts table
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //     unique: true, // Ensuring a 1-to-1 relationship
    //   },
    //   accessRoleId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'accessRoles',
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE, // Enables soft deletes
    //   },
    // });

    // await queryInterface.createTable('adminProfiles', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   name: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   email: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   jwtVersion: {
    //     type: Sequelize.INTEGER,
    //     defaultValue: 0,
    //   },
    //   accountId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     unique: true, // Enforcing 1-to-1 relationship
    //     references: {
    //       model: 'accounts', // References the accounts table
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE, // Enables soft deletes
    //   },
    // });

    // await queryInterface.createTable('jwts', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   status: {
    //     type: Sequelize.TEXT,
    //     allowNull: false,
    //     defaultValue: 'ACTIVE',
    //   },
    //   token: {
    //     type: Sequelize.TEXT,
    //     allowNull: false,
    //   },
    //   expire: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   profileType: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   adminProfileId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references: {
    //       model: 'adminProfiles',
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   userProfileId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references: {
    //       model: 'userProfiles',
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   customerId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references: {
    //       model: 'customers',
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE, // Enables soft deletes
    //     allowNull: true,
    //   },
    // });

    // await queryInterface.createTable('modelLogs', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   ip: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   profileId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //   },
    //   profileType: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   docType: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   docId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //   },
    //   parentDocId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //   },
    //   pastData: {
    //     type: Sequelize.TEXT,
    //     allowNull: true,
    //   },
    //   newData: {
    //     type: Sequelize.TEXT,
    //     allowNull: true,
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: true,
    //   },
    // });

    // // Add indexes
    // await queryInterface.addIndex('modelLogs', ['docId']);
    // await queryInterface.addIndex('modelLogs', ['profileId']);

    // await queryInterface.createTable('apiAccessLogs', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   },
    //   ip: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   profileId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //   },
    //   profileType: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   path: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false,
    //     defaultValue: Sequelize.literal(
    //       'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    //     ),
    //   },
    //   deletedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: true,
    //   },
    // });

    // Add index
  //   await queryInterface.addIndex('apiAccessLogs', ['profileId']);
  },


  async down(queryInterface, Sequelize) {
    // Drop tables in order that respects dependency ordering
    // await queryInterface.dropTable('jwts');
    // await queryInterface.dropTable('adminProfiles');
    // await queryInterface.dropTable('userProfiles');
    // await queryInterface.dropTable('accounts');
    await queryInterface.dropTable('quizSelectedByUser');
    await queryInterface.dropTable('quizQuestionOptions');
    await queryInterface.dropTable('quizQuestions');
    await queryInterface.dropTable('leaderboard');
    await queryInterface.dropTable('coupons');
    await queryInterface.dropTable('customers');

    // await queryInterface.dropTable('accessRoleRights');
    // await queryInterface.dropTable('accessRoles');
    // await queryInterface.dropTable('modelLogs');
    // await queryInterface.dropTable('apiAccessLogs');
  }
};
