import time


def rc4(key, plaintext):
    # инициализация S-блока
    S = list(range(256))
    j = 0
    for i in range(256):
        j = (j + S[i] + key[i % len(key)]) % 256
        S[i], S[j] = S[j], S[i]

    # генерация потока ключей
    i = j = 0
    keystream = []
    for _ in range(len(plaintext)):
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]
        keystream.append(S[(S[i] + S[j]) % 256])

    # шифрование данных
    ciphertext = [plaintext[k] ^ keystream[k] for k in range(len(plaintext))]
    return ciphertext


def evaluate_rc4_performance(key, plaintext):
    start_time = time.time()
    ciphertext = rc4(key, plaintext)
    end_time = time.time()

    print("Зашифрованное сообщение:", ciphertext)
    print(f"Время выполнения RC4: {(end_time - start_time) * 1000:.2f} мс")
    return ciphertext


if __name__ == "__main__":
    key = [61, 60, 23, 22, 21, 20]
    plaintext = [ord(ch) for ch in "Kolomeichuk Arseniy"]

    print("Исходное сообщение:", plaintext)
    ciphertext = evaluate_rc4_performance(key, plaintext)

    decrypted = rc4(key, ciphertext)
    print("Расшифрованное сообщение:", ''.join(chr(ch) for ch in decrypted))
