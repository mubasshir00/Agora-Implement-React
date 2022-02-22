import React, { useState } from 'react';
import { useClient } from './config';

function Controls(props) {
//   console.log(props);
const client = useClient();

// console.log('CLient from COntrol',client);
const [test,setTest] = useState('aaaaaaa')
const {clientId,tracks,setStart,setInCall} = props;
    console.log(clientId);
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
    console.log('Controls', tracks);
}
const leaveChannel = async () =>{
    
    console.log('leave', client);

    await client.leave();

    console.log('leave',client);

    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    // const leave = { ...client }
    // console.log(leave);
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
