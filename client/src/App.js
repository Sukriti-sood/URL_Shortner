import React, { useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
function App() {
  const [link,setlink]=useState("");
  const [url,seturl]=useState("");

  function handlechange(e){
    seturl(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
    axios.post("/api/shorten",{
      url:url
    })
    .then((res)=>{
      console.log(res.status)
      console.log(res.data.shorten);
      setlink(res.data.shorten);
    })
  }
  return (
    <div className="App">
      <div className="container text-center">
       <h1 className=" heading">Short Links,Big Results</h1>
       <p className="mt-3 para">These long links can't stop you , we are here to support you!</p>
      <div className="fcont">
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label ></Label>
        <Input  name="url" id="exampleEmail" placeholder="Enter the Long Link"
        onChange={handlechange} />
      </FormGroup>
      <Button className="btnf">Submit</Button>
      </Form>
      </div>
      <div className="mt'-5">
        <h3 className="res">Result</h3>
        <div className="result"><a href={link}><p></p>{link}</a></div>
      </div>
      </div>
    </div>
  );
}

export default App; 
