import { ethers } from 'ethers'
import CatVote from './../artifacts/contracts/catvote.sol/CatVote.json'
const contractAdress = process.env.REACT_APP_CONTRACT


export const getLogs = async () => {
    const provider = new ethers.providers.InfuraProvider("rinkeby");
    const contract = new ethers.Contract(contractAdress, CatVote.abi, provider)
    const logs = await contract.queryFilter('voteCasted')
    return logs
  }