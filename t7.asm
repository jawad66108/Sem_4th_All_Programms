.data
a: .word 37
b_v: .word 45
c: .word 12
d: .word 20
newline: .asciiz "\n"

.text
main:
    lw $t0, a
    lw $t1, b_v
    lw $t2, c
    lw $t3, d

    add $t4, $t0, $t1
    sub $t4, $t4, $t2

    mul $t5, $t0, $t3
    add $t5, $t5, $t2

    div $t1, $t2
    mflo $t6
    add $t6, $t6, $t3

    move $a0, $t4
    li $v0, 1
    syscall

    li $v0, 4
    la $a0, newline
    syscall

    move $a0, $t5
    li $v0, 1
    syscall

    li $v0, 4
    la $a0, newline
    syscall

    move $a0, $t6
    li $v0, 1
    syscall

    li $v0, 10
    syscall