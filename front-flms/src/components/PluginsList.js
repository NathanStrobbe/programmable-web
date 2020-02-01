import React from 'react';
import { GetPluginsList } from '../utils/hooks';

const PluginsList = () => {
    const { plugins } = GetPluginsList();

    return (
        <div>{plugins.map(plugin => <div key={plugin._id}>{plugin.name}</div>)}</div>
    );
};

export default PluginsList;
