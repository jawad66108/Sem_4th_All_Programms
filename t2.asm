.data
newline: .asciiz "\n"

.text
main:
    li $t0, 2
loop:
    ble $t0, 20, print_even
    j end
print_even:
    move $a0, $t0
    li $v0, 1
    syscall
    li $v0, 4
    la $a0, newline
    syscall
    addi $t0, $t0, 2
    j loop
end:
    li $v0, 10
    syscallS