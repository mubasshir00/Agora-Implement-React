import { useState } from 'react';
import './App.css';
import ChannelForm from './ChannelForm';
import VideoCall from './VideoCall';

function App() {
  const [inCall,setInCall] = useState(false)
  const [channelName,setChannelName] = useState("");
  return (
    <div className='App' style={{height:"100%"}}>

      {inCall ? <VideoCall setInCall={setInCall} /> : <button onClick={() => setInCall(true)}>Join Call</button>}

      <ChannelForm setInCall={setInCall} setChannelName={setChannelName}/>
    {/* <VideoCall/> */}
    </div>
  );
}

export default App;
