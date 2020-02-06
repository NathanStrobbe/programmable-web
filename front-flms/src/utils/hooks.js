import { useState, useEffect } from 'react';

export const GetPluginsList = () => {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/plugins', {
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
                    setPlugins(json);
                    console.log(plugins);
                } else {
                    setPlugins([]);
                }
            });
    }, []);

    return { plugins };
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

export const GetPlugin = (pluginId) => {
    const [plugin, setPlugin] = useState({ name: '', version: '', category: '', image: '', description: '', linkgithub: '', tags: [], likes: [] });

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
                console.log(json);
                if (json) {
                    setPlugin(json[0]);
                    console.log(plugin);
                } else {
                    setPlugin();
                }
            });
    }, []);

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
                console.log(json);
                if (json) {
                    setUser(json);
                    console.log(user);
                } else {
                    setUser();
                }
            });
    }, []);

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
                    console.log(comments);
                } else {
                    setComments();
                }
            });
    }, []);

    return comments;
};
