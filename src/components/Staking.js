import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Web3 from 'web3'
import nft from '../abi/abi.json'
import { Link } from 'react-router-dom';

import { nftcon,stackcon,tokenaddr} from '../abi/address'
import stack from '../abi/stack.json'
import nftn from '../abi/nftn.json'

import { Modal, Spinner } from 'react-bootstrap'


function Staking({ acc, web3main }) {
    // console.log("address", addrs)
    const location = useLocation()
    // const fdata = location.state
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        if (acc && web3main) {
            nftinfo(id)
        }

    }, [acc, web3main])


    const [show, setShow] = useState(false);
    const [fdata, setfdata] = useState()
    const handleClose = () => setShow(false);
    const [stcheck, setstcheck] = useState()
    const [account, setaccount] = useState()












    const nftinfo = async () => {
        // console.log('four fun')
        if (web3main && acc) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            setaccount(accounts[0])
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main && acc);
            let swaping = new web3main.eth.Contract(nft, nftcon)



            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("pop22", fees)
                    setfdata(fees)



                }).catch()

        }
    }
    const nftstack = async () => {
        setShow(true)
        if (web3main && acc) {

            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main && acc);
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

    const nftlock = async () => {
        if (web3main && acc) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main && acc);
            let swaping = new web3main.eth.Contract(stack, stackcon)
            swaping.methods.stakenft(id).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    setShow(false)
                    window.location.reload()
                }).catch()

        }
    }

    const nftlock1 = async () => {
        if (web3main && acc)
            setShow(true)
        {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main && acc);
            let swaping = new web3main.eth.Contract(nft, nftcon)
            swaping.methods.nftunstack(id).send({ from: userwalletaddresss, value: 0 })
                .then((fees) => {
                    console.log(fees);
                    // setShow(false)  
                    nftlock11()
                }).catch()

        }
    }
    const nftlock11 = async () => {
        if (web3main && acc)
            setShow(true)
        {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main && acc);
            let swaping = new web3main.eth.Contract(stack, stackcon)
            swaping.methods.unstakenft(id).send({ from: userwalletaddresss, value: 0 })
                .then((fees) => {
                    console.log(fees);
                    setShow(false)
                    window.location.reload()
                }).catch()

        }
    }
    useEffect(() => {
        if (web3main && acc) {
            nftstackdetails()
        }

        // rewardsearnnft()

    }, [acc, web3main])
    const nftstackdetails = async () => {
        if (web3main && acc) {
            const accounts = await web3main.eth.getAccounts();
            console.log("nmn");
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main && acc);
            let swaping = new web3main.eth.Contract(stack, stackcon)
            swaping.methods.nftStakeDetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("nftstack", fees);
                    setstcheck(fees[0])
                }).catch()

        }
    }
    console.log('st', stcheck)
    const rewardsearnnft = async () => {
        if (web3main && acc) {
            const accounts = await web3main.eth.getAccounts();
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            // web3main = new Web3(web3main && acc);
            let swaping = new web3main.eth.Contract(stack, stackcon)
            swaping.methods.rewardsearn(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    console.log("reward", fees);
                }).catch()

        }
    }

    return (
        <div className="length m-0">
            {
                fdata ?
                    <>
                        <section className="item-details-area">
                            <div className="container">
                                <div className="row justify-content-between mt-5">
                                    <div className="col-12 col-lg-5">
                                        <div className="item-info">
                                            <div className="item-thumb coll-img text-center">
                                                <img src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6 mt-5">
                                        {/* Content */}
                                        <div className="content mt-5 mt-lg-0">
                                            <h3 style={{ fontSize: '60px', color: 'orange', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }} className="m-0">{fdata[1]}</h3>
                                            <p style={{ fontSize: '20px', textTransform: 'capitalize', fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>{(fdata[5])}</p>
                                            {/* Owner */}
                                            <div className="owner d-flex align-items-center">
                                                <span>Owned By</span>
                                                <p className="owner-meta no-hover d-flex align-items-center ml-3" >
                                                    <img className="avatar-sm rounded-circle mx-3 " style={{ width: '50px' }} src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                                                    <h6 className="ml-2">{fdata[3]}</h6>
                                                </p>
                                            </div>
                                            {/* Item Info List */}
                                            <div className="item-info-list mt-4">
                                            </div>

                                            <div className="row items">



                                            </div>








                                            {
                                                fdata[8]?.toLowerCase() == account?.toLowerCase()?
                                                    stcheck == "0" ?

                                                        <button style={{ border: 'none', outline: 'none', color: 'white', padding: '10px', borderRadius: '999px' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={nftstack}>Stacking</button>
                                                        : <button style={{ border: 'none', outline: 'none', color: 'white', padding: '10px', borderRadius: '999px' }} className="d-block btn btn-bordered-white mt-4 w-100" onClick={nftlock11} >Unstack</button> : null
                                            }




                                        </div>
                                    </div>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >

                                        <Modal.Body>


                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}><Spinner animation="grow" variant="dark" />
                                                <Spinner animation="grow" variant="dark" />
                                                <Spinner animation="grow" variant="dark" />
                                                <Spinner animation="grow" variant="dark" />
                                                <Spinner animation="grow" variant="dark" />
                                                <Spinner animation="grow" variant="dark" />
                                            </div>






                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        </section>

                    </> : <div style={{ height: '80vh', display: 'flex', paddingTop: '50vh', justifyContent: 'center', alignContent: 'center' }}>
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />
                        <Spinner animation="grow" variant="light" />

                    </div>

            }
        </div>
    );
}


export default Staking;