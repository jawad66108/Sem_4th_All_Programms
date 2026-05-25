; controlflow.asm - Control Flow Operations (IF/ELSE/THEN, BEGIN/UNTIL)

section .data
    if_flag dq 0
    else_flag dq 0
    loop_counter dq 0
    return_stack times 64 dq 0
    return_sp dq 0
    
section .bss
    condition_result resb 1

section .text
    extern stack_pop, stack_push, stack_peek
    global control_if, control_else, control_then
    global control_begin, control_until, control_do, control_loop
    global control_push_return, control_pop_return

; void control_if(void)
control_if:
    push rbp
    mov rbp, rsp
    
    call stack_pop
    cmp rax, 0
    jne .true_branch
    
    ; Condition false - set IF flag
    mov qword [if_flag], 1
    jmp .done
    
.true_branch:
    mov qword [if_flag], 0
    
.done:
    pop rbp
    ret

; void control_else(void)
control_else:
    push rbp
    mov rbp, rsp
    
    ; Toggle between IF and ELSE
    cmp qword [if_flag], 0
    jne .in_if
    mov qword [if_flag], 1
    jmp .done
    
.in_if:
    mov qword [if_flag], 0
    
.done:
    pop rbp
    ret

; void control_then(void)
control_then:
    push rbp
    mov rbp, rsp
    
    ; Clear IF flag
    mov qword [if_flag], 0
    mov qword [else_flag], 0
    
    pop rbp
    ret

; void control_begin(void)
control_begin:
    push rbp
    mov rbp, rsp
    
    ; Store current position for loop
    ; In a full implementation, this would store an address
    ; For demo, we just set a marker
    
    pop rbp
    ret

; void control_until(void)
control_until:
    push rbp
    mov rbp, rsp
    
    call stack_pop
    cmp rax, 0
    jne .exit_loop
    
    ; Loop again - would jump back to BEGIN
    ; For demo, we'll just show message
    mov rsi, loop_msg
    call print_string
    jmp .done
    
.exit_loop:
    mov rsi, exit_msg
    call print_string
    
.done:
    pop rbp
    ret

; void control_do(void)
control_do:
    push rbp
    mov rbp, rsp
    
    ; For DO loops: limit and start
    call stack_pop
    mov rbx, rax  ; limit
    call stack_pop
    mov rcx, rax  ; start
    
    mov [loop_counter], rcx
    
    pop rbp
    ret

; void control_loop(void)
control_loop:
    push rbp
    mov rbp, rsp
    
    inc qword [loop_counter]
    mov rax, [loop_counter]
    cmp rax, [loop_limit]
    jl .continue
    
    ; Exit loop
    mov rsi, exit_msg
    call print_string
    jmp .done
    
.continue:
    ; Continue loop - would jump back to DO
    mov rsi, continue_msg
    call print_string
    
.done:
    pop rbp
    ret

; void control_push_return(quad address)
control_push_return:
    push rbp
    mov rbp, rsp
    
    mov rax, [return_sp]
    cmp rax, 64
    jge .overflow
    
    mov rbx, return_stack
    mov rcx, rdi
    mov [rbx + rax * 8], rcx
    inc qword [return_sp]
    
.overflow:
    pop rbp
    ret

; quad control_pop_return(void)
control_pop_return:
    push rbp
    mov rbp, rsp
    
    mov rax, [return_sp]
    cmp rax, 0
    jle .underflow
    
    dec qword [return_sp]
    mov rbx, return_stack
    mov rax, [rbx + rax * 8 - 8]
    jmp .done
    
.underflow:
    mov rax, 0
    
.done:
    pop rbp
    ret

; Helper functions
print_string:
    push rax
    push rdx
    
    mov rdx, 0
.str_len:
    cmp byte [rsi + rdx], 0
    je .got_len
    inc rdx
    jmp .str_len
    
.got_len:
    mov rax, 1
    mov rdi, 1
    syscall
    
    pop rdx
    pop rax
    ret

section .data
    loop_limit dq 0
    loop_msg db 'Looping again...', 10, 0
    continue_msg db 'Continuing loop...', 10, 0
    exit_msg db 'Exiting loop.', 10, 0