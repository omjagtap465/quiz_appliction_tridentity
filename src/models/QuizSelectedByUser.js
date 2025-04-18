export default (sequelize, DataTypes) => {
    const QuizSelectedByUser = sequelize.define(
      'quizSelectedByUser',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        customerId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        questionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        
        selectedOptionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isCorrect: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
        
        
        
      },
      {
        paranoid: true, // Enables soft deletes
        timestamps: true, // Enables createdAt and updatedAt
        tableName: 'quizSelectedByUser',
        indexes: [],
      }
    );
    QuizSelectedByUser.associate = (models) => {
        QuizSelectedByUser.belongsTo(models.QuizQuestionOptions, {
        foreignKey: "selectedOptionId",
        as: "quizQuestionOptions",
      });
    };
    QuizSelectedByUser.associate = (models) => {
        QuizSelectedByUser.belongsTo(models.QuizQuestions, {
        foreignKey: "questionId",
        as: "quizQuestions",
      });
    };
    QuizSelectedByUser.associate = (models) => {
        QuizSelectedByUser.belongsTo(models.Customers, {
        foreignKey: "customerId",
        as: "customers",
      });
    };
  
  
    return QuizSelectedByUser;
  };
  