import join from 'url-join';

const host = 'http://localhost:3001';

const request = method => (url, data) => {
    return fetch(join(host, url), {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
};

export const get = request('GET');
export const post = request('POST');
