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

  // const [createChanelName, setCreateChanelName] = useState()

  // const [expirationTime,setExpirationTime] = useState()

  // const initialValues = {createChanelName : "" , expirationTime:""}

  const [formValues, setFormValues] = useState({ createChanelName: "", expirationTime: "" })

  const handleChange = (e) =>{
    e.preventDefault()
    const {name,value} = e.target;
    console.log(value);
    setFormValues((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  // const handleSubmit = e =>{
  //   console.log(formValues.createChanelName);
  //   console.log(formValues.expirationTime);
  // }
 
  const createHandler = (e) =>{
    // e.preventDefault()
    const {createChanelName,expirationTime} = formValues
    // console.log(createChanelName,expirationTime);

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
        <form>
          <input type="text" name="createChanelName" value={formValues.createChanelName}
            onChange={(e) => handleChange(e)}
          />
          <input type="number" name="expirationTime" value={formValues.expirationTime}
          onChange={handleChange}
          />
          <button onClick={createHandler}>Submit Now</button>
        </form>
        {/* <input type="text" placeholder="Channel Name" onChange={(e) => createChaneelNameInputChange(e.target.value)} />
        <input type="number" placeholder="Expiration time" onChange={(e) => createExpirationTimeChange(e.target.value)} />
        <button onClick={(e) => createHandler(createChanelName, expirationTime)}>create</button> */}
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
