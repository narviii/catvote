import React, { useState, useEffect } from "react";
import { checkRinkeby } from "../helpers/checkrinkeby";

const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};





export function WalletConnect() {
    const [isConnecting, setConnecting] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [isRinkeby, setRinkeby] = useState(false)


    useEffect(() => {
        const main = async () => {
            if (typeof window.ethereum === 'undefined') return
            setAccounts(await window.ethereum.request({ method: 'eth_accounts' }))
            window.ethereum.on('accountsChanged', accounts => {
                setAccounts(accounts)
            });
            return () => {
                window.ethereum.removeListener('accountsChanged');

            }
        }
        main()

    }, [])

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


    const handleConnect = async () => {
        try {
            if (typeof window.ethereum === 'undefined') return
            setConnecting(true)
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnecting(false)
        } catch (error) {
            console.error(error);
        }
    }

    if (isMetaMaskInstalled() && accounts.length == 0) {
        return (
            <React.Fragment>
                <button className="walletButton btnShadow" disabled={isConnecting} onClick={handleConnect} >Connect Wallet</button>
            </React.Fragment>
        )
    } else if (isMetaMaskInstalled() && accounts.length > 0 && isRinkeby === false) {
        return (
            <React.Fragment>
                <button className="adressButton" disabled={isConnecting}>Please switch network to Rinkeby</button>
            </React.Fragment>
        )
    }
    else if (isMetaMaskInstalled() && accounts.length > 0 && isRinkeby === true) {
        return (
            <React.Fragment>
                <button className="adressButton" disabled={isConnecting}>{accounts[0]}</button>
            </React.Fragment>
        )
    } else return (
        <React.Fragment>
            <a href="https://metamask.io/">
                <button className="walletButton btnShadow" >No wallet detected. Please install metamask.</button>
            </a>
        </React.Fragment>
    )
}