import axios from 'axios';
import join from 'url-join';

const host = 'http://localhost:3001';

const request = method => async (url, data) => {
    const response = await axios({
        method,
        url: join(host, url),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data,
    });

    return response.data;
};

export const get = request('get');
export const post = request('post');
