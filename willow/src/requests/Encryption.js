/**
 * Use to encrypt a credit card number
 */
import * as forge from 'node-forge';

class Encryption {
    constructor(config) {
        this.config = config;
    }
    encrypt(str) {
        const publicKey = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----${this.config.publicKey}-----END PUBLIC KEY-----`);
        const encryptionType = this.config.encryptionType;
        const e = forge.pkcs1.encode_rsa_oaep(publicKey, this.config.terminalNo + str, {
            md: forge.md[encryptionType].create(),
        });
        const ciphertext = forge.pki.rsa.encrypt(e, publicKey, true);
        return forge.util.encode64(ciphertext);
    }
}
export default Encryption;


