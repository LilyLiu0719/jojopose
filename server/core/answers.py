answerStr = {
    '1-1': '1100000000000001111000000', 
    '1-2': '1110110100000001111000000', 
    '1-3': '1111111111111101111000000', 
    '1-4': '1111111111111101111000000', 
    '1-5': '1111111111011001111000000', 
    '1-6': '1111111111011001111000000', 
    '1-7': '1111111111111101111000000', 
    '2-1': '1110110100000001111000000', 
    '2-2-1': '1111111111011001111000000', 
    '2-2-2': '1111111111011001111000000', 
    '2-4': '1111111111111101111000000', 
    '2-5': '1111111111011001111000000', 
}

answers=dict()
for k, v in answerStr.items():
    answers[k] = list(map(lambda x: True if x==1 else False, v))
print(answers)
