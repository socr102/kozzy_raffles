import React, { useEffect,useState } from "react";
import TableComponent, { TwitterFill,DiscrodFill, ImgFill, EditFill, ViewFill } from "../Components/Table";
import './admin.css'
const Admin = ({vaultAccountData}) => {
  const [raffleData, setCurrentRaffles] = useState(null);

  useEffect(() => {
    if(vaultAccountData!=null){
      let temp_data = [];
      vaultAccountData.raffles.map((item) => {
        if(Number(item.endTimestamp) > Date.now()/1000){

          let time = Number(item.endTimestamp) -  Date.now()/1000;
          const day = (time-time%(3600 * 24))/(3600 * 24);
          time = time - day * 3600 * 24;
          const hour = (time -time%3600)/3600;
          time = time - hour * 3600;
          const minute = (time -time%60)/60;
          const timeString = day.toString() + "D: " + hour.toString() + "H: " + minute.toString() + "M";

          let single_raffle = {
            image: item.image,
            name: item.name,
            twitter: item.twitter,
            discord: item.discord,
            price_per_ticket: String(Number(item.ticketPrice)/100)+"$KOZY",
            collection_size: Number(item.collection),
            winners: 0,
            time: timeString
          }
          temp_data.push(single_raffle)
        }
      })
      setCurrentRaffles(temp_data)
    }
  },[vaultAccountData])

  
  const data = React.useMemo(
    () => {
      if(raffleData!=null){
        return raffleData
      }
    },
    [raffleData]
  )
  const columns = React.useMemo(
    () => [
      {
        Header: 'IMG',
        accessor: 'image',
        Cell:ImgFill,
      },
      {
        Header: 'NAME',
        accessor: 'name',
      },
      {
        Header: 'TWITTER',
        accessor: 'twitter',
        Cell: TwitterFill,
      },
      {
        Header: 'DISCORD',
        accessor: 'discord',
        Cell: DiscrodFill,
      },
      {
        Header: 'PRICE PER TICKET',
        accessor: 'price_per_ticket',
      },
      {
        Header: 'COLLECTION SIZE',
        accessor: 'collection_size',
      },
      {
        Header: 'NO. OF WINNERS',
        accessor: 'winners',
      },
      {
        Header: 'TIME',
        accessor: 'time',
      },
    ],
    []
  )
  if(raffleData!=null){
    return (
      <>
          <p className="text-white text-5sm sm:text-2sm font-bold text-center my-5">KOZY KOALA CURRENT RAFFLES</p>
          <div className="admin w-11/12 mx-auto p-5 border-2 border-white rounded-3xl">
              <TableComponent columns={columns} data={data}/>
          </div>
      </>
    )
  }

  
}
export default Admin;