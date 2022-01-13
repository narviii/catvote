import { useState } from "react"

export function Logs({ logs }) {
  //console.log(logs)
  if (logs == undefined) return null
  const yays = logs.filter(elem => elem.args.vote === true)
  const nays = logs.filter(elem => elem.args.vote === false)
  let verdict
  if (yays.length > nays.length){
    verdict = "We are going to feed the cat."
  } else if (yays.length < nays.length){
    verdict = "Cat is going to stay hungry"
  } else if (yays.length === nays.length ){
    verdict = "Khm. Not sure what to do."
  }
  return (
    <div className='voteBtnGroup mainPanel'>
      <div>
        <h3>
          {`Yays:` + yays.length}
        </h3>
        <div className='votesColumn'>
          {yays.map(elem => <p key={elem.args.addr} >{elem.args.addr}</p>)}
        </div>
      </div>
      <div>
        <h3>
          {`Nays:` + nays.length}
        </h3>
        <div className='votesColumn'>
          {nays.map(elem => <p key={elem.args.addr}>{elem.args.addr}</p>)}
        </div>

      </div>
      <p className="verdict">
        {verdict}
      </p>
    </div>
  )
}
