import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaste, FaQrcode, FaRegWindowClose } from "react-icons/fa";
import { RiShareBoxLine } from "react-icons/ri";
import QRCode from "qrcode.react";
import { nanoid } from "nanoid";
import { Button, Form, FormGroup, Tooltip, Alert, Input } from "reactstrap";

function TooltipItem(props) {
  const { text, placement, id } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Tooltip
      placement={placement}
      isOpen={tooltipOpen}
      target={id}
      toggle={toggle}
    >
      {text}
    </Tooltip>
  );
}

function Home() {
  const navigate = useNavigate();

  const [shortURL, setshortURL] = useState("");
  const [longURL, setLongURL] = useState("");
  const [shortID, setShortId] = useState("");
  const [callState, setCallState] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);  

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${nanoid(5)}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  function handlechange(e) {
    if (e.target.name === "url") {
      setLongURL(e.target.value);
    } else {
      setShortId(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validator.isURL(longURL)) {
      setError("Invalid URL");
      setVisible(true)
      return;
    }

    let checkforShortId = shortID.trim();

    if (checkforShortId.length === 0) {
      axios.post("/api/new", { url: longURL }).then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setVisible(true)
          return;
        } else {
          setCallState(true);
          setshortURL(res.data.shorten);
        }
      });
    } else if (checkforShortId.length > 2) {
      axios.post("/api/new-custom", { url: longURL, shortID: shortID }).then(
        (res) => {
          if (res.data.error) {
            setError(res.data.error);
            setVisible(true)
            return;
          } else {
            setCallState(true);
            setshortURL(res.data.shorten);
          }
        }
      );
    } else {
      setError("Short ID must be 3 characters or more!");
      setVisible(true)
      return;
    }
  }
  return (
    <div className="App">
      <div className="container text-center">
        <h1 className=" heading">Short Links, Big Results</h1>
        <p className="mt-3 para">
          These long links can't stop you , we are here to support you!
        </p>
        <div className="fcont">
          <h3 className="topic mb-3">Shorten URL</h3>
          <Form onSubmit={handleSubmit}>
            {!callState?( <FormGroup>
              <div className="row">
                <div className="col-md-8">
                  <Input
                    className="mt-2 mb-2"
                    name="url"
                    value={longURL}
                    id="longUrl"
                    placeholder="Enter the Long Link"
                    onChange={handlechange}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <Input
                    className="mt-2 mb-2"
                    type="text"
                    id="shortId"
                    value={shortID}
                    placeholder="Short Id"
                    onChange={handlechange}
                  />
                </div>
              </div>
            </FormGroup>):(
            <div className="row my-4">
              <Input
                className="mt-2 mb-2"
                name="shortURL"
                id="shortURL"
                value={shortURL}
              />
              <TooltipItem
                placement={"top"}
                text="Copy to Clipboard"
                key={0}
                id={"paste"}
              />
              <Button onClick={() => {
                      navigator.clipboard.writeText(shortURL);
                    }} className="icon-btn col-2 my-2 px-2 py-2 mx-3" id="paste">
                <FaPaste />
              </Button>

              <TooltipItem
                placement={"top"}
                text="Generate QR Code"
                key={1}
                id={"qr"}
              />
              <Button  onClick={() => {
                      downloadQRCode();
                    }} className="icon-btn col-2 my-2 px-2 py-2 mx-3" id="qr">
                <FaQrcode />
              </Button>

              <TooltipItem
                placement={"top"}
                text="Open in New Tab"
                key={2}
                id={"share"}
              />
              <Button onClick={() => {
                      window.open(shortURL, "_blank");
                    }} className="icon-btn col-2 my-2 px-2 py-2 mx-3" id="share">
                <RiShareBoxLine />
              </Button>

              <TooltipItem
                placement={"top"}
                text="Clear Text"
                key={3}
                id={"clear"}
              />
              <Button onClick={() => {
                      setLongURL("");
                      setShortId("");
                      setshortURL("");
                      setCallState(false);
                    }} className="icon-btn col-2 my-2 px-2 py-2 mx-3" id="clear">
                <FaRegWindowClose />
              </Button>
            </div>)}
              {(visible && error.length>0)&&(<Alert color="danger" isOpen={visible} toggle={onDismiss}>
        {error}
      </Alert>)}
            <div className="row">
              <Button
                type="submit"
                onClick={handleSubmit}
                outline
                disabled={callState}
                color="success"
                className="col-8 mt-2 py-3 mb-2 mx-2 col-sm-3"
              >
                Make this short
              </Button>
              <Button
                onClick={() => {
                  navigate("/click");
                }}
                className="col-8 my-2 py-3 mx-2 col-sm-3"
              >
                How many Clicks?
              </Button>
            </div>
            <QRCode
              style={{ display: "none" }}
              id="qr-gen"
              value={longURL}
              size={290}
              level={"H"}
              includeMargin={true}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Home;
