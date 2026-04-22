.data
a: .word 33
e: .word 25
c: .word 11
d: .word 6

res1: .word 0
res2: .word 0
res3: .word 0

.text
.globl main
main:

lw $t0, a
lw $t1, e
lw $t2, c
lw $t3, d

add $t4, $t0, $t1
sub $t4, $t4, $t2
sw $t4, res1

mult $t0, $t3
mflo $t5
add $t5, $t5, $t2
sw $t5, res2

div $t1, $t2
mflo $t6
add $t6, $t6, $t3
sw $t6, res3

li $v0, 1
lw $a0, res1
syscall

li $v0, 11
li $a0, 10
syscall

li $v0, 1
lw $a0, res2
syscall

li $v0, 11
li $a0, 10
syscall

li $v0, 1
lw $a0, res3
syscall

li $v0, 10
syscall