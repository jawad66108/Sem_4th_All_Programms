CREATE OR REPLACE PROCEDURE practice01
AS
    num NUMBER := 13;
BEGIN
    IF MOD(num,2) = 0 THEN
        DBMS_OUTPUT.PUT_LINE('Your number is even');
    ELSE
    DBMS_OUTPUT.PUT_LINE('IT IS NOT!!!');
    END IF;
END;
/

EXECUTE practice01

