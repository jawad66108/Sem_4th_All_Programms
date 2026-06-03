.data
str1: .asciiz "OPEN"
str2: .asciiz "OPEN"
equalMsg: .asciiz "Equal\n"
notEqualMsg: .asciiz "Not Equal\n"
NAME: .asciiz "JAWAD"

.text
.globl main

main:
    la $a0, str1
    la $a1, str2
    jal compareStrings

    la $a0, NAME
    jal strLength

    move $a0, $v0
    li $v0, 1
    syscall

    li $v0, 10
    syscall

compareStrings:
loop1:
    lb $t0, 0($a0)
    lb $t1, 0($a1)

    bne $t0, $t1, notEqual
    beq $t0, $zero, equal

    addi $a0, $a0, 1
    addi $a1, $a1, 1
    j loop1

equal:
    li $v0, 4
    la $a0, equalMsg
    syscall
    jr $ra

notEqual:
    li $v0, 4
    la $a0, notEqualMsg
    syscall
    jr $ra

strLength:
    li $t0, 0

loop2:
    lb $t1, 0($a0)
    beq $t1, $zero, done

    addi $t0, $t0, 1
    addi $a0, $a0, 1
    j loop2

done:
    move $v0, $t0
    jr $ra