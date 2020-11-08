import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState,useRef } from 'react'
import { Header } from '../component/Header'
import Lolly from '../component/Lolly';
import { navigate } from "gatsby"

const GETDATA = gql`{
    lolly{
    recepientName
   message
   senderName
   flavourTop
   flavourMiddle
   flavourBottom
   lollyPath
    }
}`

const createLollyMutation = gql `
    mutation createLolly($recepientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!)
    {createLolly (recepientName: $recepientName ,message: $message ,senderName: $senderName ,flavourTop: $flavourTop,flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom){
        message
        lollyPath
    }}
`

const Createnew = () => {
    const [color1,setColor1] = useState("#d54358");
    const [color2,setColor2] = useState("#d56356");
    const [color3,setColor3] = useState("#d58352");
    const recepientName= useRef()
    const messageRef= useRef()
    const senderRef= useRef()

const {data} = useQuery(GETDATA)
console.log('query result from server', data)
const [createLolly] = useMutation(createLollyMutation)
    const submitLollyForm = async () =>{
        console.log("clicked");
        console.log("color1", color1)
        console.log("sender", senderRef.current.value)
        const result = await createLolly({
            variables: {
                recepientName: recepientName.current.value ,
                message: messageRef.current.value ,
                senderName: senderRef.current.value ,
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3
            }
        })
        console.log('result from server', result)

        try {
            const netlifyPostResponse = await fetch("https://api.netlify.com/build_hooks/5fa77589e9ded37e53574538",
            {method: "post"});
            const netlifyPostData = await netlifyPostResponse.json();
            console.log("DAta = ",netlifyPostData);
        } catch (netError) {
            console.log(netError)

        navigate('/waitingarea');
    }
    
    
    }

    return (
        <div className="container">
          <Header />
               <div className="lollyFormDiv">
               <div>
            
               <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />  
               </div>
               <div className="lollyFlavourDiv">
                   <label htmlFor="flavourTop" className="colorPickerLabel">
                   <input type="color" value={color1} className="colorPicker" name="flavorTop" id="flavourTop" 
                   onChange={(e)=>{
                       setColor1(e.target.value)
                   }}
                   />    
                   </label>
                   <label htmlFor="flavourTop" className="colorPickerLabel">
                   <input type="color" value={color2} className="colorPicker" name="flavorMiddle" id="flavourMiddle" 
                   onChange={(e)=>{
                    setColor2(e.target.value)
                }}/>
                   </label>
                   <label htmlFor="flavourTop" className="colorPickerLabel">
                   <input type="color" value={color3} className="colorPicker" name="flavorBottom" id="flavourBottom" 
                   onChange={(e)=>{
                    setColor3(e.target.value)
                }}

                   /> 
                   </label>               
               </div>
               <div>
                   <div className="LollyFrom">
                        <label htmlFor="recipentName">To</label>
                        <input type="text" name="recipentName" id="recipentName" ref={recepientName}></input>
                        <label htmlFor="recipentName">Message</label>
                        <textarea rows="15" column="30" ref={messageRef}></textarea>
                        
                        <label htmlFor="recipentName">From</label>
                        <input type="text" name="recipentName" id="recipentName" ref={senderRef}></input>
                   </div>
                   <input type="button" value="Create" onClick={submitLollyForm}/>
               </div>
               </div>
               
           
        </div>
    )
}

export default Createnew;
