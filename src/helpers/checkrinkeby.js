export const checkRinkeby = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return (chainId === '0x4')
}