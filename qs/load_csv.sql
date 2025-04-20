SET FOREIGN_KEY_CHECKS = 0;
use trichain_db;
drop table quizquestions;




CREATE TABLE `quizquestions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(255) NOT NULL,
  `publishDate` DATETIME  NULL,
    `isBackUpQuestion` BIGINT,
`imgUrl` varchar(255)  null ,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,

  `deletedAt` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
)AUTO_INCREMENT = 0;  
LOAD DATA  LOCAL INFILE 'C:\\Users\\lenovo\\Downloads\\questions.csv'
INTO TABLE questionsAndAnswers
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(question, quizReleaseDate, correctAnswer, otherOptions1,otherOptions2);
describe quizquestions;
describe questionsAndAnswers;
SHOW TABLE STATUS LIKE 'quizquestions';

/*
insertion of question and PublishDate in quizquestions table 
*/
insert into quizquestions
(
question ,
publishDate,
imgUrl,
isBackUpQuestion,
createdAt,
updatedAt
)
select question,
case 
  WHEN quizReleaseDate IS NOT NULL 
         AND quizReleaseDate != '' 
         THEN STR_TO_DATE(CONCAT(quizReleaseDate, ' 2025'), '%d %M %Y')  
    ELSE NULL
    end ,
    CONCAT(ROW_NUMBER() over (),'.jpg'),
    case 
    when 
    id > 60 
    then 1 
    ELSE  0
    END ,
      NOW(),  -- createdAt
  NOW() 
    
from questionsAndAnswers;

/*
insertion of options in quizquestionoptions table 
*/
insert into quizquestionoptions
(
optionText
)
select question,
case 
  WHEN quizReleaseDate IS NOT NULL 
         AND quizReleaseDate != '' 
         THEN STR_TO_DATE(CONCAT(quizReleaseDate, ' 2025'), '%d %M %Y')  
    ELSE NULL
    end 
from questionsAndAnswers;

select * from questionsAndAnswers;
select * from quizquestions;
select * from quizquestionoptions;
select id,questionId,optionText,isCorrect from quizquestionoptions 
where questionId = 59;
ALTER TABLE quizquestions AUTO_INCREMENT = 0;
SELECT MAX(id) FROM quizquestions;
