.data
.text
.globl main

main:
    li $t0, 20

loop:
    li $v0, 1
    move $a0, $t0
    syscall

    addi $t0, $t0, -3
    bgtz $t0, loop

    li $v0, 10
    syscall
