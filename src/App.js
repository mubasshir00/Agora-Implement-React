import axios from 'axios';
import { useEffect, useState } from 'react';
import AgoraDashboard from './AgoraDashboard';
import './App.css';
import ChannelForm from './ChannelForm';
import VideoCall from './VideoCall';

function App() {
  const [inCall,setInCall] = useState(false)
  const [channelName,setChannelName] = useState("");

  const [channelData,setChannelData] = useState();
  const [usersData,setUsersData] = useState();

  const [createChanelName, setCreateChanelName] = useState("")

  const [expirationTime,setExpirationTime] = useState("")

  const createChaneelNameInputChange = (e) => {
    setCreateChanelName(e.target.value)
  }

  const createExpirationTimeChange = (e) =>{
    setExpirationTime(e.target.value)
  }

  const createHandler = (createChanelName, expirationTime) =>{
    console.log(createChanelName,expirationTime);

    axios.post('http://localhost:8080/access_token',
    {
      channelName: createChanelName,
      expireTime: expirationTime
    })
      .then(function (response) {
        console.log(response);
      })
    .catch(function (error) {
        console.log(error);
      })

  }

  useEffect(()=>{
    axios.get('http://localhost:8080/broadcasting/channel')
    .then(function(response){
      // console.log('channel response',response);
      setChannelData(response.data)
    })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:8080/broadcasting/users')
      .then(function (response) {
        // console.log('users response', response);
        setUsersData(response.data)

      })
      .catch(function (error) {
        console.log(error);
      })
      
  },[])

  const CreateChannelFunction = () =>{
    return (
      <div>
        <p>Create new Channel</p>
        <input type="text" placeholder="Channel Name" onChange={(e) => createChaneelNameInputChange(e)} />
        <input type="number" placeholder="Expiration time" onChange={(e) => createExpirationTimeChange(e)} />
        <button onClick={(e) => createHandler(createChanelName, expirationTime)}>create</button>
      </div>
    )
  }
  
  return (
    <div className='App' style={{height:"100%"}}>

      {
        inCall ? '' : <CreateChannelFunction/>
      }

      {inCall ? <VideoCall setInCall={setInCall} channelName={channelName} /> : <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />}

    {/* <VideoCall/> */}

    {
    inCall ? 'a' : <AgoraDashboard usersData={usersData} channelData={channelData}/>
    }

    </div>
  );
}

export default App;
