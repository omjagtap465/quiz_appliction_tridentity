ALTER TABLE quizquestions
modify  COLUMN isBackUpQuestion BIGINT;


DELIMITER $$

CREATE PROCEDURE insert_img_url()
BEGIN 
  DECLARE i INT DEFAULT 1;

  REPEAT 
    INSERT INTO quizquestions (img_url)
    VALUES (CONCAT(i, '.jpg'));
    
    SET i = i + 1;
  UNTIL i > 60   
  END REPEAT;
END$$

DELIMITER ;
CALL insert_img_url();
