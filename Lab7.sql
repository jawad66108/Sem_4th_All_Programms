SET SERVEROUTPUT ON;

CREATE TABLE employee (
    emp_id NUMBER PRIMARY KEY,
    emp_name VARCHAR2(50),
    salary NUMBER
);

BEGIN
    INSERT INTO employee VALUES (101, 'Jawad', 50000);
    INSERT INTO employee VALUES (102, 'Hamza', 40000);
    COMMIT;
END;
/

DECLARE
    v_name employee.emp_name%TYPE;
    v_salary employee.salary%TYPE;
BEGIN
    SELECT emp_name, salary
    INTO v_name, v_salary
    FROM employee
    WHERE emp_id = 101;

    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name || ' Salary: ' || v_salary);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No employee found');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Multiple employees found');
END;
/


BEGIN
    INSERT INTO employee VALUES (103, 'Ali', 60000);
    COMMIT;
END;
/

BEGIN
    UPDATE employee
    SET salary = 65000
    WHERE emp_id = 103;
    COMMIT;
END;
/

BEGIN
    DELETE FROM employee
    WHERE emp_id = 102;
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE get_employee (
    p_id IN NUMBER
)
IS
    v_name VARCHAR2(50);
    v_salary NUMBER;
BEGIN
    SELECT emp_name, salary
    INTO v_name, v_salary
    FROM employee
    WHERE emp_id = p_id;

    DBMS_OUTPUT.PUT_LINE('Name: ' || v_name || ' Salary: ' || v_salary);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee not found');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Multiple employees found');
END;
/

BEGIN
    get_employee(101);
END;
/

DECLARE
    v_salary NUMBER := 30000;
BEGIN
    IF v_salary >= 40000 THEN
        DBMS_OUTPUT.PUT_LINE('High Salary');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Low Salary');
    END IF;
END;
/

DECLARE
    v_salary NUMBER := 55000;
BEGIN
    IF v_salary >= 70000 THEN
        DBMS_OUTPUT.PUT_LINE('Grade A');
    ELSE
        IF v_salary >= 50000 THEN
            DBMS_OUTPUT.PUT_LINE('Grade B');
        ELSE
            IF v_salary >= 30000 THEN
                DBMS_OUTPUT.PUT_LINE('Grade C');
            ELSE
                DBMS_OUTPUT.PUT_LINE('Low Grade');
            END IF;
        END IF;
    END IF;
END;
/

DECLARE
    v_salary NUMBER := 55000;
    v_grade CHAR(1);
BEGIN
    v_grade := CASE
        WHEN v_salary >= 70000 THEN 'A'
        WHEN v_salary >= 50000 THEN 'B'
        WHEN v_salary >= 30000 THEN 'C'
        ELSE 'D'
    END;

    DBMS_OUTPUT.PUT_LINE('Grade: ' || v_grade);
END;
/