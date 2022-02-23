import React from 'react'

function AgoraDashboard({ usersData, channelData}) {
  // console.log(usersData);
  // console.log(channelData);
  return (
    <div>
      <div>
        <p>Total Channel {channelData?.length} </p>
        <p>Total User {usersData?.length}</p>
      </div>
      <div className='channelName'>
        {
          channelData?.map((i)=>{
            // console.log(i);
            return (
              <div >
                <button type="">{i.channelName}</button>
                <p>Expiration  {i.expireTime}</p>
                <p>Created at : {i.createdTime}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AgoraDashboard