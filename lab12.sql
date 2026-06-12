DROP TABLE employees CASCADE CONSTRAINTS;

-- Then recreate
CREATE TABLE employees (
    emp_id    NUMBER PRIMARY KEY,
    emp_name  VARCHAR2(50),
    salary    NUMBER(10,2),
    dept_id   NUMBER,
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

INSERT INTO employees VALUES (101, 'Ali Khan', 60000, 1);
INSERT INTO employees VALUES (102, 'Sara Ahmed', 55000, 1);
INSERT INTO employees VALUES (103, 'Bilal Hussain', 50000, 2);
INSERT INTO employees VALUES (104, 'Ayesha Malik', 52000, 2);
INSERT INTO employees VALUES (105, 'Usman Sheikh', 70000, 3);
INSERT INTO employees VALUES (106, 'Fatima Noor', 65000, 3);
INSERT INTO employees VALUES (107, 'Hamza Raza', 48000, 3);

COMMIT;

DECLARE
    CURSOR emp_cur IS
        SELECT emp_name, salary FROM employees;
    v_name   employees.emp_name%TYPE;
    v_salary employees.salary%TYPE;
BEGIN
    OPEN emp_cur;
    LOOP
        FETCH emp_cur INTO v_name, v_salary;
        EXIT WHEN emp_cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(v_name || ' - ' || v_salary);
    END LOOP;
    CLOSE emp_cur;
END;
/



DECLARE
    CURSOR dept_cur IS
        SELECT dept_id, dept_name FROM departments;
    CURSOR emp_cur(p_dept_id NUMBER) IS
        SELECT emp_name, salary FROM employees WHERE dept_id = p_dept_id;

    v_dept_id   departments.dept_id%TYPE;
    v_dept_name departments.dept_name%TYPE;
    v_emp_name  employees.emp_name%TYPE;
    v_salary    employees.salary%TYPE;
BEGIN
    OPEN dept_cur;
    LOOP
        FETCH dept_cur INTO v_dept_id, v_dept_name;
        EXIT WHEN dept_cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Department: ' || v_dept_name);

        OPEN emp_cur(v_dept_id);
        LOOP
            FETCH emp_cur INTO v_emp_name, v_salary;
            EXIT WHEN emp_cur%NOTFOUND;
            DBMS_OUTPUT.PUT_LINE('   ' || v_emp_name || ' - ' || v_salary);
        END LOOP;
        CLOSE emp_cur;
    END LOOP;
    CLOSE dept_cur;
END;
/

DECLARE
    CURSOR dept_cur IS
        SELECT dept_id, dept_name FROM departments;
    CURSOR emp_cur(p_dept_id NUMBER) IS
        SELECT COUNT(*) FROM employees WHERE dept_id = p_dept_id;

    v_dept_id   departments.dept_id%TYPE;
    v_dept_name departments.dept_name%TYPE;
    v_count     NUMBER;
BEGIN
    OPEN dept_cur;
    LOOP
        FETCH dept_cur INTO v_dept_id, v_dept_name;
        EXIT WHEN dept_cur%NOTFOUND;

        OPEN emp_cur(v_dept_id);
        FETCH emp_cur INTO v_count;
        CLOSE emp_cur;

        DBMS_OUTPUT.PUT_LINE('Department: ' || v_dept_name || 
                             ' | Total Employees: ' || v_count);
    END LOOP;
    CLOSE dept_cur;
END;
/
