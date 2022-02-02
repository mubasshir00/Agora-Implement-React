import React from 'react';
import { appId } from './config';

function ChannelForm(props) {
//   console.log('oooooo',props);
  const { setInCall, setChannelName} =props

  const channaleNameInputChane = (e) =>{
      setChannelName(e.target.value)
  }

  const joinHandler = (e) =>{
      e.preventDefault();
      setInCall(true)
  }

  return (
   <form className='join'>
    
    <input type="text" placeholder="Enter Channel Name" 
    onChange={(e)=>channaleNameInputChane(e)}
    />
    <button onClick={(e) => joinHandler(e)}>
        Join
    </button>
   </form>
  );
}

export default ChannelForm;
