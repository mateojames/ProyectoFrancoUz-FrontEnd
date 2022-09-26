import React, {useState } from "react"
import { Modal} from "react-bootstrap"
import ResponsiveAppBar from "./ResponsiveAppBar"
import ProductHero from "../views/ProductHero"
import Login from "./Login"
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword"


export default function Home() {
  const [show, setShow] = useState(false)
  const [showSingUp, setShowSingUp] = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  const form = <Login/>;

  if(showSingUp){
    form = <Signup/>;
  }
  if(showForgot){
    form = <ForgotPassword/>;
  }

  return (
    <>     
      <ResponsiveAppBar onLoginClicked={()=> setShow(true)}/>
      <ProductHero />
      <Modal show={show} centered onHide={()=>setShow(false)}>
        <Modal.Body>
          {form}
        </Modal.Body>
      </Modal>
    </>
  )
}
