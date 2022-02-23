import { Grid } from '@mui/material';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import React, { useEffect, useState } from 'react';
import { remoteClient, useChannel, useClient, useMicrophoneAndCameraTracks } from './config';
import Controls from './Controls';

import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng'
import ControlRemoteUser from './ControlRemoteUser';

function Videos(props) {

  const [removeMessage,setRemoveMessage] = useState("")
  let {users} = props;

  const client = useClient()

  const {ready,tracks}= useMicrophoneAndCameraTracks();

  const [test,setTest] = useState('');
  const [testClick, setTestClick] = useState('')

  const [gridSpacing,setGridSpacing] = useState(12);

  useEffect(()=>{
      setGridSpacing(Math.max(Math.floor(12/(users.length+1)),4));

  }, [users, tracks,client,ready])

  console.log('client -- ', { ...client});

  const mute = async(type) =>{
      if(type === "audio"){
         
      } else if(type === "video"){

      }
  }

  const removeFromChannl = async(user) =>{
    await client.unsubscribe(user)
    await client.leave();
    users = users.filter((User)=>User.uid !== user.uid)

   console.log('users', users);

  }

    useEffect(()=>{

        const { _gateway } = { ...client }
        const { inChannelInfo, joinInfo, joinGatewayStartTime } = { ..._gateway }

        const { cname, cid } = { ...joinInfo }

        console.log(test);
        
        client.on("ChannelMessage",async(user)=>{
            console.log('iiiiiii',user);
            setTest('ppppppppppppppppp')
            console.log('ppp');
        })
    },[client,test])

  const customEvent = (e) =>{
    setTest(e)
  }

  console.log('from videos',users);

  return (
    <Grid container style={{height:"100%"}}>
        <Grid item xs={gridSpacing}>
            <AgoraVideoPlayer videoTrack={tracks[1]} style={{ height: '100%', width: '100%' }} />
        </Grid>

          <button onClick={() => customEvent("Welcome")}>Custom Event {test}</button>

        {
        users.length > 0 && 
        users.map((user)=>{
            if(user.videoTrack){
                return (
                <Grid item xs={gridSpacing}>

                <div>
                            <p>{test}</p>

                    <button 
                    onClick={()=>mute("audio")}
                    >Mic Off</button>

                    <button
                    onClick={()=>mute("video")}
                    >Video Off</button>
                    
                    <button onClick={()=>removeFromChannl(user)}>Remove User</button>
                </div>

                <div>
                    <p>{removeMessage}</p>
                </div>

                <AgoraVideoPlayer 
                videoTrack={user.videoTrack}
                key={user.uid}
                style={{height:"50%",width:"100%"}}
                />
                </Grid>
                )
            } else return null
        })
        }
      </Grid>
  )
  ;
}

export default Videos;
