.data
num: .word 108

.text
.globl main
main:

lw $t0, num     

addi $t0, $t0, 5

sw $t0, num

li $v0, 1
move $a0, $t0
syscall

li $v0, 10
syscall