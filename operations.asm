; ============================================================
; operations.asm — Module 2: Arithmetic & Stack Operations
; Member 2 — Instruction Execution & Arithmetic Engine
; NASM x86-64 Linux
; ============================================================

section .data
    err_div_zero    db '[ERROR] Division by zero!', 10, 0
    err_div_len     equ 26

section .text
    extern stack_push, stack_pop, stack_peek
    extern stack_is_empty, stack_pointer, stack_start

    global op_add, op_sub, op_mul, op_div, op_mod
    global op_dup, op_drop, op_swap, op_over, op_rot
    global op_dot, op_emit, op_cr, op_space
    global op_print_stack, op_clear

; ============================================================
; HELPER — print null-terminated string at rsi
; ============================================================
print_string:
    push rax
    push rdx
    mov rdx, 0
.len:
    cmp byte [rsi + rdx], 0
    je  .got
    inc rdx
    jmp .len
.got:
    mov rax, 1
    mov rdi, 1
    syscall
    pop rdx
    pop rax
    ret

; ============================================================
; HELPER — print number in rax as decimal
; ============================================================
section .bss
    num_buf resb 32

section .text
print_number:
    push rbp
    mov  rbp, rsp
    push rbx
    push rcx
    push rdx
    push rsi

    ; handle negative
    push rax
    test rax, rax
    jns  .positive
    neg  rax
    push rax
    mov  rsi, minus_chr
    call print_string
    pop  rax
    jmp  .convert

.positive:
    pop  rax

.convert:
    mov  rcx, 10
    lea  rbx, [num_buf + 31]
    mov  byte [rbx], 0
    dec  rbx

.digit_loop:
    xor  rdx, rdx
    div  rcx
    add  dl, '0'
    mov  [rbx], dl
    dec  rbx
    test rax, rax
    jnz  .digit_loop

    inc  rbx
    mov  rsi, rbx
    call print_string

    pop  rsi
    pop  rdx
    pop  rcx
    pop  rbx
    pop  rbp
    ret

; ============================================================
; op_add — a b → a+b
; ============================================================
op_add:
    push rbp
    mov  rbp, rsp
    call stack_pop      ; rax = b
    mov  rbx, rax
    call stack_pop      ; rax = a
    add  rax, rbx
    mov  rdi, rax
    call stack_push
    pop  rbp
    ret

; ============================================================
; op_sub — a b → a-b
; ============================================================
op_sub:
    push rbp
    mov  rbp, rsp
    call stack_pop      ; rax = b
    mov  rbx, rax
    call stack_pop      ; rax = a
    sub  rax, rbx
    mov  rdi, rax
    call stack_push
    pop  rbp
    ret

; ============================================================
; op_mul — a b → a*b
; ============================================================
op_mul:
    push rbp
    mov  rbp, rsp
    call stack_pop      ; rax = b
    mov  rbx, rax
    call stack_pop      ; rax = a
    imul rax, rbx
    mov  rdi, rax
    call stack_push
    pop  rbp
    ret

; ============================================================
; op_div — a b → a/b  (with divide-by-zero protection)
; ============================================================
op_div:
    push rbp
    mov  rbp, rsp
    call stack_pop      ; rax = b (divisor)
    mov  rbx, rax
    test rbx, rbx
    jnz  .safe
    mov  rsi, err_div_zero
    call print_string
    pop  rbp
    ret
.safe:
    call stack_pop      ; rax = a (dividend)
    xor  rdx, rdx
    div  rbx            ; rax = quotient
    mov  rdi, rax
    call stack_push
    pop  rbp
    ret

; ============================================================
; op_mod — a b → a%b
; ============================================================
op_mod:
    push rbp
    mov  rbp, rsp
    call stack_pop      ; rax = b
    mov  rbx, rax
    test rbx, rbx
    jnz  .safe
    mov  rsi, err_div_zero
    call print_string
    pop  rbp
    ret
