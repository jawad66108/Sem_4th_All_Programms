; parser.asm - Tokenization and Parsing

section .data
    input_buffer times 256 db 0
    token_buffer times 64 db 0
    token_start db 0
    token_end db 0
    input_len dq 0
    
    ; Dictionary of Forth words
    dict_add db '+', 0
    dict_sub db '-', 0
    dict_mul db '*', 0
    dict_div db '/', 0
    dict_mod db '%', 0
    dict_dup db 'd','u','p',0
    dict_drop db 'd','r','o','p',0
    dict_swap db 's','w','a','p',0
    dict_over db 'o','v','e','r',0
    dict_rot db 'r','o','t',0
    dict_dot db '.', 0
    dict_emit db 'e','m','i','t',0
    dict_cr db 'c','r',0
    dict_space db 's','p','a','c','e',0
    dict_clear db 'c','l','e','a','r',0
    dict_bye db 'b','y','e',0
    dict_help db 'h','e','l','p',0
    dict_stack db '.','s',0
    
    unknown_cmd_msg db 'U','n','k','n','o','w','n',' ','c','o','m','m','a','n','d',':',' ',0
    prompt db 'F','o','r','t','h','>',' ',0
    newline db 10, 0
    help_msg1 db 'F','o','r','t','h',' ','C','o','m','m','a','n','d','s',':',10,0
    help_msg2 db '  ','+',' ','-',' ','*',' ','/',' ','%',' ',' ',' ',' ',' ','A','r','i','t','h','m','e','t','i','c',' ','o','p','e','r','a','t','i','o','n','s',10,0
    help_msg3 db '  ','d','u','p',' ','d','r','o','p',' ','s','w','a','p',' ','o','v','e','r',' ','r','o','t',' ',' ',' ','S','t','a','c','k',' ','m','a','n','i','p','u','l','a','t','i','o','n',10,0
    help_msg4 db '  ','.',' ','e','m','i','t',' ','c','r',' ','s','p','a','c','e',' ',' ',' ',' ',' ',' ',' ',' ','O','u','t','p','u','t',10,0
    help_msg5 db '  ','c','l','e','a','r',' ','.','s',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','S','t','a','c','k',' ','d','i','s','p','l','a','y',10,0
    help_msg6 db '  ','h','e','l','p',' ','b','y','e',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','H','e','l','p',' ','a','n','d',' ','e','x','i','t',10,0

section .bss
    input_read resb 256

section .text
    extern stack_push, stack_pop
    extern op_add, op_sub, op_mul, op_div, op_mod
    extern op_dup, op_drop, op_swap, op_over, op_rot
    extern op_dot, op_emit, op_cr, op_space, op_clear, op_print_stack
    global parse_line, execute_token, is_number
    global get_input, show_prompt

; void parse_line(char* line)
parse_line:
    push rbp
    mov rbp, rsp
    push rbx
    push rcx
    push rdx
    push rsi
    
    mov rsi, rdi ; Get line pointer
    cmp byte [rsi], 0
    je .done
    
    mov rbx, rsi  ; Current position
    mov rcx, 0    ; Token start
    mov rdx, 0    ; In token flag
    
.token_loop:
    mov al, [rbx]
    cmp al, 0
    je .process_last
    
    ; Check if whitespace
    cmp al, ' '
    je .whitespace
    cmp al, 9        ; Tab
    je .whitespace
    cmp al, 10       ; Newline
    je .whitespace
    cmp al, 13       ; Carriage return
    je .whitespace
    
    ; Non-whitespace - start/continue token
    cmp rdx, 0
    jne .continue_token
    
    ; Start new token
    mov rcx, rbx
    mov rdx, 1
    
.continue_token:
    inc rbx
    jmp .token_loop
    
