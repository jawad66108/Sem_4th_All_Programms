.data
prompt: .asciiz "Enter n: "
newline: .asciiz "\n"

.text
main:
    li $v0, 4
    la $a0, prompt
    syscall
    li $v0, 5
    syscall
    move $t2, $v0
    li $t0, 0
    li $t1, 1
    li $t3, 0
fib_loop:
    bge $t3, $t2, end
    move $a0, $t0
    li $v0, 1
    syscall
    li $v0, 4
    la $a0, newline
    syscall
    add $t4, $t0, $t1
    move $t0, $t1
    move $t1, $t4
    addi $t3, $t3, 1
    j fib_loop
end:
    li $v0, 10
    syscall