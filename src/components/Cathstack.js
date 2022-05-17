import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Web3 from 'web3'
import nft from '../abi/abi.json'
import { Link } from 'react-router-dom';

import { nftcon,stackcon,tokenaddr,sitelink } from '../abi/address'
import stack from '../abi/stack.json'
import erc20 from '../abi/ERC20.json'

import { Modal, Spinner } from 'react-bootstrap'
import img1 from '../img/img1.png'
const loop = [1, 2, 3, 1, 2, 3]
function Cathstack({ acc, web3main }) {
    // console.log("address", addrs)
    const location = useLocation()
    // const fdata = location.state
    const { id } = useParams()
    console.log("abc", id)
    useEffect(() => {
        // nftinfo(id)
        if (acc && web3main) {
            nfttotal()
            totalSupply()
        }

    }, [acc, web3main])


    const [show, setShow] = useState(false);
    const [fdata, setfdata] = useState([])
    const handleClose = () => setShow(false);
    const [tottoken, settottoken] = useState()
    const [account, setaccount] = useState()
    console.log(fdata)





    const nfttotal = async () => {
        console.log('four fun')
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            setaccount(accounts[0])
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, nftcon)



            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((length) => {
                    console.log('length2', length)

                    // setassetlist(Number(length))
                    for (let i = 1; i <= Number(length); i++) {
                        console.log('clk', i)
                        nftstackdetails(i)
                        // nftinfo(i);
                        // setspin(i)


                    }



                }).catch()

        }
    }









    const nftinfo = async (id) => {
        // console.log('four fun')
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, nftcon)



            swaping.methods.nftinformation(id[0]).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees)
                    getallasset({ ...id, 9: fees[6], 10: fees[1], 12: JSON.parse(fees[5])?.cath })



                }).catch()

        }
    }
    const getallasset = (data) => {
        setfdata(old => [
            ...old, data
        ])

    }
    const nftstack = async () => {
        setShow(true)
        if (web3main) {

            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(web3main);
            let swaping = new web3main.eth.Contract(nft, nftcon)
            // console.log(swaping.methods)
            console.log(id)
            swaping.methods.nftstake(id).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    nftlock()
                }).catch()

        }
    }
    const totalSupply = async (id) => {
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(window.ethereum);
            let swaping = new web3main.eth.Contract(erc20, tokenaddr)

            swaping.methods.totalSupply().call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("cvcv",fees);
                    settottoken(fees)
                }).catch()

        }
    }

    const nftlock = async () => {
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(web3main);
            let swaping = new web3main.eth.Contract(stack, stackcon)
            swaping.methods.stakenft(id).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    setShow(false)
                }).catch()

        }
    }

    const nftlock1 = async (id) => {
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(web3main);
            let swaping = new web3main.eth.Contract(stack, '')
            swaping.methods.unstakenft(id).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                }).catch()

        }
    }
    useEffect(() => {
        // nftstackdetails(0)
        // rewardsearnnft()

    }, [])
    const nftstackdetails = async (id) => {
        if (web3main) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(web3main);
            let swaping = new web3main.eth.Contract(stack, stackcon)
            swaping.methods.nftStakeDetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log("nftstack",fees);   
                    if (fees[0] === "0") {

                    } else {
                        rewardsearnnft(fees)
                        // console.log('aa',fees[0])
                    }
                }).catch()

        }
    }
    const rewardsearnnft = async (id) => {
        if (web3main) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // window.web3 = new Web3(web3main);
            let swaping = new web3main.eth.Contract(stack, stackcon)
            swaping.methods.rewardsEarn(id[0]).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("reward", { ...id, 8: fees });
                    nftinfo({ ...id, 8: fees })
                }).catch()

        }
    }

    console.log('all', fdata)
    const cathlit = [
        {
            name: "cathone",
            img: img1,
            total: (fdata?.filter((p) => p[12] === "cathone")).length
        },
        {
            name: "cathtwo",
            img: img1,
            total: (fdata?.filter((p) => p[12] === "cathtwo")).length
        },
        {
            name: "caththree",
            img: img1,
            total: (fdata?.filter((p) => p[12] === "caththree")).length
        },
        {
            name: "cathfour",
            img: img1,
            total: (fdata?.filter((p) => p[12] === "cathfour")).length
        }
    ]
    const fildata = fdata?.filter((p) => p[12] === id)
    const fildatac = fdata?.filter(p=>p[2]?.toLowerCase()===account?.toLowerCase())
    const totalreward = fdata?.reduce((pre, curr)=>(Number(curr[8])+pre),0)
    const myreward = fildatac?.reduce((pre, curr)=>(Number(curr[8])+pre),0)
    console.log('allca', fildata)
    return (
        <div className='main'>
            <div className='container'>
            <div className='row mt-3'>
                    <div className='col-md-4 col-12 mt-3'>
                        <div className='card d-flex flex-row justify-content-between px-3'>
                            <div className=''>
                                <p>NFT STAKED</p>
                                <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{fdata?.length}</p>

                            </div>
                            <div className=''>
                                <p>Rewards EARNED</p>
                                <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{myreward}</p>

                            </div>

                        </div>
                    </div>
                    <div className='col-md-8 col-12 mt-3'>
                        <div className='card d-flex flex-row justify-content-between px-3'>
                            <div className=''>
                                <p>APR</p>
                                <p style={{ fontSize: '15px', fontWeight: 'bold' }}>40%</p>

                            </div>
                            <div className=''>
                                <p>TOTAL REWARDS</p>
                                <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{totalreward}</p>

                            </div>
                            <div className=''>
                                <p>TOKEN SUPPLY</p>
                                <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{tottoken}</p>

                            </div>


                        </div>
                    </div>
                    {/* <div className='col-md-3 col-12 mt-3'>
                        <div className='card d-flex flex-row justify-content-between px-3'>
                            <div className=''>
                                <p>BABY EARNED</p>
                                <p>0</p>

                            </div>
                            <div className=''>
                                <button>Collect</button>

                            </div>

                        </div>
                    </div> */}
                </div>
                <div className='row mt-3'>


                    {
                        fildata?.map((v) => {
                            return <div className='col-md-6 col-xl-4 col-12 mb-3'>
                                <div className='card shadow'>
                                    <div className='img p-3'>
                                        {/* <a href={`/staking/${v[0]}`}> */}
                                        <img src={`https://ipfs.infura.io/ipfs/${v ? v[9] : null}`} className='img-fluid' />
                                        {/* <img src={v?.img} className='img-fluid' /> */}
                                        {/* </a> */}

                                    </div>
                                    <div className='cardbody'>
                                        <h3 className='text-center'>{v[10]}</h3>
                                        <div className='d-flex justify-content-between px-3'>
                                            <p style={{ fontSize: '20px' }}>NFT ID:</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{v[0]}</p>
                                        </div>
                                        <div className='d-flex justify-content-between px-3'>
                                            <p style={{ fontSize: '20px' }}>Category:</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{v[12]}</p>
                                        </div>
                                        <div className='d-flex justify-content-between px-3'>
                                            <p style={{ fontSize: '20px' }}>Rewards:</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{v[8]}</p>
                                        </div>
                                        {/* <div className='d-flex justify-content-between px-3'>
                                            <p style={{ fontSize: '20px' }}>Owned:</p>
                                            <p style={{ fontSize: '10px',lineBreak:"auto",width:'50%', fontWeight: 'bold' }}>{v[2]}</p>
                                        </div> */}
                                        {/* <button>oppps... you dont have the claims</button> */}
                                       < div className='onbtn'>
                                            <a href={`${sitelink}/item-details/${v[0]}`}>
                                            <button>View NFTs on Nftartland</button>
                                            </a>
                                        
                                            </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Cathstack
