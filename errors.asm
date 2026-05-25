; errors.asm - Error Handling Module

section .data
    error_stack_overflow db '[ERROR] Stack overflow! Cannot push more values.', 10, 0
    error_stack_underflow db '[ERROR] Stack underflow! Not enough values on stack.', 10, 0
    error_division_zero db '[ERROR] Division by zero!', 10, 0
    error_invalid_command db '[ERROR] Invalid command! Type "help" for available commands.', 10, 0
    error_number_parse db '[ERROR] Invalid number format!', 10, 0
    error_memory db '[ERROR] Memory allocation failed!', 10, 0
    error_syntax db '[ERROR] Syntax error!', 10, 0
    ; ... all existing lines ...
    
    warning_low_stack db '[WARNING] Stack is getting full!', 10, 0
    warning_high_stack db '[WARNING] Stack pointer inconsistency detected!', 10, 0
    
    info_stack_reset db '[INFO] Stack has been reset.', 10, 0

section .text
    extern stack_is_full, stack_is_empty, stack_get_pointer
    extern stack_get_capacity
    global handle_stack_overflow, handle_stack_underflow
    global handle_division_zero, handle_invalid_command
    global handle_syntax_error, handle_memory_error
    global check_stack_bounds, display_error, display_warning
    global error_handler_init

; void handle_stack_overflow(void)
handle_stack_overflow:
    push rbp
    mov rbp, rsp
    
    mov rsi, error_stack_overflow
    call print_error
    
    pop rbp
    ret

; void handle_stack_underflow(void)
handle_stack_underflow:
    push rbp
    mov rbp, rsp
    
    mov rsi, error_stack_underflow
    call print_error
    
    pop rbp
    ret

; void handle_division_zero(void)
handle_division_zero:
    push rbp
    mov rbp, rsp
    
    mov rsi, error_division_zero
    call print_error
    
    pop rbp
    ret

; void handle_invalid_command(void)
handle_invalid_command:
    push rbp
    mov rbp, rsp
    
    mov rsi, error_invalid_command
    call print_error
    
    pop rbp
    ret

; void handle_syntax_error(void)
handle_syntax_error:
    push rbp
    mov rbp, rsp
    
    mov rsi, error_syntax
    call print_error
    
    pop rbp
    ret

; void handle_memory_error(void)
handle_memory_error:
    push rbp
    mov rbp, rsp
    
    mov rsi, error_memory
    call print_error
    
    pop rbp
    ret

; int check_stack_bounds(void)
; Returns: 0=ok, 1=overflow_warning, 2=underflow_warning
check_stack_bounds:
    push rbp
    mov rbp, rsp
    
    call stack_is_full
    cmp rax, 1
    jne .check_empty
    
    call handle_stack_overflow
    mov rax, 1
    jmp .done
    
.check_empty:
    call stack_is_empty
    cmp rax, 1
    jne .check_warning
    
    ; Underflow already handled by operations
    
.check_warning:
    ; Check if stack is almost full (>90%)
    call stack_get_pointer
    push rax
    call stack_get_capacity
    pop rcx
    
    mov rdx, 0
    mov rbx, 10
    mul rbx
    div rcx
    cmp rax, 9
    jl .normal
    
    ; Warning: stack >90% full
    mov rsi, warning_low_stack
    call print_warning
    mov rax, 1
    jmp .done
    
.normal:
    mov rax, 0
    
.done:
    pop rbp
    ret

; void display_error(char* message)
display_error:
    push rbp
    mov rbp, rsp
    
    ; Print in red
    mov rsi, color_red
    call print_colored_string
    mov rsi, rdi
    call print_colored_string
    mov rsi, color_reset
    call print_colored_string
    
    pop rbp
    ret

; void display_warning(char* message)
display_warning:
    push rbp
    mov rbp, rsp
    
    ; Print in yellow
    mov rsi, color_yellow
    call print_colored_string
    mov rsi, rdi
    call print_colored_string
    mov rsi, color_reset
    call print_colored_string
    
    pop rbp
    ret

; void error_handler_init(void)
error_handler_init:
    push rbp
    mov rbp, rsp
    
    ; Initialize error handling system
    mov rsi, info_stack_reset
    call print_info
    
    pop rbp
    ret

; Helper: print_error (internal)
print_error:
    push rbp
    mov rbp, rsp
    
    push rsi
    mov rsi, color_red
    call print_colored_string
    pop rsi
    call print_colored_string
    mov rsi, color_reset
    call print_colored_string
    
    pop rbp
    ret

; Helper: print_warning (internal)
print_warning:
    push rbp
    mov rbp, rsp
    
    push rsi
    mov rsi, color_yellow
    call print_colored_string
    pop rsi
    call print_colored_string
    mov rsi, color_reset
    call print_colored_string
    
    pop rbp
    ret

; Helper: print_info (internal)
print_info:
    push rbp
    mov rbp, rsp
    
    push rsi
    mov rsi, color_green
    call print_colored_string
    pop rsi
    call print_colored_string
    mov rsi, color_reset
    call print_colored_string
    
    pop rbp
    ret

print_colored_string:
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
    color_red    db 27, "[31m", 0
    color_yellow db 27, "[33m", 0
    color_green  db 27, "[32m", 0
    color_reset  db 27, "[0m", 0
