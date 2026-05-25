; display.asm - Professional Stack Visualization

section .data
    border_top db '╔════════════════════════════════════════════════════════════════╗', 10, 0
    border_bottom db '╚════════════════════════════════════════════════════════════════╝', 10, 0
    separator db '╠════════════════════════════════════════════════════════════════╣', 10, 0
    stack_header db '║  Stack Contents (Top → Bottom)                               ║', 10, 0
    empty_stack_line db '║  <empty>                                                 ║', 10, 0
    stack_item_fmt db '║  %3d: %-20s', 0
    value_fmt db '%d', 0
    status_header db '║  Status:                                                  ║', 10, 0
    stack_pointer_fmt db '║  Stack Pointer: %-3d  |  Capacity: %-3d                  ║', 10, 0
    clear_screen db 27, '[2J', 27, '[H', 0
    title_line db '║           FORTH INTERPRETER - Stack Visualization           ║', 10, 0
    input_header db '║  Input:                                                    ║', 10, 0
    input_line db '║  > ', 0
    empty_line db '║                                                            ║', 10, 0
    
    ; Colors (ANSI)
    color_reset db 27, '[0m', 0
    color_red db 27, '[31m', 0
    color_green db 27, '[32m', 0
    color_yellow db 27, '[33m', 0
    color_blue db 27, '[34m', 0
    color_magenta db 27, '[35m', 0
    color_cyan db 27, '[36m', 0
    color_white db 27, '[37m', 0
    color_bold db 27, '[1m', 0

    prefix_str db '║  ', 0
    colon_space db ': ', 0
    padding db '                    ', 0
    border_end db '║', 10, 0
    minus_sign db '-', 0
    
    newline_str db 10, 0

section .bss
    display_buffer resb 1024
    number_buffer resb 32

section .text
    extern stack_get_pointer, stack_get_capacity, stack_get_all
    extern stack_start, stack_pointer
    global display_init, display_update, display_stack
    global display_input_prompt, display_message
    global clear_screen_full, print_colored

; void display_init(void)
display_init:
    push rbp
    mov rbp, rsp
    
    call clear_screen_full
    
    pop rbp
    ret

; void display_update(void)
display_update:
    push rbp
    mov rbp, rsp
    push rbx
    push rcx
    push rdx
    
    call clear_screen_full
    
    ; Print top border
    mov rsi, border_top
    call print_string
    
    ; Print title
    mov rsi, title_line
    call print_string
    
    ; Print separator
    mov rsi, separator
    call print_string
    
    ; Print stack header
    mov rsi, stack_header
    call print_string
    
    ; Print stack items
    mov rsi, separator
    call print_string
    
    call display_stack
    
    ; Print separator
    mov rsi, separator
    call print_string
    
    ; Print status
    mov rsi, status_header
    call print_string
    
    mov rsi, separator
    call print_string
    
    ; Print bottom border
    mov rsi, border_bottom
    call print_string
    
    pop rdx
    pop rcx
    pop rbx
    pop rbp
    ret

; void display_stack(void)
display_stack:
    push rbp
    mov rbp, rsp
    push rbx
    push rcx
    push rdx
    push rsi
    
    mov rcx, [stack_pointer]
    cmp rcx, 0
    je .empty_stack
    
    mov rbx, stack_start
    mov rdx, 0
    mov rsi, rcx
    dec rsi
    
.stack_loop:
    cmp rdx, rcx
    jge .done
    
    ; Print item number
    push rdx
    push rcx
    
    mov rsi, color_cyan
    call print_string
    
    ; Print "║  " prefix
    mov rsi, prefix_str
    call print_string
    
    ; Print index
    mov rax, rdx
    call print_number
    
    ; Print ": "
    mov rsi, colon_space
    call print_string
    
    ; Print value
    mov rax, [rbx + rdx * 8]
    call print_number
    
    ; Print padding
    mov rsi, padding
    call print_string
    
    mov rsi, color_reset
    call print_string
    
    ; Print border
    mov rsi, border_end
    call print_string
    
    pop rcx
    pop rdx
    
    inc rdx
    jmp .stack_loop
    
.empty_stack:
    mov rsi, color_yellow
    call print_string
    mov rsi, empty_stack_line
    call print_string
    mov rsi, color_reset
    call print_string
    
.done:
    pop rsi
    pop rdx
    pop rcx
    pop rbx
    pop rbp
    ret

; void display_input_prompt(void)
display_input_prompt:
    push rbp
    mov rbp, rsp
    
    mov rsi, color_green
    call print_string
    mov rsi, input_line
    call print_string
    mov rsi, color_reset
    call print_string
    
    pop rbp
    ret

; void display_message(char* msg, int type)
; type: 0=normal, 1=success, 2=error, 3=warning
display_message:
    push rbp
    mov rbp, rsp
    
    cmp qword [rbp + 24], 1
    je .success
    cmp qword [rbp + 24], 2
    je .error
    cmp qword [rbp + 24], 3
    je .warning
    jmp .normal
    
.success:
    mov rsi, color_green
    call print_string
    jmp .print_msg
    
.error:
    mov rsi, color_red
    call print_string
    jmp .print_msg
    
.warning:
    mov rsi, color_yellow
    call print_string
    jmp .print_msg
    
.normal:
    mov rsi, color_white
    call print_string
    
.print_msg:
    mov rsi, rdi
    call print_string
    mov rsi, color_reset
    call print_string
    mov rsi, newline_str
    call print_string
    
    pop rbp
    ret

; void clear_screen_full(void)
clear_screen_full:
    push rbp
    mov rbp, rsp
    
    mov rsi, clear_screen
    call print_string
    
    pop rbp
    ret

; void print_colored(char* msg, char* color)
print_colored:
    push rbp
    mov rbp, rsp
    
    mov rsi, [rbp + 24]  ; rdi = first arg
    call print_string
    mov rsi, [rbp + 16]  ; rsi = second arg
    call print_string
    mov rsi, color_reset
    call print_string
    
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

print_number:
    push rbp
    mov rbp, rsp
    push rbx
    push rcx
    push rdx
    push rsi
    
    cmp rax, 0
    jge .positive
    
    push rax
    mov rsi, minus_sign
    call print_string
    pop rax
    neg rax
    
.positive:
    mov rcx, 10
    mov rbx, number_buffer
    add rbx, 31
    mov byte [rbx], 0
    dec rbx
    
.convert_loop:
    xor rdx, rdx
    div rcx
    add dl, '0'
    mov [rbx], dl
    dec rbx
    cmp rax, 0
    jne .convert_loop
    
    inc rbx
    mov rsi, rbx
    call print_string
    
    pop rsi
    pop rdx
    pop rcx
    pop rbx
    pop rbp
    ret


    