begin transaction;
update Accounts 
set Accname='updated'
where accid = 109;

commit transaction;

rollback