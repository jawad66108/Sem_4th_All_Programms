-- create table Employee1 (
--emp_Id int unique,
--emp_name varchar(20),
--emp_salary int,
--emp_dep varchar(25),
--);

--insert into Employee1 values
--(108,'Jawad',500000,'CS'),
--(116,'Hammad',150000,'CY'),
--(120,'Ali',200500,'AI'); 

create index idx_dep
on Employee1 (emp_dep);
