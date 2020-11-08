import { useQuery } from '@apollo/react-hooks';
import React from 'react'
import gql from 'graphql-tag';
import { Header } from "../component/Header"
import Lolly from '../component/Lolly'


const GET_GREETING = gql`
  {lolly {
    recepientName
   message
   senderName
   lollyPath
    }}
`;

export default function Hello() {
    const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8888/"
      //: "http://localhost:8888"
      : "https://quizzical-williams-4f9b3c.netlify.app/";

    const { loading, error, data } = useQuery(GET_GREETING);
    console.log(data)
    if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data.lolly)


  return (
    <div className="container">
      <Header></Header>
  
      <p>your new lolly is freezing. you can get it in a while at

          
      URL : <a href={`${url}${data.lolly[data.lolly.length-1].lollyPath}`}
      >{`${url}${data.lolly[data.lolly.length-1].lollyPath}`}</a>
      
      </p>
  

    <div>
    
    </div>
      <div className="listLollies">
      
        <Lolly fillLollyTop="#d52358" fillLollyMiddle="#e95946" fillLollyBottom="#deaa43" />
           
  
           
             
  
  
      </div>
      
      </div>)
}