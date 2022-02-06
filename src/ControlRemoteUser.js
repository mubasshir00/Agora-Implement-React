import React ,{useState} from "react";
import { useClient } from "./config";

function ControlRemoteUser(props){
    return (
    <div>
        <button>Mic Off</button>
        <button>Video Off</button>
        <button>Remove User</button>
    </div>
    )
}

export default ControlRemoteUser
