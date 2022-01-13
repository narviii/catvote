import { useState} from "react"

export function Logs({logs}) {
   //console.log(logs)
   if (logs==undefined) return null
   const yays = logs.filter(elem => elem.args.vote === true)
   const nays = logs.filter(elem => elem.args.vote === false)
    return (
      <div className='voteBtnGroup mainPanel'>
        <div>
          <h3>
            Yays!
          </h3>
          <div className='votesColumn'>
          {yays.map(elem => <p key={elem.args.addr} >{elem.args.addr}</p>)}
          </div>
        </div>
        <div>
          <h3>
            Nays!
          </h3>
          <div className='votesColumn'>
            {nays.map(elem => <p key={elem.args.addr}>{elem.args.addr}</p>)}
          </div>
        </div>
      </div>
    )
  }
  