import { Button } from '@mui/material';
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
   <div className='form'>
          <form className='join'>
              <input style={{fontSize:30}} type="text" placeholder="Enter Channel Name"
                onChange={(e) => channaleNameInputChane(e)}
              />
              <Button color="success" variant="contained" onClick={(e) => joinHandler(e)}>
                Join
              </Button>
          </form>
   </div>
  );
}

export default ChannelForm;
