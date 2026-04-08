.data
prompt: .asciiz "Enter an integer: "
even_msg: .asciiz "The number is even.\n"
odd_msg: .asciiz "The number is odd.\n"

.text
main:
    li $v0, 4
    la $a0, prompt
    syscall
    li $v0, 5
    syscall
    move $t0, $v0
    andi $t1, $t0, 1
    beq $t1, $zero, even
    j odd
even:
    li $v0, 4
    la $a0, even_msg
    syscall
    j end
odd:
    li $v0, 4
    la $a0, odd_msg
    syscall
end:
    li $v0, 10
    syscall