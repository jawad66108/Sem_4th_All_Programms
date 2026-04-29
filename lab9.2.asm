.data
.text
.globl main
main:
	li $t0 ,1

loop:

	li $v0 , 1
	move $a0 , $t0
	syscall

	
	
	addi $t0 , $t0 , 1
	
	beq $t0 ,6, label

	j loop

label:

	li $v0 ,10
	syscall