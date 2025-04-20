
LOAD DATA  LOCAL INFILE 'C:\\Users\\lenovo\\Downloads\\questions.csv'
INTO TABLE questionsAndAnswers
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(question, quizReleaseDate, correctAnswer, otherOptions1,otherOptions2);

