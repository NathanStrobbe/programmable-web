import { useState, useEffect } from 'react';

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

export const GetUser = (userToken) => {
    const [user, setUser] = useState({ username: '', password: '', email: ''});

    useEffect(() => {
        fetch(`http://localhost:3001/api/user?token=${userToken}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                if (json) {
                    console.log(json);
                    setUser(json);
                } else {
                    setUser();
                }
            });
    }, [userToken]);

    return user;
};
