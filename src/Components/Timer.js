import { decodeUpgradeableLoaderState } from "@project-serum/anchor/dist/cjs/utils/registry";
import React from "react";
import Countdown from 'react-countdown';

const Timer = ({countTime}) => {
    const renderer = ({ days, hours, minutes,seconds, completed }) => {
        if (completed) {
          return '';
        } else {
          return (
            <>
                <div className="flex flex-row items-center z-10 mb-countB sm:mb-0">
                    <div className="flex flex-col items-center">
                        <div className="text-0sm font-bold mb-countB mt-countT">
                            DAYS
                        </div>
                        <div className="text-2sm sm:text-4sm font-bold">
                        {days}
                        </div>
                    </div>
                    <div className="text-2sm sm:text-4sm font-bold mt-4">&nbsp;:&nbsp;</div>
                    <div className="flex flex-col items-center">
                        <div className="text-0sm font-bold mb-countB mt-countT">
                            HOURS
                        </div>
                        <div className="text-2sm sm:text-4sm font-bold">
                            {hours}
                        </div>
                    </div>
                    <div className="text-4sm font-bold mt-4">&nbsp;:&nbsp;</div>
                    <div className="flex flex-col items-center">
                        <div className="text-0sm font-bold mb-countB mt-countT">
                            MINS
                        </div>
                        <div className="text-2sm sm:text-4sm font-bold">
                        {minutes}
                        </div>
                    </div>

                    <div className="text-4sm font-bold mt-4 hidden sm:flex">&nbsp;:&nbsp;</div>
                    <div className="flex flex-col items-center hidden sm:flex">
                        <div className="text-0sm font-bold mb-countB mt-countT">
                            SECONDS
                        </div>
                        <div className="text-2sm sm:text-4sm font-bold">
                        {seconds}
                        </div>
                    </div>
                </div>
            </>
          )

        }
      };
      return(
        <>        
        <Countdown 
            date={countTime * 1000}
            renderer={renderer}
        />
    </>

      )
}

export default Timer;