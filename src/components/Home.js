import React, {useState } from "react"
import { Modal} from "react-bootstrap"
import ResponsiveAppBar from "./ResponsiveAppBar"
import ProductHero from "../views/ProductHero"
import Login from "./Login"
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword"


export default function Home() {
  const [show, setShow] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSingUp, setShowSingUp] = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  const handleModalClose = () => {
    setShow(false);
    setShowLogin(false);
    setShowSingUp(false);
    setShowForgot(false);
  }

  const handleLoginClicked = () => {
    setShow(true);
    setShowLogin(true);
    setShowSingUp(false);
    setShowForgot(false);
  }

  const handleForgotClicked = () => {
    setShow(true);
    setShowLogin(false);
    setShowSingUp(false);
    setShowForgot(true);
  }

  const handleSingUpClicked = () => {
    setShow(true);
    setShowLogin(false);
    setShowSingUp(true);
    setShowForgot(false);
  }


  var form = <></>;

  if(showLogin){
    form = <Login onForgotClicked={handleForgotClicked} onSingUpClicked={handleSingUpClicked}/>;
  }
  if(showSingUp){
    form = <Signup onLoginClicked={handleLoginClicked}/>;
  }
  if(showForgot){
    form = <ForgotPassword onLoginClicked={handleLoginClicked} onSingUpClicked={handleSingUpClicked}/>;
  }

  return (
    <>     
      <ResponsiveAppBar onLoginClicked={handleLoginClicked}/>
      <ProductHero />
      <Modal show={show} centered onHide={handleModalClose}>
        <Modal.Body>
          {form}
        </Modal.Body>
      </Modal>
    </>
  )
}
