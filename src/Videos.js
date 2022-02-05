import { Grid } from '@mui/material';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import React, { useEffect, useState } from 'react';
import { remoteClient, useClient, useMicrophoneAndCameraTracks } from './config';
import Controls from './Controls';

import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng'

function Videos(props) {
  console.log(props);

//   console.log('remoteClient', remoteClient);

  const {users} = props;
  const client = useClient()
  const {ready,tracks}= useMicrophoneAndCameraTracks();
  console.log('oooooooooooo',users);
  const [gridSpacing,setGridSpacing] = useState(12);

  useEffect(()=>{
      setGridSpacing(Math.max(Math.floor(12/(users.length+1)),4));

  }, [users, tracks,client,ready])

  console.log('from videos',users);

  return (
    <Grid container style={{height:"100%"}}>
        <Grid item xs={gridSpacing}>
            <AgoraVideoPlayer videoTrack={tracks[1]} style={{ height: '100%', width: '100%' }} />
        </Grid>
        {/* <p>asasasasas</p> */}
        {
        users.length > 0 && 
        users.map((user)=>{
            if(user.videoTrack){
                return (
                <Grid item xs={gridSpacing}>
                
                        <Grid item style={{ height: "5%" }}>
                            {
                                ready && tracks && (
                                    <Controls tracks={tracks} />
                                )
                            }
                        </Grid>

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
