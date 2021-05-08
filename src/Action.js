import React, { useEffect, useState } from "react";
import api from './utils/api';

function Action(){
    function water(){
        api.get('utils/action_water/')
    }   
    
    return(
        <button onClick={water}>water</button>
    )
}

export default Action