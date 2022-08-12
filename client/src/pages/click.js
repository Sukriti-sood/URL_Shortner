import React, { useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Alert, Input } from 'reactstrap'
import {useNavigate} from "react-router-dom"


function CountClick()
{
    const [url, setURL] = useState("");
    const [click, setClick] = useState(0);
    const [callState, setcallState] = useState(false)
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const onDismiss = () => setVisible(false); 
    const navigate = useNavigate();

    function handlechange(e){
      setURL(e.target.value);
    }
    
    function handleSubmit(e){
      e.preventDefault();

      axios.post("/api/click", {url:url})
      .then((res)=>{
          if(res.data.error)
          {
            setError(res.data.error)
            setVisible(visible);
          }else{
            if(res.status===200)
            {
              setcallState(true);
              setClick(res.data.click)
            }
          }
      })
     
    }
    return(
        <div className='countClick'>
            <div className="container text-center">
       <h1 className=" heading">Short Links, Big Results</h1>
       <p className="mt-3 para">These long links can't stop you , we are here to support you!</p>
      <div className="fcont">
      <h3 className='topic mb-3'>URL Clicks</h3>
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <div className="row">
          <Input className='mt-2 mb-2' name="url" id="longUrl" placeholder="URL"
        onChange={handlechange} />
        </div>
      </FormGroup>
        {(callState)&&(<div className='row my-3'>
            <h2 className='col-md-9'>Your link has been visited</h2>
            <div className='count col-md-3'>{click} {(click>1)?"times":"time"}</div>
        </div>)}
        {(visible && error.length>0)&&(<Alert color="danger" isOpen={visible} toggle={onDismiss}>
        {error}
      </Alert>)}
      <div className="row">
        <Button type='submit' onClick={handleSubmit} outline color='success' className="col-8 mt-2 py-3 mb-2 mx-2 col-sm-3">How many Clicks?</Button>
        <Button onClick={() => {
                    navigate("/");
                  }} className="col-8 my-2 py-3 mx-2 col-sm-3">Make this short</Button>
      </div>
      </Form>
      </div>
      </div>
        </div>
    )
}

export default CountClick