; stack.asm - Stack Management Module
; NASM syntax for Linux x86_64

section .data
    stack_size equ 256
    stack_start times stack_size dq 0
    stack_pointer dq 0
    
section .bss
    ; Space for stack operations
    
section .text
    global stack_push, stack_pop, stack_peek, stack_get_pointer
    global stack_reset, stack_get_size, stack_is_empty, stack_is_full
    global stack_get_all, stack_get_capacity, stack_start, stack_pointer

; void stack_push(quad value)
stack_push:
    push rbp
    mov rbp, rsp
    
    ; Check for overflow
    mov rax, [stack_pointer]
    cmp rax, stack_size
    jge .overflow
    
    ; Push value onto stack
    mov rcx, rdi ; Get argument (value)
    mov rbx, stack_start
    mov [rbx + rax * 8], rcx  ; Store at stack[pointer]
    inc qword [stack_pointer] ; Increment pointer
    
    mov rax, 1  ; Success
    pop rbp
    ret
    
.overflow:
    mov rax, 0  ; Overflow error
    pop rbp
    ret

; quad stack_pop(void)
stack_pop:
    push rbp
    mov rbp, rsp
    
    ; Check for underflow
    mov rax, [stack_pointer]
    cmp rax, 0
    jle .underflow
    
dec qword [stack_pointer]
mov rax, [stack_pointer]   ; ← get the NEW decremented value
mov rbx, stack_start
mov rax, [rbx + rax * 8]  ; ← now reads correct slot
    
    pop rbp
    ret
    
.underflow:
    mov rax, 0  ; Underflow error
    pop rbp
    ret

; quad stack_peek(offset) - offset 0 = top
stack_peek:
    push rbp
    mov rbp, rsp
    
    mov rax, [stack_pointer]
    cmp rax, 0
    jle .underflow
    
    mov rcx, rdi ; offset
    sub rax, 1
    sub rax, rcx
    
    cmp rax, 0
    jl .underflow
    
    mov rbx, stack_start
    mov rax, [rbx + rax * 8]
    
    pop rbp
    ret
    
.underflow:
    mov rax, 0
    pop rbp
    ret

; void stack_reset(void)
stack_reset:
    push rbp
    mov rbp, rsp
    
    mov qword [stack_pointer], 0
    
    pop rbp
    ret

; quad stack_get_pointer(void)
stack_get_pointer:
    mov rax, [stack_pointer]
    ret

; quad stack_get_size(void)
stack_get_size:
    mov rax, [stack_pointer]
    ret

; bool stack_is_empty(void)
stack_is_empty:
    mov rax, [stack_pointer]
    cmp rax, 0
    je .empty
    mov rax, 0
    ret
.empty:
    mov rax, 1
    ret

; bool stack_is_full(void)
stack_is_full:
    mov rax, [stack_pointer]
    cmp rax, stack_size
    je .full
    mov rax, 0
    ret
.full:
    mov rax, 1
    ret

; quad* stack_get_all(void)
stack_get_all:
    mov rax, stack_start
    ret

; quad stack_get_capacity(void)
stack_get_capacity:
    mov rax, stack_size
    ret