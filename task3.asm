.data
a: .asciiz "Original: "
res:   .asciiz "\nAfter Toggle: "

.text
.globl main
main:

li $t0, 24 


li $v0, 4
la $a0, a
syscall

li $v0, 1
move $a0, $t0
syscall

li $t1, 4        
xor $t2, $t0, $t1

li $v0, 4
la $a0, res
syscall

li $v0, 1
move $a0, $t2
syscall

li $v0, 10
syscall