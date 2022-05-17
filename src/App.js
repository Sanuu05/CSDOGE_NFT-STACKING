import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Allstack from "./components/Allstack";
import Cathstack from "./components/Cathstack";
import Header from "./components/Header";
import Main from "./components/Main";
import Mystack from "./components/Mystack";
import Staking from "./components/Staking";
import { Modal } from 'react-bootstrap'


function App() {
  const [accountid, setaccountid] = useState()
  const [accountid1, setaccountid1] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [chainid, setchainid] = useState()
  const [acc, setacc] = useState(false)
  const [web3main, setweb3main] = useState()
  const [prov, setprov] = useState()
  const change = ((v) => {

    setacc(v)
  })
  const provider1 = ((v) => {
    setprov(v)
  })
  const web3m = ((v) => {
    setweb3main(v)

  })
  console.log('acuccc', prov)
  // const onc = () => {
  //   settheme(!theme)
  // }
  // console.log('fffff', theme)

  // const history = useHistory()
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (acc) {
  //       const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       setaccountid(accounts1[0])
  //     }
  //     // console.log(accounts1)
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(async () => {
  //   if (acc) {

  //     const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     setaccountid1(accounts1[0])

  //   }



  // }, [acc]);
  useEffect(() => {
    if (accountid != accountid1) {
      window.location.reload()
      // history.push('/')
    }

  }, [accountid])
  useEffect(async () => {
    if (acc && prov) {

      const chainId = await prov.request({ method: 'eth_chainId' });
      console.log('chain', chainid)

      setchainid(chainId)

      const accountsa = await prov.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
      });
      console.log("switch", accountsa)
      await prov.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    }


  }, [acc, prov]);
  // useEffect(()=>{
  //   if(acc){
  //     setShow(false)
  //   }else{
  //     setShow(true)
  //   }

  // },[acc])
  useEffect(() => {
    if (chainid && acc) {
      console.log('ckli', chainid)
      chainid == 0x38  ? setShow(false) : setShow(true)
    }

  }, [accountid1, chainid, acc])
  useEffect(async () => {
    if (acc && web3main) {
      // const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // setaccountid(accounts1)
      if (window.ethereum) {
        async function getAccount() {
          const accounts = await window.ethereum.enable();
          const account = accounts[0];
          // do something with new account here
          // alert('accont changed')
          // alert('hello')
          // history.push('/')
          // window.location.reload()
        }


        window.ethereum.on('accountsChanged', function (accounts) {
          console.log("account", accounts)
          getAccount();
        })
      }
    }
  }, [])

  return (
    <div className="App">
      {
        acc?  <Switch>
        {/* <Header change={change} web3m={web3m} provider1={provider1}/> */}
        <Route exact path="/" >
          <Header change={change} web3m={web3m} provider1={provider1} />

          <Allstack acc={acc} web3main={web3main} prov={prov} />
        </Route>
        <Route exact path="/mystack" >
          <Header change={change} web3m={web3m} provider1={provider1} />

          <Mystack acc={acc} web3main={web3main} prov={prov} />
        </Route>
        <Route path="/staking/:id" >
          <Header change={change} web3m={web3m} provider1={provider1} />
          {/* <Header/> */}
          <Staking acc={acc} web3main={web3main} prov={prov} />
        </Route>
        <Route path="/category/:id" >
          <Header change={change} web3m={web3m} provider1={provider1} />
          {/* <Header/> */}
          <Cathstack acc={acc} web3main={web3main} prov={prov} />
        </Route>

      </Switch>:
      <div>
         <Header change={change} web3m={web3m} provider1={provider1} />
         <div style={{height:'80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
         <h2 style={{fontFamily:'fantasy',color:'white', fontSize:'30px'}}>Wallet is not connected</h2>
           </div>
      
        </div>
      
      }
    
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >

        <Modal.Body>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h5>Switch Wallet to BSC Mainnet</h5>

          </div>

        </Modal.Body>
      </Modal>



    </div>

  );
}

export default App;
