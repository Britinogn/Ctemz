import { User } from '../types/script';

interface AuthState {
    token: string | null;
    user: User | null;
}

export function getAuthState(): AuthState {
    return {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    };
}

export function getToken(): string | null {
    return localStorage.getItem('token');
}

export function setToken(token: string | null): void {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

export function setUser(user: User | null): void {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
}

export function isAuthenticated(): boolean {
    return !!getAuthState().token;
}

export function getUser(): User | null {
    return getAuthState().user;
}

export function logout(): void {
    setToken(null);
    setUser(null);
    window.location.href = '/login';
}

const auth = {
    getToken,
    setToken,
    setUser,
    isAuthenticated,
    getUser,
    logout,
};

export default auth;