import random
import time

# NOD
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a


def bbs_generate(p, q, length):
    if p % 4 != 3 or q % 4 != 3:
        raise ValueError("p и q должны удовлетворять условию p mod 4 = 3 и q mod 4 = 3")
    if gcd(p, q) != 1:
        raise ValueError("p и q должны быть взаимно простыми числами")

    modulus = p * q
    x = random.randint(1, modulus - 1)  # начальное значение x0
    sequence = []

    for _ in range(length):
        x = (x ** 2) % modulus
        sequence.append(x % 2)  # бит (0 или 1)

    return sequence

if __name__ == "__main__":
    p = 11
    q = 19
    length = 100
    start_time = time.time()
    sequence = bbs_generate(p, q, length)
    end_time = time.time()

    print("Сгенерированная последовательность ПСП BBS:", sequence)
    print(f"Время генерации: {(end_time - start_time) * 1000:.2f} мс")
