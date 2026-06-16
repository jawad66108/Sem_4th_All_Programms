SET SERVEROUTPUT ON;

BEGIN
    FOR i IN 1..5 LOOP
        FOR j IN 1..i LOOP
            DBMS_OUTPUT.PUT('*');
        END LOOP;
        DBMS_OUTPUT.NEW_LINE;
    END LOOP;
END;
/

DECLARE
    CURSOR drone_cur IS
        SELECT DroneName
        FROM Drones;

    v_name VARCHAR2(50);
BEGIN
    OPEN drone_cur;

    LOOP
        FETCH drone_cur INTO v_name;
        EXIT WHEN drone_cur%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE(v_name);
    END LOOP;

    CLOSE drone_cur;
END;
/

CREATE TABLE Drones (
    DroneID NUMBER,
    DroneName VARCHAR2(50)
);
INSERT INTO Drones VALUES (1, 'SpaceX');
INSERT INTO Drones VALUES (2, 'NASA');
COMMIT;
DECLARE
    invalid_cost NUMBER;
BEGIN
    RAISE invalid_cost;
END;
/

CREATE INDEX idx_status
ON Delivery(Status);

SET SERVEROUTPUT ON;

DECLARE
    total NUMBER := 0;
BEGIN
    FOR i IN 1..10 LOOP
        total := total + i;
    END LOOP;

    DBMS_OUTPUT.PUT_LINE(total);
END;
/

