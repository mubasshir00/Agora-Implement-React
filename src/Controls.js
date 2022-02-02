import React, { useState } from 'react';
import { useClient } from './config';

function Controls(props) {
//   console.log(props);
const client = useClient();
const {tracks,setStart,setInCall} = props;
const [trackState, setTrackState] = useState({
    video : true,
    audio:true
})
const mute = async (type) =>{
    if(type ==="audio"){
        await tracks[0].setEnabled(!trackState.audio)
        setTrackState((ps)=>{
            return {...ps,audio: !ps.audio}
        })
    } else if(type ==="video"){
        await tracks[1].setEnabled(!trackState.video)
        setTrackState((ps)=>{
            return {
            ...ps,video:!ps.video
            }
        })
    }
}
const leaveChannel = async () =>{
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false)
}

  return <div>
    <button 
    onClick={()=>mute("audio")}
    >
        {trackState.audio ? 'Mic On' : 'Mic Off'}
    </button>
    <button onClick={()=>mute("video")}>
    {
    trackState.video ? 'Video On' : 'Video Off'
    }
    </button>
    <button onClick={()=>leaveChannel()}>
        Leave
    </button>
  </div>;
}

export default Controls;