.whitespace:
    cmp rdx, 0
    je .skip_whitespace
    
    ; End of token - process it
    push rbx
    push rcx
    push rdx
    
    ; Copy token to buffer
    mov rsi, rcx
    mov rdi, token_buffer
    mov rcx, rbx
    sub rcx, rsi
    
    push rcx
    rep movsb
    pop rcx
    mov byte [rdi], 0
    
    ; Execute token
    push rcx
    push rsi
    push rdi
    mov rdi, token_buffer
    call execute_token
    pop rdi
    pop rsi
    pop rcx
    
    pop rdx
    pop rcx
    pop rbx
    
    mov rdx, 0  ; Reset token flag
    
.skip_whitespace:
    inc rbx
    jmp .token_loop
    
.process_last:
    cmp rdx, 0
    je .done
    
    ; Process last token
    mov rsi, rcx
    mov rdi, token_buffer
    mov rcx, rbx
    sub rcx, rsi
    rep movsb
    mov byte [rdi], 0
    
    mov rdi, token_buffer
    call execute_token
    
.done:
    pop rsi
    pop rdx
    pop rcx
    pop rbx
    pop rbp
    ret

; void execute_token(char* token)
execute_token:
    push rbp
    mov rbp, rsp
    push rbx
    
    mov rbx, rdi  ; token pointer
    
    ; Check if number
    mov rdi, rbx
    call is_number
    cmp rax, 1
    jne .check_words
    
    ; Convert to number and push
    mov rdi, rbx
    call string_to_number
    mov rdi, rax
    call stack_push
    jmp .done
    
.check_words:
    ; Compare with dictionary words
    mov rdi, rbx
    mov rsi, dict_add
    call strcmp
    cmp rax, 1
    jne .check_sub
    call op_add
    jmp .done
    
.check_sub:
    mov rdi, rbx
    mov rsi, dict_sub
    call strcmp
    cmp rax, 1
    jne .check_mul
    call op_sub
    jmp .done
    
.check_mul:
    mov rdi, rbx
    mov rsi, dict_mul
    call strcmp
    cmp rax, 1
    jne .check_div
    call op_mul
    jmp .done
    
.check_div:
    mov rdi, rbx
    mov rsi, dict_div
    call strcmp
    cmp rax, 1
    jne .check_mod
    call op_div
    jmp .done
    
.check_mod:
    mov rdi, rbx
    mov rsi, dict_mod
    call strcmp
    cmp rax, 1
    jne .check_dup
    call op_mod
    jmp .done
    
.check_dup:
    mov rdi, rbx
    mov rsi, dict_dup
    call strcmp
    cmp rax, 1
    jne .check_drop
    call op_dup
    jmp .done
    
.check_drop:
    mov rdi, rbx
    mov rsi, dict_drop
    call strcmp
    cmp rax, 1
    jne .check_swap
    call op_drop
    jmp .done
    
.check_swap:
    mov rdi, rbx
    mov rsi, dict_swap
    call strcmp
    cmp rax, 1
    jne .check_over
    call op_swap
    jmp .done
    
.check_over:
    mov rdi, rbx
    mov rsi, dict_over
    call strcmp
    cmp rax, 1
    jne .check_rot
    call op_over
    jmp .done
    
.check_rot:
    mov rdi, rbx
    mov rsi, dict_rot
    call strcmp
    cmp rax, 1
    jne .check_dot
    call op_rot
    jmp .done
    
.check_dot:
    mov rdi, rbx
    mov rsi, dict_dot
    call strcmp
    cmp rax, 1
    jne .check_emit
    call op_dot
    jmp .done
    
.check_emit:
    mov rdi, rbx
    mov rsi, dict_emit
    call strcmp
    cmp rax, 1
    jne .check_cr
    call op_emit
    jmp .done
    
.check_cr:
    mov rdi, rbx
    mov rsi, dict_cr
    call strcmp
    cmp rax, 1
    jne .check_space
    call op_cr
    jmp .done
    
.check_space:
    mov rdi, rbx
    mov rsi, dict_space
    call strcmp
    cmp rax, 1
    jne .check_clear
    call op_space
    jmp .done
    
