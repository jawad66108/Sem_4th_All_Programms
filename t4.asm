.data
prompt: .asciiz "Enter an integer: "
prime_msg: .asciiz "The number is prime.\n"
not_prime_msg: .asciiz "The number is not prime.\n"

.text
main:
    li $v0, 4
    la $a0, prompt
    syscall
    li $v0, 5
    syscall
    move $t0, $v0
    li $t1, 2
check_loop:
    mul $t2, $t1, $t1
    bgt $t2, $t0, prime
    div $t0, $t1
    mfhi $t2
    beq $t2, $zero, not_prime
    addi $t1, $t1, 1
    j check_loop
prime:
    li $v0, 4
    la $a0, prime_msg
    syscall
    j end
not_prime:
    li $v0, 4
    la $a0, not_prime_msg
    syscall
end:
    li $v0, 10
    syscall