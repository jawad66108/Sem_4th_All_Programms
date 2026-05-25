; main.asm - Main Entry Point for Forth Interpreter
; NASM syntax for Linux x86_64

section .data
    welcome_msg db 27, '[1;36m', 0
    welcome_line1 db '╔════════════════════════════════════════════════════════════════╗', 10, 0
    welcome_line2 db '║                    FORTH INTERPRETER v1.0                      ║', 10, 0
    welcome_line3 db '║                 Stack-Based Language with GUI                  ║', 10, 0
    welcome_line4 db '╚════════════════════════════════════════════════════════════════╝', 10, 0
    welcome_line5 db 10, 'Type "help" for commands, "bye" to exit', 10, 10, 0
    color_reset db 27, '[0m', 0
    
    input_buffer times 256 db 0

section .text
    extern stack_reset, stack_get_pointer
    extern display_init, display_update, display_input_prompt, display_message
    extern parse_line, show_prompt, get_input
    extern error_handler_init, check_stack_bounds
    extern op_print_stack, op_cr, op_space
    
    global _start

_start:
    ; Initialize everything
    call error_handler_init
    call stack_reset
    call display_init
    
    ; Show welcome message
    mov rsi, welcome_msg
    call print_string
    mov rsi, welcome_line1
    call print_string
    mov rsi, welcome_line2
    call print_string
    mov rsi, welcome_line3
    call print_string
    mov rsi, welcome_line4
    call print_string
    mov rsi, welcome_line5
    call print_string
    mov rsi, color_reset
    call print_string
    
.main_loop:
    ; Update display
    call display_update
    
    ; Show input prompt
    call display_input_prompt
    
    ; Get user input
    mov rdi, input_buffer
    call get_input
    
    ; Check if input is empty
    cmp byte [input_buffer], 0
    je .main_loop
    
    ; Parse and execute
    mov rdi, input_buffer
    call parse_line
    
    ; Check stack bounds
    call check_stack_bounds
    
    ; Small delay for better visualization
    call small_delay
    
    jmp .main_loop

; Helper: print string
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

; Small delay for better visualization
small_delay:
    push rcx
    mov rcx, 1000000
.delay_loop:
    dec rcx
    jnz .delay_loop
    pop rcx
    ret
    