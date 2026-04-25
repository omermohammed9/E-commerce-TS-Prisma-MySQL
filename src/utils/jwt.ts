import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET || 'NoAccessSecret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'NoRefreshSecret';

function signJwt(id: number, options: jwt.SignOptions, isRefreshToken: boolean = false): string {
    const secret = isRefreshToken ? REFRESH_SECRET : ACCESS_SECRET;
    if (!secret) {
        throw new Error('Secret key is not defined');
    }
    return jwt.sign({id}, secret, options);
}

function verifyJwt(token: string, isRefreshToken: boolean = false): any {
    const secret = isRefreshToken ? REFRESH_SECRET : ACCESS_SECRET;
    return jwt.verify(token, secret);
}

export { signJwt, verifyJwt };