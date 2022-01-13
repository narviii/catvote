import './App.css';
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import CatVote from './artifacts/contracts/catvote.sol/CatVote.json'
import { WalletConnect } from './components/walletConect';
import { Logs } from './components/logs';
import { getLogs } from './helpers/getlogs';
import { checkRinkeby } from './helpers/checkrinkeby';
const contractAdress = process.env.REACT_APP_CONTRACT




function App() {
  const [isMetamask, setMetaMask] = useState(undefined)
  const [error, setError] = useState(false)
  const [logs, setLogs] = useState([])
  const [isRinkeby, setRinkeby] = useState(false)

  const vote = async (vote) => {
    if (typeof window.ethereum === 'undefined') return
    if (isRinkeby===false) return

    try {
      setError("")
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAdress, CatVote.abi, signer)
      const transaction = await contract.recordVote(vote)
      setError("Voted!")
      const reciept = await transaction.wait()
      setError("Transaction went through!")
      const logs = await getLogs()
      setLogs(logs)
    } catch (error) {
      setError('Some error. Maybe already voted?')
    }
  }

  const requestAccount = async () => {
    setError("")
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts !== undefined && accounts.length > 0) setError("Connected!")
      console.log(accounts)
    } catch (error) {
      setError("Connection error")
    }


  }
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return
    const main = async () => {
      setRinkeby(await checkRinkeby())
    }
    main()
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  })

  useEffect(() => {
    setMetaMask(typeof window.ethereum === 'undefined')
  }, [])

  useEffect(async () => {
    const logs = await getLogs()
    setLogs(logs)
  }, [])



  return (
    <div className="App">
      <section className='container'>

        <div className='mainPanel topMargin'>
          <h1>
            Should we feed the cat?
          </h1>
          <h3>
            Let's vote on a blockchain.
          </h3>
          <p style={{textAlign:'center'}}>
            App uses Metamask and voting is on Rinkeby test network.
          </p>
          
          <div className='voteBtnGroup'>
            <button className="voteButton btnShadow" onClick={() => vote(true)} disabled={isMetamask ? true : false}>Yay!</button>
            <button className="voteButton btnShadow" onClick={() => vote(false)} disabled={isMetamask ? true : false}>Nay!</button>
          </div>
          <h3>
            Your wallet:
          </h3>
          <div className='voteBtnGroup'>
            <WalletConnect />
          </div>
          <div className='voteBtnGroup'>
            <p>{error}</p>
          </div>
        </div>
      </section>


      <section className='container'>
        <Logs logs={logs} />
      </section>
    </div>
  );
}

export default App;
