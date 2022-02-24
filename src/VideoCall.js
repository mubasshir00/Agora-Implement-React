import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { config,useClient,useMicrophoneAndCameraTracks,channelName, remoteClient } from './config';
import Controls from './Controls';
import Videos from './Videos';
import database from './firebase'
import { ref, set,push } from 'firebase/database';
import { AgoraRTCRemoteUser, IAgoraRTCRemoteUser} from 'agora-rtc-sdk-ng';
import axios from 'axios';
import { useChannelRTM, useChannelRTMInstance, useClientRTM, useClientRTMInstance } from './configRTM';
// const database = getDatabase();

import AgoraRTM from 'agora-rtm-sdk';
import TextDisplay from './TextDisplay';
import Qna from './Qna';


function VideoCall(props) {

  // console.log('remoteClient', remoteClient);

  const clientRTM = useClientRTM();
  const testChannel = useChannelRTM(clientRTM)

  console.log('Client RTM --- ',clientRTM);
  console.log('Test Channel ------',testChannel);

  let videoCallData = {}
  let [connectingState,setConnectingState] = useState([])
  const { setInCall, channelName} = props
  let [users,setUsers] = useState([]);
  const [start,setStart] = useState(false)
  const client = useClient();
  const {ready,tracks} = useMicrophoneAndCameraTracks()
  
  const [inputText,setInputText] = useState('')
  const [texts,setTexts] = useState([]);
  const [isLoggedIn,setLoggedIn] = useState(false)
  // console.log('aaa',tracks);
  const [uid,setUid] = useState('');

  const [qna,setQna] = useState();

  const { _gateway } = { ...client }
  const { inChannelInfo, joinInfo, joinGatewayStartTime } = { ..._gateway }

  // console.log('client.login',client.login)
  // RTM authentication
  let login = async() =>{
    await clientRTM.login({uid})
    await testChannel.join();

    testChannel.on('ChannelMessage',(msg,uid)=>{
      setTexts((previous)=>{
        return [...previous,{msg,uid}]
      })
    })

    testChannel.on('MemberJoined',(memberId)=>{
      console.log('New Member: ', memberId)
    })
    setLoggedIn(true);
  }

  let logout = async()=>{
    testChannel.leave()
    client.logout()
    testChannel.removeAllListeners()
    client.removeAllListeners()
    setLoggedIn(false)
  }

  const sendMsg = async (text) =>{
    let message = clientRTM.createMessage({
      text , messageType :'TEXT'
    }) 
    await testChannel.sendMessage(message)
    setTexts((previous)=>{
      return [...previous,{msg:{text},uid}]
    })
    setInputText('')
  }

  const startQuiz = async () =>{
  await  axios.post('http://localhost:8080/qna')
    .then(function(response){
      console.log(response);
      questionQuiz(response?.data)
    })
    .catch(function(error){
      console.log(error);
    })
  }

  const questionQuiz = async (i) => {
    const text = JSON.stringify(i)
    let message = clientRTM.createMessage({
      text,messageType:'TEXT'
    })
    await testChannel.sendMessage(message)
    console.log('text', text);
    setQna({msg:{text},uid})
  }

  console.log('qnaaa', qna?.msg?.text);
  let jsonQna ;
  if(qna!==undefined){
   jsonQna = JSON.parse(qna?.msg?.text)
  }
  console.log('jsonQna', jsonQna);

  testChannel.on("testEventRTM1", () => {
    console.log('Test Event Outside UseEffect');
  })

  

  useEffect(()=>{
    let init = async (name) =>{
      
      testChannel.on("testEventRTM2",()=>{
        console.log('Test Event');
      })

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

      client.on("connection-state-change", async (curState, revState, reason) => {
        const {_gateway} =  {...client}
        const { inChannelInfo, joinInfo, joinGatewayStartTime } = { ..._gateway }
       
        
        if (curState === "CONNECTING") {

          console.log('Connecting', Date.now());

          axios.post('http://localhost:8080/api/v1/connectionstate', {
            uid:joinInfo.uid,
            currentState: "CONNECTING",
            previousState: revState,
            reason: reason,
            timeStamp:Date.now()
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })

        }
        
        //connecting to the server and join a channel
        else if (curState === "CONNECTED") {
      
          console.log('CONNECTED', Date.now());

          axios.post('http://localhost:8080/api/v1/connectionstate', {
            uid: joinInfo.uid,
            currentState: "CONNECTED",
            previousState: revState,
            reason: reason,
            timeStamp: Date.now()
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })

        }
        //
        else if (curState === "DISCONNECTED") {
         
          console.log('DISCONNECTED', Date.now());

          axios.post('http://localhost:8080/api/v1/connectionstate', {
            uid: joinInfo.uid,
            currentState: "DISCONNECTED",
            previousState: revState,
            reason: reason,
            timeStamp: Date.now()
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
        }
        else if (curState === "DISCONNECTING") {
        
          console.log('DISCONNECTING', Date.now());

          axios.post('http://localhost:8080/api/v1/connectionstate', {
            uid: joinInfo.uid,
            currentState: "DISCONNECTING",
            previousState: revState,
            reason: reason,
            timeStamp: Date.now()
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
        }
        else if (curState === "RECONNECTING") {
         
          console.log('Test RECONNECTING', Date.now());

          axios.post('http://localhost:8080/api/v1/connectionstate', {
            uid: joinInfo.uid,
            currentState: "RECONNECTING",
            previousState: revState,
            reason: reason,
            timeStamp: Date.now()
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })

        }
        console.log('curState', curState);
        console.log('revState', revState);
        console.log('reason', reason);
      })
     
      try{
        await client.join(config.appId, name, null)
        // await client.leave()
        var tempData = client

        console.log('Connecting State',connectingState);
        videoCallData = {
          uid:tempData.uid,
        }
        // console.log('client TTTTTT', tempData.uid);

        const {_gateway} = {...client}
        const { inChannelInfo, joinInfo, joinGatewayStartTime } = { ..._gateway}

        const { cname, cid} = {...joinInfo}

        videoCallData = { ...videoCallData, ...inChannelInfo ,startTime : joinGatewayStartTime ,cname,cid}

        console.log(name);
        console.log('client TTTTTT',tempData);


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
  console.log('texts',texts);
  
  return (
    <Grid container direction="column" style={{height:"100%"}}>
      <Grid item style={{height:"5%"}}>
      {
      ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall}/>
      )
      }
      </Grid>
      
      <div style={{ display: 'flex', flex: 10, flexDirection: 'column', margin: 20, marginLeft: '10%', marginRight: '10%', paddingRight: 10, paddingLeft: 10, overflowY: 'scroll' }}>
        <div>
          <div style={{ display: 'flex', margin: 'auto' }}>
            <p style={{ marginRight: 5 }}>Enter a user ID: </p>
            <input style={{ marginRight: 5 }} type='text' disabled={isLoggedIn} value={uid} onChange={e => setUid(e.target.value)} />
            <button disabled={!uid}  onClick={isLoggedIn ? logout : login}>{isLoggedIn ? 'Logout' : 'Login'}</button>
          </div>

          <button onClick={() => startQuiz()}>Quiz Start</button>

          <p>{jsonQna?.questions}</p>
          <div>
            
            {/* if(qna!==undefined){
              jsonQna = JSON.parse(qna?.msg?.text)
            } */}
            {
            qna!==undefined ? <Qna qna={qna}/> :'b'  
            }
            {/* {
              jsonQna?.answer?.map((i)=>{
                const { auid, answer} = i;
                return(
                  <div>
                    <button>Y</button>
                    <p>{answer}</p>
                  </div>
                )
              })
            } */}
          </div>

          {
            texts?.map((i) => {
              console.log('text msge', i.msg.text);
             return(
               <div key={Math.random() * Date.now()}
               style={{display:'flex',flexDirection:'row'}}
               >
                 
                 <p>
                   {i.msg.text} 
                 </p>
                 <p>
                   - <p>{i.uid}</p>
                 </p>
               </div>
             )
            })
          }
          {/* <TextDisplay texts={texts}/> */}
        </div>
        
      </div>

      <input value={inputText} onChange={e=>setInputText(e.target.value)} type="text"/>

      <button onClick={()=>sendMsg(inputText)}>Send Message</button>

      <Grid item style={{height:"95%"}}>
        {start && tracks && <Videos tracks={tracks} users={users}/>}
      </Grid>
    </Grid>
  );
}

export default VideoCall;
