import React, {useState, useEffect  } from "react"
import { Modal} from "react-bootstrap"
import ProductHero from "../views/ProductHero"
import Login from "./Login"
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideModal } from '../store/actions/modal';


export default function Home() {
  const [showLogin, setShowLogin] = useState(true)
  const [showSingUp, setShowSingUp] = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  const show = useSelector(state => state.modal.show);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(hideModal())
    setShowLogin(true);
    setShowSingUp(false);
    setShowForgot(false);
  }

  const handleLoginClicked = () => {
    setShowLogin(true);
    setShowSingUp(false);
    setShowForgot(false);
  }

  const handleForgotClicked = () => {
    setShowLogin(false);
    setShowSingUp(false);
    setShowForgot(true);
  }

  const handleSingUpClicked = () => {
    setShowLogin(false);
    setShowSingUp(true);
    setShowForgot(false);
  }

  useEffect(() => {
    //Runs only on the first render
    dispatch(hideModal())
  }, []);


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
      <ProductHero />
      <Modal show={show} centered onHide={handleModalClose}>
        <Modal.Body>
          {form}
        </Modal.Body>
      </Modal>
    </>
  )
}
