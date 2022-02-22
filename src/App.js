import axios from 'axios';
import { Field, Form, Formik } from 'formik';
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

  const [createChanelName, setCreateChanelName] = useState()
  const [expirationTime,setExpirationTime] = useState()

  const handleChannelNameChange = (e) => {
    setCreateChanelName(e.target.value);
  }

  const expirationTimeHandleChange = (e) =>{
    setExpirationTime(e.target.value)
  }


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

  const handleSubmit = e =>{
    e.preventDefault()
    console.log(createChanelName);
    console.log(expirationTime);
  }
 
  const createHandler = (e) =>{
    e.preventDefault()
    const {createChanelName,expirationTime} = formValues
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
      
  },[formValues])

  const CreateChannelFunction = () =>{
    return (
      <div>
        <p>Create new Channel</p>
        <form onSubmit={createHandler}>
          <input 
            

            type="text" value={formValues.createChanelName} name="createChanelName" onChange={handleChange}
          />
          <input 
            name="expirationTime"
       type="number" 
            // autoFocus="autoFocus"
          value={formValues.expirationTime}
            onChange={handleChange}
          />
          <button >Submit Now</button>
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
