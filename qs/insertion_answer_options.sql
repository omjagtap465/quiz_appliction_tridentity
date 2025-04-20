use trichain_db;

select * from questionsAndAnswers;
select correctAnswer,TRUE from questionsAndAnswers
union all 
select otherOptions1,FALSE from questionsAndAnswers ;
ALTER TABLE quizquestionoptions
MODIFY COLUMN optionLabel VARCHAR(255) NULL;

describe quizquestionoptions;
insert into quizquestionoptions
(
optionText,
isCorrect,
questionId
)
select correctAnswer,TRUE,id from questionsAndAnswers
union all 
select otherOptions1,FALSE,id from questionsAndAnswers 
union all 
select otherOptions2,FALSE,id from questionsAndAnswers ;


