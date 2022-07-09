import React from "react";
import Blur from '../assets/Blur.svg';
import Win from '../assets/win.svg';
import Timer from "./Timer";
import { useNavigate } from 'react-router-dom';

const Footer = ({ vaultAccountData,entrantAccountData,currentRaffleIndex,countTime,walletAddress,activeTab}) => {
    const navigate = useNavigate()
    const nextPageHandler = () => {
        if(activeTab === "live") {
            const raffleIndex = vaultAccountData[currentRaffleIndex].index;
            let raffleEntrants = [];
            entrantAccountData.entrants.map((item)=> {
                if(item.index===raffleIndex){
                    raffleEntrants.push(item.publicKey.toBase58())
                }
            });
            navigate('/purchase',{
                state: {
                    vaultAccountData:vaultAccountData,
                    currentRaffleIndex: currentRaffleIndex,
                    raffleEntrants:raffleEntrants,
                    ticketPrice: Number(vaultAccountData[currentRaffleIndex].ticketPrice),
                    ticketIndex: Number(vaultAccountData[currentRaffleIndex].ticketIndex),
                    endTimestamp: Number(vaultAccountData[currentRaffleIndex].endTimestamp),
                    walletAddress: walletAddress,
                }
            });
        }
        else if(activeTab === "closed") {
            let winner_publicKey = vaultAccountData[currentRaffleIndex].winner.publicKey.toBase58();
            let entites = 0;

            entrantAccountData.entrants.map((item)=> {
                if(item.publicKey.toBase58()===winner_publicKey && item.index === vaultAccountData[currentRaffleIndex].index){
                    console.log(item.publicKey.toBase58())
                    entites+=1;
                }
            });

            if(vaultAccountData[currentRaffleIndex].winner.ticket===0){
                winner_publicKey = 'None';
                entites = '';
            }
            navigate('/winners',{
                state:{
                    vaultAccountData: vaultAccountData,
                    currentRaffleIndex: currentRaffleIndex,
                    winner_publicKey: winner_publicKey,
                    entites: entites,
                }
            });
        }
    }

    return(
        <>
        <div className="footer flex flex-col sm:flex-row items-center mt-10 bg-white rounded-full w-fit px-16 sm:px-10 py-1 sm:py-2 mb-10 lg:mb-0">
            {
                activeTab === "live"
                ?
                <>
                    <Timer countTime={countTime}/>
                </>
                :
                <div className="flex flex-row text-2sm sm:text-4sm z-10 font-bold text-red">
                    CLOSED
                </div>
            }
            {
                activeTab === "closed"
                ?
                <div className="flex flex-row items-center z-10">
                    <img src={Win} alt="win" className="ml-0 sm:ml-6 w-12"/>
                    <div className="flex flex-col items-center justify-center ml-3 sm:ml-3 z-10">
                        <p className="text-black text-tiny sm:text-0sm ">WINNERS LIST</p>
                        <button className="bg-green rounded-full px-8 py-1 text-white font-bold text-tiny sm:text-0sm hover:bg-transparent border-green hover:text-green border-4" onClick={nextPageHandler}>CLICK HERE</button>
                    </div>
                </div>
                :
                <div className="flex flex-col items-center justify-center ml-0 sm:ml-10 z-10">
                    <p className="text-black text-tiny sm:text-0sm ">ENTER RAFFLE</p>
                    <button className="bg-green rounded-full px-8 py-1 text-white font-bold text-tiny sm:text-0sm hover:bg-transparent border-green hover:text-green border-4" onClick={nextPageHandler}>CLICK HERE</button>
                </div>
            }
            
            
        </div>
        <img src={Blur} className="absolute bottom-0 hidden lg:inline"/>
        </>
    )
}

export default Footer;