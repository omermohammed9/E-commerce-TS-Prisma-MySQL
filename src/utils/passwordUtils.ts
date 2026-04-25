
import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 6;  // You can adjust the salt rounds as needed
    return await bcrypt.hash(password, saltRounds);
}
