.data
num:    .word 7
result: .word 0
msg:    .asciiz "The square is: "

.text
.globl main

main:
    lw $a0, num
    jal square
    sw $v0, result

    li $v0, 4
    la $a0, msg
    syscall

    li $v0, 1
    lw $a0, result
    syscall

    li $v0, 10
    syscall

square:
    mul $v0, $a0, $a0
    jr $ra
