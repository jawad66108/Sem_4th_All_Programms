.data
p: .word 10
q: .word 5
r: .word 20
s: .word 4
newline: .asciiz "\n"

.text
main:
    lw $t0, p
    lw $t1, q
    lw $t2, r
    lw $t3, s

    mul $t4, $t0, $t1
    div $t2, $t3
    mflo $t5
    add $t6, $t4, $t5

    add $t7, $t0, $t2
    sub $t8, $t1, $t3
    mul $t9, $t7, $t8

    move $a0, $t6
    li $v0, 1
    syscall

    li $v0, 4
    la $a0, newline
    syscall

    move $a0, $t9
    li $v0, 1
    syscall

    li $v0, 10
    syscall