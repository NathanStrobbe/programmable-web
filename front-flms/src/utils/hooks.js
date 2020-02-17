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

export const GetCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                if (json) {
                    setCategories(json);
                } else {
                    setCategories([]);
                }
            });
    }, []);

    return { categories };
};


export const AddLike = (plugin, userId) => {

    const newArr = [];
    if(plugin.likes.length > 0){
        plugin.likes.map(plugin => newArr.push(plugin));
    }
    newArr.push(userId);

    console.log(newArr);

    fetch('http://localhost:3001/api/plugin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': plugin.name,
            'users': newArr
        })
    });
};

export const AddComment = (plugin, userId, content) => {
    let date = new Date();
    console.log(date);
    fetch('http://localhost:3001/api/comments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'writer': userId,
            'content': content,
            'date' : date,
            'pluginId' : plugin._id
        })
    });
};

const defaultPlugin = {
    name: '',
    version: '',
    description: '',
    likes: [],
    creator: {},
    image: null,
    category: '',
    tags: [],
    video: '',
    linkgithub: '',
    openSource: false
};

export const GetPlugin = (pluginId) => {
    const [plugin, setPlugin] = useState(defaultPlugin);

    useEffect(() => {
        fetch(`http://localhost:3001/api/plugin?id=${pluginId}`, {
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
                    setPlugin(json);
                } else {
                    setPlugin();
                }
            });
    }, [pluginId]);

    return plugin;
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

export const GetComments = (pluginId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/comments?pluginId=${pluginId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json) {
                    setComments(json);
                } else {
                    setComments();
                }
            });
    }, [pluginId]);

    return comments;
};
