import React, {useState,useEffect} from "react";
import Win from '../assets/win.svg'
import { FaDiscord,FaTwitter } from "react-icons/fa"
import Blur1 from '../assets/Blur1.svg';
import TableComponent from "../Components/Table";
import './Winners.css'
import { useLocation } from "react-router-dom";

// SystemProgram is a reference to the Solana runtime!

const Winners = ({revealWinner}) => {
  const [curretRaffle, setCurrentRaffle] = useState(null)

  const location = useLocation();

  useEffect(()=> {
      if(location.state.vaultAccountData!==null){
        setCurrentRaffle(location.state.vaultAccountData[location.state.currentRaffleIndex]);
        revealWinner(location.state.vaultAccountData[location.state.currentRaffleIndex].index-1);
      }
  },[location.state.vaultAccountData])

  const data = React.useMemo(
      () => [
        {
          wallet_address: location.state.winner_publicKey,
          entries: location.state.entites,
        },
      ],
      []
  )
  
  const columns = React.useMemo(
      () => [
        {
          Header: 'Wallet',
          accessor: 'wallet_address', // accessor is the "key" in the data
        },
        {
          Header: 'Entries',
          accessor: 'entries',
        },
      ],
      []
  )
  if(curretRaffle!==null){
    return (
      <>
        <p className="flex flex-col sm:flex-row justify-center items-center text-white font-bold text-2sm sm:text-3sm">
              <img src={Win} alt="win" className="hidden sm:inline"/>
              <span className="hidden sm:inline">&nbsp;</span>{curretRaffle.name}
              <div className="flex flex-row justify-center items-center">
                  <img src={Win} alt="win" className="inline sm:hidden"/>
                  <span className="text-white">&nbsp;WINNERS&nbsp;</span>
                  <img src={Win} alt="win"/>
              </div>
        </p>
        <div className="flex flex-col md:flex-row items-center justify-evenly sm:mt-10">
          <div className="flex flex-col items-center justify-center">
              <img src={curretRaffle.image} alt="NFT1" className="rounded-full w-NFTW" />
              <p className="text-white font-bold text-5sm sm:text-2sm mt-3 sm:mt-0">{curretRaffle.name}</p>
              <div className="flex flex-row justify-center mt-2 sm:mt-0">
                  <a className="text-black text-5sm sm:text-2sm my-auto rounded-full bg-white p-3" href={curretRaffle.twitter}><FaTwitter/></a>
                  <a className="text-black text-5sm sm:text-2sm my-auto rounded-full bg-white p-3 ml-5" href={curretRaffle.discord}><FaDiscord/></a>
              </div>
          </div>
          <div className="winner_list p-5 border-2 border-white rounded-3xl">
              <TableComponent columns={columns} data={data}/>
          </div>
        </div>
        <div className="py-20 flex justify-center items-center">
            <img src={Blur1} alt="blur1"/>
        </div>
      </>
  )
  }

}
export default Winners;