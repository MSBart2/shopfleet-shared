export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface UserCredentials {
    email: string;
    password: string;
}
export interface AuthToken {
    token: string;
    expiresAt: string;
    userId: string;
}
