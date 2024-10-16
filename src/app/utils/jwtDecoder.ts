export function decodeJWT(token: string) {
    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }

    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

    return decodedPayload;
}
