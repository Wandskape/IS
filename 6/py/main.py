from Crypto.Cipher import DES
from Crypto.Util.Padding import pad, unpad
import time
import base64

def adjust_key(key: str) -> bytes:
    key = key[:8] if len(key) >= 8 else key.ljust(8, '0')
    return key.encode('utf-8')

mess = "It goes without saying that humans (mammals identifiable as those that stand upright and are comparatively advanced and capable of detailed thought) have pretty remarkable bodies, given all that they've accomplished. (Furthermore, an especially intelligent human brain produced this text!) To be sure, humans have overcome predators, disease, and all sorts of other obstacles over thousands of years. To fully understand and appreciate these accomplishments, let's take at some of the most well-known parts of the human body! The head, or the spherical body part that contains the brain and rests at the top of the human body, has quite a few individual organs and body parts on it. (It should quickly be mentioned that hair occupies the space on top of the head, and the ears, the organs responsible for hearing, are located on either side of the head.) From top to bottom, the eyebrows, or horizontal strips of hair that can be found above the eye, are the first components of the head. The eyes are below them, and are round, orb-like organs that allow humans to see. The eyes make way for the nose, or an external (sticking-out) organ that plays an important part in the breathing and bacteria-elimination processes. Below that is the mouth, or a wide, cavernous organ that chews food, removes bacteria, helps with breathing, and more. The mouth contains teeth, or small, white-colored, pointed body parts used to chew food, and the tongue, or a red-colored, boneless organ used to chew food and speak. The neck is the long body part that connects the head to the chest (the muscular body part that protects the heart and lungs), and the stomach, or the part of the body that contains food and liquid-processing organs, comes below that. The legs are the long, muscular body parts that allow humans to move from one spot to another and perform a variety of actions. Each leg contains a thigh (a thick, especially muscular body part used to perform strenuous motions; the upper part of the leg) and a calf (thinner, more flexible body part that absorbs the shock associated with movement; the lower part of the leg). Feet can be found at the bottom of legs, and each foot is comprised of five toes, or small appendages that help balance. Arms are long, powerful body parts that are located on either side of chest, below the shoulders;arms are comprised of biceps (the thicker, more powerful upper portion), and forearms (the thinner, more flexible lower portion). Hands, or small, gripping body parts used for a tremendous number of actions, are at the end of arms. Each hand contains five fingers, or small appendages used to grip objects. The aforementioned shoulders are rounded body parts that aid arms' flexibility. One's back is found on the opposite side of the stomach, and is a flat section of the body that contains important muscles that're intended to protect the lungs and other internal organs, in addition to helping humans perform certain motions and actions."

def triple_des_encrypt(message: str, key1: str, key2: str) -> bytes:
    k1 = adjust_key(key1)
    k2 = adjust_key(key2)
    # Приводим сообщение к байтам и дополняем до кратного 8 (DES‑блок)
    m = pad(message.encode('utf-8'), 8)
    cipher = DES.new(k1, DES.MODE_ECB)
    enc1 = cipher.encrypt(m)
    cipher = DES.new(k2, DES.MODE_ECB)
    enc2 = cipher.encrypt(enc1)
    cipher = DES.new(k1, DES.MODE_ECB)
    enc3 = cipher.encrypt(enc2)
    return enc3

def triple_des_decrypt(ciphertext: bytes, key1: str, key2: str) -> str:
    k1 = adjust_key(key1)
    k2 = adjust_key(key2)
    cipher = DES.new(k1, DES.MODE_ECB)
    dec3 = cipher.decrypt(ciphertext)
    cipher = DES.new(k2, DES.MODE_ECB)
    dec2 = cipher.decrypt(dec3)
    cipher = DES.new(k1, DES.MODE_ECB)
    dec1 = cipher.decrypt(dec2)
    return unpad(dec1, 8).decode('utf-8')


def measure_performance(message: str, key1: str, key2: str):
    start_enc = time.perf_counter()
    ciphertext = triple_des_encrypt(message, key1, key2)
    end_enc = time.perf_counter()

    start_dec = time.perf_counter()
    decrypted = triple_des_decrypt(ciphertext, key1, key2)
    end_dec = time.perf_counter()

    return ciphertext, decrypted, (end_enc - start_enc) * 1000, (end_dec - start_dec) * 1000


def count_diff_bits(b1: bytes, b2: bytes) -> int:
    diff = 0
    for x, y in zip(b1, b2):
        diff += bin(x ^ y).count('1')
    return diff


def avalanche_effect(message: str, key1: str, key2: str, byte_to_flip: int, bit_to_flip: int) -> int:
    original_cipher = triple_des_encrypt(message, key1, key2)
    m_bytes = bytearray(message.encode('utf-8'))
    if byte_to_flip >= len(m_bytes):
        raise ValueError("Byte index out of range")
    m_bytes[byte_to_flip] ^= (1 << bit_to_flip)
    modified_message = m_bytes.decode('utf-8', errors='replace')
    modified_cipher = triple_des_encrypt(modified_message, key1, key2)
    return count_diff_bits(original_cipher, modified_cipher)

if __name__ == "__main__":
    message = mess
    #key1 = "myKey1_8"
    #key2 = "myKey2_8"

    #key1 = "01010101"
    #key2 = "FEFEFEFE"

    #key1 = "01FE01FE"
    #key2 = "FE01FE01"

    key1 = "aboty241"
    key2 = "2torepxU"

    print("Original message:", message)

    ciphertext, decrypted, enc_time, dec_time = measure_performance(message, key1, key2)
    ciphertext_b64 = base64.b64encode(ciphertext).decode('utf-8')

    print("Encrypted:", ciphertext_b64)
    print("Decrypted:", decrypted)
    print(f"Encryption time: {enc_time:.2f}ms")
    print(f"Decryption time: {dec_time:.2f}ms")

    avalanche_bits = avalanche_effect(message, key1, key2, 2, 4)
    print(f"Avalanche effect: {avalanche_bits} bits changed")
