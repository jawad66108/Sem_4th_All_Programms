DECLARE
    marks NUMBER := 83; 
    grade VARCHAR2(2);
BEGIN
    IF marks >= 90 THEN
        grade := 'A+';
    ELSIF marks >= 80 THEN
        grade := 'A';
    ELSIF marks >= 70 THEN
        grade := 'B';
    ELSIF marks >= 60 THEN
        grade := 'C';
    ELSIF marks >= 50 THEN
        grade := 'D';
    ELSE
        grade := 'F';
    END IF;

    DBMS_OUTPUT.PUT_LINE('Marks: ' || marks || ' | Grade: ' || grade);
END;
/

DECLARE
    age NUMBER := 17; -- Change this value to test eligibility
BEGIN
    IF age >= 18 THEN
        DBMS_OUTPUT.PUT_LINE('Age: ' || age || ' - Result: You are eligible.');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Age: ' || age || ' - Result: You are not eligible yet.');
    END IF;
END;
/
