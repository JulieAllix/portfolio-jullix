import React, {useEffect, useRef, useState} from 'react'
import {API_URL, PROJECT_UID} from "@Utils/constants";
import {Status} from "@Models/types/bases/enums";
import {Message} from "primereact/message";

export const StatusWeb = (props) =>{

    const [status,setStatus]  =  useState<Status>(Status.UP)
    const [message,setMessage]  =  useState<string>('')

    const messageRef = useRef(null);

    useEffect(()=>{
       const intervalId  = setInterval(request,10 * 60 * 1000)
        return ()=>clearInterval(intervalId)
    },[])

    const request = () =>{
        fetch(API_URL,{method:'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify({projectUid:PROJECT_UID})}).then((res)=>{
            res.json().then((response)=>{
                if(response?.result){
                    setStatus(response.result)
                    setMessage(response.message)
                }
            }).catch((error)=>console.error('Not JSON',error))
        }).catch((error)=>{
            console.error(error)
        })
    }


    const getAlertPage = () =>{
        switch (status) {
            case Status.DOWN:
                return (<div style={{width: "100%", height:"100%"}}>
                        ERREUR:
                        {message}
                    </div>
                )
            case Status.MAINTENANCE:
                messageRef.current.show({ severity: 'warn', summary: "Attention ", detail: message });
                return (<div>
                    <Message style={{position:"fixed",width:'100%'}} ref={messageRef} />
                    {props.children}
                </div>)
            case Status.UP:
                return (<>{props.children}</>);
        }
    }

    return (
        <>
            {getAlertPage()}
        </>
    )
}


