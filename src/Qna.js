import React from 'react'

const Qna = ({qna}) => {
console.log('qqqqqqq',qna.msg);
  const jsonQna = JSON.parse(qna?.msg?.text)
  return (
    <div>
          {
              jsonQna?.answer?.map((i)=>{
                const { auid, answer} = i;
                return(
                  <div>
                    <button>Y</button>
                    <p>{answer}</p>
                  </div>
                )
              })
            }
    </div>
  )
}

export default Qna