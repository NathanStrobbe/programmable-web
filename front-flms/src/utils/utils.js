export const convertBufferToBase64 = image => {
    let binary = '';
    if (image && image.buffer && image.buffer.data) {
        const bytes = [].slice.call(new Uint8Array(image.buffer.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        binary = btoa(binary);
        return `data:${image.mimeType};base64,${binary}`;
    }
    return `data:;base64,${binary}`;
};
