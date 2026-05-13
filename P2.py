# <!-- Q1 — Count Even Numbers
# Given n integers, print how many are even.

# Input
# 5
# 1 2 3 4 6
# Output
# 3 -->
# n=43
# for x in range(n):
#     if x%2!=0:
#         print (x)

# Q2 — Reverse Words

# Reverse the order of words.

# Input
# i love python
# Output
# python love i

# words = "i love py"
# ne_word = words[::-1]
# print(ne_word)


# Q4 — Missing Number

# Array contains numbers from 1 to n with one missing.

# Find missing number.

# Input
# 5
# 1 2 3 5
# Output
# 4

# arr = [1,2,3,4,5,34,43]
# ma = max(arr)
# for x in range(ma+1):
#     if x not in arr:
#         print(x)


# Q5 — Character Frequency

# Count frequency of each character.

# Input
# banana
# Output
# b 1
# a 3
# n 2
from collections import Counter

st = "banana"
few = Counter(st)

print(few)
    
