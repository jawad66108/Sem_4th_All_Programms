.data
str:    .asciiz "Jawad hussainf\n"

.text
.globl main

main:
    li $t0, 0

loop:
    jal printString

    addi $t0, $t0, 1
    bne $t0, 5, loop

    li $v0, 10
    syscall

printString:
    li $v0, 4
    la $a0, str
    syscall
    jr $ra
