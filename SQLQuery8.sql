set transaction isolation level serializable;

BEGIN TRANSACTION;
UPDATE Student1 
SET Name = 'ali' 
WHERE Registration_Number = 110;
SAVE transaction p0;

UPDATE Student1 
SET Name = 'jawad' 
WHERE Registration_Number = 110;