.check_clear:
    mov rdi, rbx
    mov rsi, dict_clear
    call strcmp
    cmp rax, 1
    jne .check_stack
    call op_clear
    jmp .done
    
.check_stack:
    mov rdi, rbx
    mov rsi, dict_stack
    call strcmp
    cmp rax, 1
    jne .check_bye
    call op_print_stack
    jmp .done
    
.check_bye:
    mov rdi, rbx
    mov rsi, dict_bye
    call strcmp
    cmp rax, 1
    jne .check_help
    mov rax, 60  ; sys_exit
    xor rdi, rdi
    syscall
    
.check_help:
    call show_help
    jmp .done
    
.unknown:
    ; Unknown command
    mov rsi, unknown_cmd_msg
    call print_string
    mov rsi, rbx
    call print_string
    mov rsi, newline
    call print_string
    
.done:
    pop rbx
    pop rbp
    ret

; int is_number(char* str)
is_number:
    push rbp
    mov rbp, rsp
    
    mov rsi, rdi
    cmp byte [rsi], 0
    je .no
    
    mov rcx, 0
    mov al, [rsi]
    cmp al, '-'
    jne .check_digit
    inc rsi
    
.check_digit:
    mov al, [rsi]
    cmp al, 0
    je .yes
    cmp al, '0'
    jl .no
    cmp al, '9'
    jg .no
    inc rsi
    jmp .check_digit
    
.yes:
    mov rax, 1
    pop rbp
    ret
    
.no:
    mov rax, 0
    pop rbp
    ret

; int string_to_number(char* str)
string_to_number:
    push rbp
    mov rbp, rsp
    
    mov rsi, rdi
    mov rax, 0
    mov rcx, 10
    mov rbx, 0
    mov rdx, 0
    
    ; Check for negative
    cmp byte [rsi], '-'
    jne .positive
    mov rdx, 1
    inc rsi
    
.positive:
    movzx rbx, byte [rsi]
    cmp bl, 0
    je .done
    sub bl, '0'
    imul rax, rcx
    add rax, rbx
    inc rsi
    jmp .positive
    
.done:
    cmp rdx, 1
    jne .finish
    neg rax
    
.finish:
    pop rbp
    ret

; int strcmp(char* str1, char* str2)
strcmp:
    push rbp
    mov rbp, rsp
    push rsi
    push rdi
    
.loop:
    mov al, [rdi]
    mov bl, [rsi]
    cmp al, bl
    jne .not_equal
    cmp al, 0
    je .equal
    inc rdi
    inc rsi
    jmp .loop
    
.equal:
    mov rax, 1
    pop rdi
    pop rsi
    pop rbp
    ret
    
.not_equal:
    mov rax, 0
    pop rdi
    pop rsi
    pop rbp
    ret

; void show_prompt(void)
show_prompt:
    push rbp
    mov rbp, rsp
    
    mov rsi, prompt
    call print_string
    
    pop rbp
    ret

; void get_input(char* buffer)
get_input:
    push rbp
    mov rbp, rsp
    
    mov r8, rdi ; buffer
    mov rsi, 255
    mov rax, 0  ; sys_read
    mov rdi, 0  ; stdin
    mov rdx, 255
    syscall
    
    ; Remove newline
    mov rcx, rax
    mov rdi, r8
    cmp byte [rdi + rcx - 1], 10
    jne .done
    mov byte [rdi + rcx - 1], 0
    
.done:
    pop rbp
    ret

show_help:
    push rbp
    mov rbp, rsp
    
    mov rsi, help_msg1
    call print_string
    mov rsi, help_msg2
    call print_string
    mov rsi, help_msg3
    call print_string
    mov rsi, help_msg4
    call print_string
    mov rsi, help_msg5
    call print_string
    mov rsi, help_msg6
    call print_string
    
    pop rbp
    ret

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

