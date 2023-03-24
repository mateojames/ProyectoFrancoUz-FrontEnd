import React, {useState, useEffect  } from "react"
import ProductHero from "../views/ProductHero"
import Login from "./Login"
import Signup from "./Signup"
import ForgotPassword from "./ForgotPassword"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideModal } from '../store/actions/modal';
import Snackbar from '@mui/material/Snackbar';
import FullBModal from "./BoostrapModal"
import { useLocation } from "react-router-dom"
import { Alert } from "@mui/material"


export default function Home() {
  const [showLogin, setShowLogin] = useState(true)
  const [showSingUp, setShowSingUp] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false);
  const locationData = useLocation();

  const show = useSelector(state => state.modal.show);
  const dispatch = useDispatch();
  const title = 'Por una mirada feliz'
  const description = 'Nuestro propósito es brindar un espacio en el que la persona con diagnóstico de TGD-TEA se encuentre contenido a la vez que lleve a cabo su tratamiento.'
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

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  useEffect(() => {
    //Runs only on the first render
    dispatch(hideModal())
  }, []);

  useEffect(() => {
    if(locationData.state){
      if(locationData.state.success){
        setOpenSuccess(true);
      }
    }
  }, [locationData]);

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
      <ProductHero title={title} description={description} showConozcanos={true} />
      <Snackbar open={openSuccess} autoHideDuration={20000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' , fontSize: 20}}>
          ¡Su cuenta fue creada con éxito!
        </Alert>
      </Snackbar>
      <FullBModal form={form} handleModalClose={handleModalClose}/>
    </>
  )
}
