
import * as bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
    const saltRounds = 6;  // You can adjust the salt rounds as needed
    return bcrypt.hashSync(password, saltRounds);
}
