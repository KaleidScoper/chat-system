// aes.js
class AES {
    static async generateKey(keyString) {
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(keyString),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: new TextEncoder().encode("salt"), // 固定的盐值
                iterations: 1000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
    }

    static async encrypt(text, key) {
        const iv = crypto.getRandomValues(new Uint8Array(12)); // 生成随机IV
        const encodedText = new TextEncoder().encode(text);
        const cipherText = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            encodedText
        );
        return { cipherText: Array.from(new Uint8Array(cipherText)), iv: Array.from(iv) };
    }

    static async decrypt(encryptedData, key) {
        const { cipherText, iv } = encryptedData;
        const plainText = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: new Uint8Array(iv) },
            key,
            new Uint8Array(cipherText)
        );
        return new TextDecoder().decode(plainText);
    }
}
