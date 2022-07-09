import React, { useEffect, useCallback, useRef, useState } from "react";
import { FaDiscord,FaTwitter } from "react-icons/fa"
import axios from 'axios';

const NewRaffleModal = ({showModal, setShowModal,setName,setTwitterLink,setDiscordLink,setPrice,setWinners,setCollectionSize,setDay,setHour,setMinute,setImage}) => {
    const [fileImg, setFileImg] = useState(null);

    
    const modalRef = useRef();
    const CloseToIcon = () => {
        setShowModal(false);
    }
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };
    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [showModal]
    );
    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );
    const upload = async(e) => {
        e.preventDefault();
        if (fileImg) {
            try {
                const formData = new FormData();
                formData.append("file", fileImg);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                        'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                        "Content-Type": "multipart/form-data"
                    },
                });

                const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
                setImage(ImgHash)
            } catch (error) {
                console.log("Error sending File to IPFS: ")
                console.log(error)
            }
        }
        
        setShowModal(false);
    }

    return(
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeModal} ref={modalRef}>
                <form onSubmit={upload}>
                <div className="relative top-20 mx-auto border w-11/12 sm:w-ModalW shadow-lg rounded-lg bg-black text-white px-5 sm:px-16 py-10">
                    <div
                        className="close"
                        onClick={CloseToIcon}
                    >
                        <div className="line1"></div>
                        <div className="line2"></div>
                    </div>
                    <p className="text-2sm font-bold text-center">UPLOAD NEW RAFFLE</p>
                    <p className="text-1sm text-center">Add the details below</p>
                    <input  onChange={e => setName(e.target.value)} placeholder="Project Name" className="bg-black border-white h-16 rounded-md w-full border-2 flex text-1sm mt-5 px-2" required/>
                    <div className="flex items-center justify-center w-full mt-4">
                        <label
                            className="flex flex-col w-full h-20 border-4 border-blue-200 border-dashed rounded-md">
                            <div className="flex flex-col items-center justify-center pt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600 "
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Attach a file</p>
                            </div>
                            <input type="file" onChange={(e) =>setFileImg(e.target.files[0])} className="opacity-0" required/>
                        </label>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                        <div className="flex flex-row justify-center items-center border-2 bg-black text-white px-2 py-2 text-1sm w-full sm:w-inputW rounded-md h-16">
                            <div className="text-black rounded-full p-2 bg-white"><FaTwitter/></div>
                            <input  onChange={e => setTwitterLink(e.target.value)} className="bg-black w-full outline-0 border-0 ml-2" required/>
                        </div>
                        <div className="flex flex-row justify-center items-center border-2 bg-black text-white px-2 py-2 text-1sm w-full sm:w-inputW rounded-md h-16 mt-5 sm:mt-0">
                            <div className="text-black rounded-full p-2 bg-white"><FaDiscord/></div>
                            <input  onChange={e => setDiscordLink(e.target.value)} className="bg-black w-full outline-0 border-0 ml-2" required/>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                        <div className="flex flex-row justify-center items-center border-2 bg-black text-white px-2 py-2 text-1sm w-full sm:w-inputW rounded-md h-16">
                            <input  onChange={e => setPrice(e.target.value)} className="bg-black w-full outline-0 border-0 ml-1" placeholder="PRICE" required/>
                            $KOZY
                        </div>
                        <input onChange={e => setWinners(e.target.value)} placeholder="NO. of Winners" className="flex flex-row justify-center items-center border-2 bg-black text-white px-2 py-2 text-1sm w-full sm:w-inputW rounded-md h-16 mt-5 sm:mt-0" required/>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                        <div className="flex flex-row justify-between items-center text-white text-1sm w-full sm:w-inputW">
                            <input onChange={e => setDay(e.target.value)} className="bg-black pl-1 h-16 border-2 w-timeW sm:w-imgSPad rounded-md" placeholder="DAYS" required/>
                            :
                            <input  onChange={e => setHour(e.target.value)} className="bg-black pl-1 h-16 border-2 w-timeW sm:w-imgSPad rounded-md" placeholder="Hrs" required/>
                            :
                            <input  onChange={e => setMinute(e.target.value)} className="bg-black pl-1 h-16 border-2 w-timeW sm:w-imgSPad rounded-md" placeholder="Mins" required/>
                        </div>
                        <input  onChange={e => setCollectionSize(e.target.value)} placeholder="Collection Size" className="flex flex-row justify-center items-center border-2 bg-black text-white px-2 py-2 text-1sm w-full sm:w-inputW rounded-md h-16 mt-5 sm:mt-0" required/>
                    </div>
                    <div className="text-center">
                        <button className="mt-10 hover:text-white rounded-full bg-green px-12 py-2 text-0sm text-white font-medium font-Poppins border-4 border-green hover:bg-black" type="submit" >Create new Raffle</button>
                    </div>
                </div>
                </form>
            </div>
        </>
    )
}
export default NewRaffleModal;