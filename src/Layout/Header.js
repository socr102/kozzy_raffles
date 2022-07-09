import React, { createRef, useState } from "react";
import Logo from '../assets/logo.svg';
import { NavLink } from "react-router-dom";
import NewRaffleModal from "../Components/NewRaffleModal";

const Header = ({connectWallet,walletAddress,setName,setTwitterLink,setDiscordLink,setPrice,setWinners,setCollectionSize,setDay,setHour,setMinute,setImage,disconnect}) => {
    const menuBtn = createRef();
    const menu = createRef();
    const [showModal, setShowModal] = useState(false);
    const newRaffle = () => {
        setShowModal(true);
        menu.current.classList.toggle('hidden');
        menuBtn.current.classList.toggle('open');
    }
    const navToggle = () => {
        menuBtn.current.classList.toggle('open');
        menu.current.classList.toggle('flex');
        menu.current.classList.toggle('hidden');
        if (window.matchMedia('screen and (max-width: 560px)').matches) {
            menu.current.classList.toggle('open-transform');
        }
    }
    
    return (
        <>
            <nav className="flex flex-col sm:flex-row w-11/12 justify-between items-center px-4 py-4 sm:px-6 mx-auto shadow sm:shadow-none">
                <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
                    <img src={Logo} alt="Logo"/>
                    <div className="sm:hidden block flex flex-row items-center">
                        {
                            walletAddress !== null?
                                <button className="hover:text-white rounded-full bg-green px-6 py-2 text-0sm text-white font-medium font-poppins" >Disconnect</button>
                            :
                                <button className="hover:text-white rounded-full bg-green px-6 py-2 text-0sm text-white font-medium font-poppins" onClick={() => connectWallet()}>Connect Wallet</button>
                        }

                        <button ref={menuBtn} className="hamburger block focus:outline-none" type="button" onClick={navToggle}>
                            <span className="hamburger__top-bun"></span>
                            <span className="hamburger__middle-bun"></span>
                            <span className="hamburger__bottom-bun"></span>
                        </button>
                    </div>
                </div>
                <div ref={menu} className="w-full sm:w-auto sm:self-center sm:flex flex-col sm:flex-row items-center h-full hidden">
                    <div className="w-full sm:w-auto sm:self-center flex flex-col sm:flex-row sm:items-center h-full pr-5 nav-link">
                        <NavLink className="text-white hover:font-bold text-1sm w-full no-underline sm:w-auto sm:pr-4 py-1 sm:py-1 " to="/" activeclassname="active" onClick={navToggle}>Live</NavLink>
                        <NavLink className="text-white hover:font-bold text-1sm w-full no-underline sm:w-auto sm:pr-4 py-1 sm:py-1 " to="/closed" activeclassname="active" onClick={navToggle}>Closed</NavLink>
                        {
                            walletAddress===process.env.REACT_APP_ADMIN_WALLET
                            ?
                            <NavLink className="text-white hover:font-bold text-1sm w-full no-underline sm:w-auto sm:pr-4 py-1 sm:py-1 " to="/admin" activeclassname="active" onClick={navToggle}>Admin</NavLink>
                            :
                            <></>
                        }
                        {
                            walletAddress===process.env.REACT_APP_ADMIN_WALLET
                            ?
                            <button className="hover:text-white rounded-full bg-green px-6 py-2 text-0sm text-white font-medium font-Poppins border-4 border-green hover:bg-black mb-2 sm:mb-0 w-52" onClick={newRaffle} >Add New Raffle</button>
                            :
                            <></>
                        }
                    </div>
                    {
                        walletAddress !== null
                        ?
                            <button className="hover:text-white rounded-full bg-green px-6 py-2 text-0sm text-white font-medium font-poppins hidden sm:flex border-4 border-green hover:bg-black" onClick={()=> disconnect()} >Disconnect</button>
                        :
                            <button className="hover:text-white rounded-full bg-green px-6 py-2 text-0sm text-white font-medium font-poppins hidden sm:flex border-4 border-green hover:bg-black" onClick={() => connectWallet()}>Connect Wallet</button>
                    }
                </div>
            </nav>
            {
                showModal &&
                <NewRaffleModal 
                    showModal = {showModal} 
                    setShowModal = {setShowModal} 
                    setName={setName}
                    setTwitterLink={setTwitterLink}
                    setDiscordLink={setDiscordLink}
                    setPrice={setPrice}
                    setWinners={setWinners}
                    setCollectionSize={setCollectionSize}
                    setDay={setDay}
                    setHour={setHour}
                    setMinute={setMinute}
                    setImage={setImage}
                />
            }
            
        </>
    )
}

export default Header;