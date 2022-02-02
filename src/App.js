import { useState } from 'react';
import './App.css';
import VideoCall from './VideoCall';

function App() {
  const [inCall,setInCall] = useState(false)
  return (
    <div className='App' style={{height:"100%"}}>

      {inCall ? <VideoCall setInCall={setInCall} /> : <button onClick={() => setInCall(true)}>Join Call</button>}
    {/* <VideoCall/> */}
    </div>
  );
}

export default App;
