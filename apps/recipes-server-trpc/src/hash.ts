import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.KEY as string, 'hex');
const iv = Buffer.from(process.env.IV as string, 'hex');
export function encrypt(password: string): string {  
    console.log(key);
    console.log(iv);
    
    
    const cipher = crypto.createCipheriv(algorithm, key,iv);

    let encrypted = cipher.update(password, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encryptedPassword: string): string {
    console.log(key);
    console.log(iv);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log(decrypted);
    
    return decrypted;
}
