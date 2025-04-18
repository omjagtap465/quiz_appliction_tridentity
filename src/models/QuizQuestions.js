export default (sequelize, DataTypes) => {
    const QuizQuestions = sequelize.define(
      'quizQuestions',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        question: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        publishDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        
        
      },
      {
        paranoid: true, // Enables soft deletes
        timestamps: true, // Enables createdAt and updatedAt
        tableName: 'quizQuestions',
        indexes: [],
      }
    );
    QuizQuestions.associate = (models) => {
        QuizQuestions.hasMany(models.QuizQuestionOptions, {
          foreignKey: "questionId",
          as: "quizQuestionOptions",
        });
    };
    QuizQuestions.associate = (models) => {
        QuizQuestions.hasMany(models.QuizSelectedByUser, {
          foreignKey: "questionId",
          as: "quizSelectedByUser",
        });
    };
  
  
    return QuizQuestions;
  };
  