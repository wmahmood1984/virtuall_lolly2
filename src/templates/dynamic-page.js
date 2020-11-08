
import React from "react"
import { Header } from "../component/Header"
import Lolly from '../component/Lolly'

export default ( pageContext ) => {

  console.log("ppathContext",pageContext.pathContext.message)
  return (
    <div className="container">
    <Header></Header>

    
  <h1>Sender : {pageContext.pathContext.sender}</h1>has sent you a chilling wonderful Lolly with following message<br/>
  <h3>{pageContext.pathContext.message}</h3>
  <div className="listLollies">
    <Lolly fillLollyTop={`${pageContext.pathContext.topColor}`} fillLollyMiddle={`${pageContext.pathContext.medColor}`} fillLollyBottom={`${pageContext.pathContext.bottomColor}`} />
         

         
     </div>
    </div>
  )
}


