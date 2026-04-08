.data
a: .word 10
b: .word 20
c: .word 0
msg: .asciiz "Result(c): "

.text
.globl main

main:
    lw $t0, a
    lw $t1, b

    add $t2, $t0, $t1

    sw $t2, c

    li $v0, 4
    la $a0, msg
    syscall

    lw $a0, c
    li $v0, 1
    syscall

    li $v0, 10
    syscall