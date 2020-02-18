import join from 'url-join';

const host = 'http://localhost:3001';

const request = method => (url, data, contentType) => {
    let headers;
    if (contentType) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': contentType
        };
    } else {
        headers = {
            'Accept': 'application/json'
        };
    }
    return fetch(join(host, url), {
        method: method,
        headers: headers,
        body: data
    });
};

export const get = request('GET');
export const post = request('POST');
