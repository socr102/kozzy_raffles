import React, { useEffect, useState } from "react";
import Blur1 from '../assets/Blur1.svg';
import Timer from "../Components/Timer";
import { FaDiscord,FaTwitter } from "react-icons/fa"
import { useLocation } from "react-router-dom";

const Purchase = ({buyTicket}) => {
    const [amount, setAmount] = useState(0);
    const [walletCount,setWalletCount] = useState(0);
    const [myTicketCount, setMyTicketCount] = useState(0);
    const [curretRaffle, setCurrentRaffle] = useState(null);
    const location = useLocation();

    
    useEffect(()=> {
        {
            setCurrentRaffle(location.state.vaultAccountData[location.state.currentRaffleIndex]);
            let newWallet = [];
            let ticketCount = 0;
            location.state.raffleEntrants.map((address) => {
                if(address===location.state.walletAddress){
                    ticketCount+=1;
                }
                if(newWallet.length===0){
                    newWallet.push(address);
                } else {
                    let flag = false;
                    newWallet.map((item) => {
                        if(item===address){
                            flag = true;
                        }
                    })
                    if (flag===false){
                        newWallet.push(address)
                    }
                }
            })
            setWalletCount(newWallet.length);
            setMyTicketCount(ticketCount);
        }
    },[location.state.vaultAccountData, location.state.currentRaffleIndex])


    const increaseAmount = () => {
        setAmount(amount+1)
    }
    const decreaseAmount = () => {
        var newAmount = amount -1
        if(newAmount >= 0) {
            setAmount(amount-1)
        }
    }

    const purchaseTicket = async() => {
        if(amount!=0 && curretRaffle!=null){
            buyTicket(curretRaffle.index, amount);
        }
    }
    if(curretRaffle !==null){
        return(
            <>
                <div className="flex flex-col md:flex-row items-center justify-evenly sm:mt-10">
                    <div className="flex flex-col items-center justify-center">
                        <img src={curretRaffle.image} alt="NFT1" className="rounded-full w-NFTW" />
                        <p className="text-white font-bold text-1sm sm:text-1sm mt-3 sm:mt-10">TIME REMAINING</p>
                        <div className="text-white"><Timer countTime={location.state.endTimestamp}/></div>
                    </div>
                    <div className="flex flex-col p-5 border-2 border-white rounded-3xl mt-5 sm:mt-0">
                        <div className="flex flex-row justify-center items-center text-1sm sm:text-5sm font-bold text-white">
                            {curretRaffle.name}
                            <a className="text-black my-auto rounded-full bg-white text-0sm sm:text-1sm p-2 ml-4" href={curretRaffle.twitter}><FaTwitter/></a>
                            <a className="text-black my-auto rounded-full bg-white text-0sm sm:text-1sm p-2 ml-4" href={curretRaffle.discord}><FaDiscord/></a>
                        </div>
                        <hr className="mt-2"/>
                        <div className="text-white font-bold text-1sm mt-5">NO. OF TICKETS SOLD :&nbsp; <span className="text-green">{location.state.ticketIndex}/{curretRaffle.collection}</span></div>
                        <div className="text-white font-bold text-1sm">NO. OF WINNERS :&nbsp; <span className="text-green">0</span></div>
                        <p className="text-white text-0sm mt-5">Total $KOZY spent : {location.state.ticketIndex * location.state.ticketPrice / 1000000000} $KOZY</p>
                        <p className="text-white text-0sm">No. of uniqe wallets : {walletCount}</p>
                        <p className="text-white text-0sm">Collection Size : {curretRaffle.collection}</p>
                        <p className="text-white font-bold text-1sm mt-5">NO. OF TICKETS owned : {myTicketCount}</p>
                        <p className="text-white font-bold text-1sm">PRICE PER TICKET : {location.state.ticketPrice / 1000000000} $KOZY</p>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                            <div className="flex flex-row justify-center items-center mt-3">
                                <button className="rounded-full text-white border-2 border-red px-5 py-3" onClick={decreaseAmount}>-</button>
                                <input value={amount} className="mx-2 text-5sm py-1 rounded-md w-20 pl-5 font-bold" readOnly/>
                                <button className="rounded-full text-white border-2 border-green px-5 py-3" onClick={increaseAmount}>+</button>
                            </div>
                            <button className="bg-bitblue rounded-full px-8 py-2 text-white mt-3 text-tiny sm:text-0sm sm:ml-5 border-4 border-bitblue hover:bg-black" onClick={() => purchaseTicket()}>Purchase Raffle</button>
                        </div>
                    </div>
                </div>
                <div className="py-20 flex justify-center items-center">
                    <img src={Blur1} alt="blur1"/>
                </div>
            </>
        )
    }

}
export default Purchase;