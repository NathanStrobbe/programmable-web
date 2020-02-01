import React from 'react';
import { GetPluginsList } from '../utils/hooks';


const PluginsList = () => {

const { plugins } = GetPluginsList()

return (
  <div>
    {
      plugins.map(plugins => <div>{plugins.name}</div>)
    }
  </div>
)
}

export default PluginsList;
