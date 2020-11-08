import { navigate } from "gatsby"
import React from "react"
import { Header } from "../component/Header"
import Lolly from '../component/Lolly'

export default function Home() {
  return (
  <div className="container">
    <Header></Header>

    <p>your new lolly is freezing. you can get it in a while at 
        <a>
    URL : {`https://quizzical-williams-4f9b3c.netlify.app/56E7ol5AL`}
    </a>
    </p>

    <div className="listLollies">
    
      <Lolly fillLollyTop="#d52358" fillLollyMiddle="#e95946" fillLollyBottom="#deaa43" />
         

         
           


    </div>
    
    </div>)
}