import dotenv from 'dotenv';
dotenv.config();
import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import crypto from 'crypto';

const KmsClient = tencentcloud.kms.v20190118.Client;

export class KmsService {
  static generateRandomSecretKey(length = 32) {
    try {
      const buffer = crypto.randomBytes(length);
      const key = buffer
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      return key;
    } catch (error) {
      throw new Error(`Secret key generation failed: ${error.message}`);
    }
  }

  static getClient() {
    const clientConfig = {
      credential: {
        secretId: process.env.TENCENT_SECRET_ID,
        secretKey: process.env.TENCENT_SECRET_KEY,
      },
      region: process.env.KMS_REGION,
      profile: {
        httpProfile: {
          endpoint: 'kms.tencentcloudapi.com',
        },
      },
    };
    return new KmsClient(clientConfig);
  }

  static async kmsEncrypt(plaintext) {
    if (!plaintext || typeof plaintext !== 'string') {
      throw new Error('Invalid plaintext input');
    }
    const params = {
      KeyId: process.env.KMS_KEY_ID,
      Plaintext: Buffer.from(plaintext).toString('base64'),
    };
    try {
      const client = this.getClient();
      const { CiphertextBlob } = await client.Encrypt(params);
      return CiphertextBlob;
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  static async kmsDecrypt(ciphertext) {
    if (!ciphertext) {
      throw new Error('Invalid ciphertext input');
    }
    const params = { CiphertextBlob: ciphertext };
    try {
      const client = this.getClient();
      const { Plaintext } = await client.Decrypt(params);
      return Buffer.from(Plaintext, 'base64').toString('utf-8');
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  static async kmsTest() {
    try {
      const secretKey = this.generateRandomSecretKey();
      const originalText = 'HelloWorld';
      const encrypted = await this.kmsEncrypt(originalText);
      const decrypted = await this.kmsDecrypt(encrypted);
      return {
        ok: true,
        secretKey: secretKey,
        original: originalText,
        encrypted: encrypted,
        decrypted: decrypted,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}

// Execute test
// KmsService.kmsTest()
//   .then((result) => console.log("KMS Result:", result))
//   .catch((error) => console.error("KMS Test failed:", error));
