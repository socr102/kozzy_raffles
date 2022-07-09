import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper";
import LiveCircle from '../../assets/live.svg';
import ClosedCircle from '../../assets/closed.svg';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./myswiper.css";
import SlideNextButton from "./SlideNextButton";
import SlidePrevButton from "./SlidePrevButton";

const SwiperComponent = ({vaultAccountData,currentRaffleIndex,setCurrentRaffleIndex,activeTab}) => {
    const [NFTList, setNFTList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const onTouchEnd = (e) => {
        setCurrentRaffleIndex(e.realIndex);
    }
    useEffect(()=> {
        if(vaultAccountData!==null){
            var nftlist = [];
            vaultAccountData.map((item, index) => {
                if(activeTab === "live"){
                    if(Number(item.endTimestamp)>Date.now()/1000){
                        nftlist.push(item.image)
                    }
                } else {
                    if(Number(item.endTimestamp)<Date.now()/1000){
                        nftlist.push(item.image)
                    }
                }
                if(index === currentIndex){
                    setCurrentRaffleIndex(index);
                }
            })
            setNFTList(nftlist);
        }
    },[currentIndex, vaultAccountData]);

    return (
        <div className="w-full lg:w-11/12 mx-auto">
            <Swiper
                effect={"coverflow"}
                grabCursor={false}
                loop={false}
                onTouchEnd={onTouchEnd}
                centeredSlides={true}
                onSlideChange={(swiperCore) => {
                    const {
                      activeIndex,
                      snapIndex,
                      previousIndex,
                      realIndex,
                    } = swiperCore;
                    setCurrentIndex(activeIndex);
                }}
                breakpoints = {{
                    320: {
                        width: 320,
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    640: {
                        width: 640,
                        slidesPerView: 2,
                        spaceBetween: 150
                    },
                    850: {
                        slidesPerView: 3,
                        spaceBetween: 200
                    },
                    1050: {
                        slidesPerView: 4,
                        spaceBetween: 200
                    }
                  }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow]}
                className="mySwiper"
            >
                {
                    NFTList.map((item, index) => {
                       return <SwiperSlide key={index}>
                            {({ isActive, isPrev, isNext }) => 
                                    isActive 
                                    ?
                                    <div className="flex flex-row items-center">
                                        <SlidePrevButton />
                                        <img src={item} alt="NFT" className="w-imgSW sm:w-imgW"/>
                                        <img src={activeTab==="live" ? LiveCircle : ClosedCircle} alt="live" className="absolute left-imgSPad sm:left-imgPad" />
                                        <SlideNextButton/>
                                    </div>
                                    :
                                    isPrev || isNext
                                    ?
                                    <img src={item} alt="NFT" className="scale-90 w-imgSW sm:w-imgW"/>
                                    :
                                    <img src={item} alt="NFT" className="scale-75 w-imgSW sm:w-imgW"/>
                            }
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}

export default SwiperComponent;