import jwt from 'jsonwebtoken';
import {config} from "dotenv";

config({ path: './src/.env' });
const SECRET = process.env.JWT_SECRET || 'NoSecret';

function signJwt(id: number, options: jwt.SignOptions): string {

    if (!SECRET) {
        throw new Error('Secret key is not defined');
    }
    // Sign the token with the payload, secret, and options
    return jwt.sign({id}, SECRET, options);
}

export { signJwt };