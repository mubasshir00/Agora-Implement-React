import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { config,useClient,useMicrophoneAndCameraTracks,channelName, remoteClient } from './config';
import Controls from './Controls';
import Videos from './Videos';
import database from './firebase'
import { ref, set,push } from 'firebase/database';
import { AgoraRTCRemoteUser, IAgoraRTCRemoteUser} from 'agora-rtc-sdk-ng';
import axios from 'axios';
// const database = getDatabase();

function VideoCall(props) {

  console.log('remoteClient', remoteClient);

  let videoCallData = {}
  const { setInCall, channelName} = props
  let [users,setUsers] = useState([]);
  const [start,setStart] = useState(false)
  const client = useClient();
  const {ready,tracks} = useMicrophoneAndCameraTracks()
  
  // console.log('aaa',tracks);

  useEffect(()=>{
    let init = async (name) =>{

      // remoteClient.on("user-joined",async(user,mediaType)=>{
      //   console.log('teeeeeeeeest');
      // })


      client.on("user-published",async(user,mediaType)=>{
        // console.log('user',user);
        await client.subscribe(user,mediaType)

        if(mediaType === "video"){
          // console.log('user', user);

          setUsers((prevUsers)=>{
            return [...prevUsers,user];
          })
        }
        if(mediaType === "audio"){
          // console.log('user', user);

          user.audioTrack?.play()
        }
      })

      console.log('users',users);

      client.on("user-unpublished",(user,mediaType)=>{
        if(mediaType === "audio"){
          if(user.audioTrack) user.audioTrack.stop();
        }
        if(mediaType ==="video"){
          setUsers((prevUsers)=>{
            return prevUsers.filter((User)=>User.uid !== user.uid);
          })
        }
      })

      client.on("user-left",(user)=>{
        setUsers((prevUsers)=>{
          return prevUsers.filter((User)=>User.uid !== user.uid)
        })
      })

      // client.on("user-joined",(user)=>{
      //   setUsers(()=>{
      //     return user.uid
      //   })
      // })
      // _joinInfo

      client.on("connection-state-change", async (curState, revState, reason) => {


        const testUser = {
          "userId": "aa",
          "name": "QQQQQWWW"
        }

        // fetch('http://localhost:8080/api/v1/users', {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(testUser)
        // }).then(() => {
        //   console.log('NEW ');
        // })

        // axios.post('http://localhost:8080/api/v1/users',testUser)
        // .then(function(response){
        //   console.log(response);
        // })
        // .catch(function(error){
        //   console.log(error);
        // })

        //SDK is connecting to the server
        if (curState === "CONNECTING") {

        }
        //connecting to the server and join a channel
        else if (curState === "CONNECTED") {

        }
        //
        else if (curState === "DISCONNECTED") {

        }
        else if (curState === "DISCONNECTING") {

        }
        else if (curState === "RECONNECTING") {

        }
        console.log('curState', curState);
        console.log('revState', revState);
        console.log('reason', reason);
      })
      
      try{
        await client.join(config.appId, name, config.token, null)
        // await client.leave()
        var tempData = client
        videoCallData = {
          uid:tempData.uid,
        }
        // console.log('client TTTTTT', tempData.uid);

        const {_gateway} = {...client}
        const { inChannelInfo, joinInfo, joinGatewayStartTime } = { ..._gateway}

        const { cname, cid} = {...joinInfo}

        videoCallData = { ...videoCallData, ...inChannelInfo ,startTime : joinGatewayStartTime ,cname,cid}

        console.log('client TTTTTT', videoCallData);

        // database.child('joiningInfo').push(
        //   videoCallData,
        //   err=>{
        //     if(err){
        //       console.log(err);
        //     }
        //   }
        // )

        // const db = getDatabase()

        // push(ref(database,'joiningInfo'),videoCallData)
        // console.log(client.uid);
        // console.log('client', joinInfo );
        // var tempData = client.uid
        // console.log('aalll allll',client);

        axios.post('http://localhost:8080/api/v1/users', videoCallData)
        .then(function(response){
          console.log(response);
        })
        .catch(function(error){
          console.log(error);
        })

      } catch(error) {
        console.log("Error");
      }

      // try {
      //   await client.leave()
      // } catch (error){
      //   console.log("Error");
      // }

    if(tracks) await client.publish([tracks[0],tracks[1]]);
    setStart(true)

    }

    if(ready && tracks) {
      try {
        init(channelName)
      } catch (error) {
        console.log(error);
      }
    }

  },[channelName,client,ready,tracks])
  // console.log('users', users);
  return (
    <Grid container direction="column" style={{height:"100%"}}>
      <Grid item style={{height:"5%"}}>
      {
      ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall}/>
      )
      }
      </Grid>
      {/* <p> {users}</p> */}
      <Grid item style={{height:"95%"}}>
        {start && tracks && <Videos tracks={tracks} users={users}/>}
      </Grid>
    </Grid>
  );
}

export default VideoCall;
