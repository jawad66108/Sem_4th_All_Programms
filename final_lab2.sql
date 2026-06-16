SET SERVEROUTPUT ON;

DECLARE
    v_cost NUMBER := 3500;
BEGIN
    IF v_cost > 5000 THEN
        DBMS_OUTPUT.PUT_LINE('Expensive');
    ELSIF v_cost >= 2000 THEN
        DBMS_OUTPUT.PUT_LINE('Moderate');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Cheap');
    END IF;
END;
/

