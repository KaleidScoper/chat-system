// dh.js
class DiffieHellman {
    constructor(prime, generator) {
        this.prime = BigInt(prime); // 大素数
        this.generator = BigInt(generator); // 生成元
        this.privateKey = this.generatePrivateKey(); // 随机私钥
        this.publicKey = this.calculatePublicKey(); // 公钥
    }

    // 生成随机私钥
    generatePrivateKey() {
        return BigInt(Math.floor(Math.random() * 1e10) + 1);
    }

    // 计算公钥: g^a mod p
    calculatePublicKey() {
        return this.modExp(this.generator, this.privateKey, this.prime);
    }

    // 计算共享密钥: B^a mod p
    calculateSharedKey(peerPublicKey) {
        return this.modExp(BigInt(peerPublicKey), this.privateKey, this.prime);
    }

    // 快速幂模运算
    modExp(base, exp, mod) {
        let result = BigInt(1);
        base = base % mod;
        while (exp > 0) {
            if (exp % BigInt(2) === BigInt(1)) {
                result = (result * base) % mod;
            }
            exp = exp / BigInt(2);
            base = (base * base) % mod;
        }
        return result;
    }
}

// 示例：在前端使用
const prime = "23"; // 选择合适的素数
const generator = "5"; // 选择生成元
const dh = new DiffieHellman(prime, generator);
console.log("Public Key:", dh.publicKey.toString());
