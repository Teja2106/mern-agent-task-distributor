import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export const signToken = async (payload: JWTPayload) => {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}

export const verifyToken = async (token: string) => {
    return await jwtVerify(token, secret);
}