.safe:
    call stack_pop      ; rax = a
    xor  rdx, rdx
    div  rbx            ; rdx = remainder
    mov  rdi, rdx
    call stack_push
    pop  rbp
    ret

; ============================================================
; op_dup — a → a a
; ============================================================
op_dup:
    push rbp
    mov  rbp, rsp
    xor  rdi, rdi
    call stack_peek     ; rax = top value
    mov  rdi, rax
    call stack_push
    pop  rbp
    ret

; ============================================================
; op_drop — a b → a
; ============================================================
op_drop:
    push rbp
    mov  rbp, rsp
    call stack_pop
    pop  rbp
    ret

; ============================================================
; op_swap — a b → b a
; ============================================================
op_swap:
    push rbp
    mov  rbp, rsp
    call stack_pop      ; rax = b
    mov  rbx, rax
    call stack_pop      ; rax = a
    mov  rcx, rax
    mov  rdi, rbx
    call stack_push     ; push b
    mov  rdi, rcx
    call stack_push     ; push a
    pop  rbp
    ret

; ============================================================
; op_over — a b → a b a
; ============================================================
op_over:
    push rbp
    mov  rbp, rsp
    mov  rdi, 1
    call stack_peek     ; rax = second item (a)
    mov  rdi, rax
    call stack_push
    pop  rbp
    ret

; ============================================================
; op_rot — a b c → b c a
; ============================================================
op_rot:
    push rbp
    mov  rbp, rsp
    call stack_pop      ; rax = c
    mov  rbx, rax
    call stack_pop      ; rax = b
    mov  rcx, rax
    call stack_pop      ; rax = a
    mov  rdx, rax
    mov  rdi, rcx
    call stack_push     ; push b
    mov  rdi, rbx
    call stack_push     ; push c
    mov  rdi, rdx
    call stack_push     ; push a
    pop  rbp
    ret

; ============================================================
; op_dot — print top of stack
; ============================================================
op_dot:
    push rbp
    mov  rbp, rsp
    call stack_pop
    call print_number
    mov  rsi, newline_str
    call print_string
    pop  rbp
    ret

; ============================================================
; op_emit — print top as ASCII char
; ============================================================
op_emit:
    push rbp
    mov  rbp, rsp
    call stack_pop
    mov  [emit_buf], al
    mov  byte [emit_buf+1], 0
    mov  rsi, emit_buf
    call print_string
    pop  rbp
    ret

; ============================================================
; op_cr — print newline
; ============================================================
op_cr:
    push rbp
    mov  rbp, rsp
    mov  rsi, newline_str
    call print_string
    pop  rbp
    ret

; ============================================================
; op_space — print space
; ============================================================
op_space:
    push rbp
    mov  rbp, rsp
    mov  rsi, space_str
    call print_string
    pop  rbp
    ret

; ============================================================
; op_print_stack — print all stack contents
; ============================================================
op_print_stack:
    push rbp
    mov  rbp, rsp
    push rbx
    push rcx

    mov  rcx, [stack_pointer]
    test rcx, rcx
    jnz  .print
    mov  rsi, empty_msg
    call print_string
    jmp  .done

.print:
    mov  rbx, 0
.loop:
    cmp  rbx, rcx
    jge  .done
    mov  rax, [stack_start + rbx*8]
    call print_number
    mov  rsi, space_str
    call print_string
    inc  rbx
    jmp  .loop

.done:
    mov  rsi, newline_str
    call print_string
    pop  rcx
    pop  rbx
    pop  rbp
    ret

; ============================================================
; op_clear — clear entire stack
; ============================================================
op_clear:
    push rbp
    mov  rbp, rsp
    mov  qword [stack_pointer], 0
    pop  rbp
    ret

; ============================================================
; DATA needed by this module
; ============================================================
section .data
    newline_str db 10, 0
    space_str   db ' ', 0
    empty_msg   db '<empty>', 10, 0
    minus_chr   db '-', 0

section .bss
    emit_buf resb 4