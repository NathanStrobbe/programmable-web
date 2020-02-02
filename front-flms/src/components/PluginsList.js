import React from 'react';
import {Link} from "react-router-dom";

const PluginsList = () => {
    console.log("#rendering PluginsList");
    return (
        <div className="PluginsList">
            <p>PluginsList hello</p>
            {/*replace hard coded id with something like ${plugin.id}*/}
            <Link to={`/pluginDetails/5e35427d1f125b006bc4d0be`}>to pluginDetails</Link>
        </div>
    );
};

export default PluginsList;
