import {useState, useEffect} from 'react';

export const GetPluginsList = () => {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/plugins',{
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
    })
  }, []);

  return { plugins };
};

export const GetPlugin = (pluginId) => {
    const [plugin, setPlugin] =  useState({name: '', version: '', category: '', image: '', description: '', tags: [], likes: [], comments: []});

    useEffect(() => {
      fetch(`http://localhost:3001/api/plugin?id=${pluginId}`,{
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
      })
    }, []);
  
    return plugin;
}