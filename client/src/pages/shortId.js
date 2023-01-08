import React, { useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"

function ShortId(){
    const {shortId}= useParams();
    useEffect(()=>{
        axios.get(`/api/${shortId}`).then((res) => {
            if (!res.data.error) {
                window.location.href= res.data.url
            }
          });
    },[])
    return (<></>)
}

export default ShortId;