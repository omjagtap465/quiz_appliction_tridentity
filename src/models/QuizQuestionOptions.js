export default (sequelize, DataTypes) => {
    const QuizQuestionOptions = sequelize.define(
      'quizQuestionOptions',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        optionLabel: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        optionText: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        isCorrect: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        questionId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
     
        
        
      },
      {
        paranoid: true, // Enables soft deletes
        timestamps: true, // Enables createdAt and updatedAt
        tableName: 'quizQuestionOptions',
        indexes: [],
      }
    );
    QuizQuestionOptions.associate = (models) => {
        QuizQuestionOptions.hasMany(models.QuizSelectedByUser, {
          foreignKey: "selectedOptionId",
          as: "quizSelectedByUser",
        });
    };
    QuizQuestionOptions.associate = (models) => {
        QuizQuestionOptions.belongsTo(models.QuizQuestions, {
        foreignKey: "questionId",
        as: "quizQuestions",
      });
    };
  
  
    return QuizQuestionOptions;
  };
  