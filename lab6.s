.data 
a : .word 15
c : .word 10
d : .asciiz "Multipying result: "

.text
.globl main

main:

lw $t0 , a
lw $t1 , c

mult $t0 , $t1
mflo $t2

li $v0, 4
la $a0 ,d
syscall

move $a0 , $t2
li $v0 ,1
syscall

li $v0 ,10
syscall
