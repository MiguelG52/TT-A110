export const decodeBase64 = (base64String: string) => {
    const buffer = Buffer.from(base64String, 'base64');
    return buffer.toString('utf-8');
}
export const encodeBase64 = (string: string) => {
    const buffer = Buffer.from(string, 'utf-8');
    return buffer.toString('base64');
}