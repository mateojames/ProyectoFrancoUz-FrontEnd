import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import Button from "./Button"
import { Link, useHistory } from "react-router-dom"
import { auth } from "../firebase"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "firebase/auth";
import { useDispatch } from "react-redux"
import { createUserProfile } from "../store/actions/createUser"

export default function Signup(props) {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  async function signup(name, email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(createUserProfile({uid: result.user.uid, name: name}))
    await sendEmailVerification(auth.currentUser);
    
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;
    const passwordLength =      passwordRef.current.value.length;
    const uppercasePassword =   uppercaseRegExp.test(passwordRef.current.value);
    const lowercasePassword =   lowercaseRegExp.test(passwordRef.current.value);
    const digitsPassword =      digitsRegExp.test(passwordRef.current.value);
    const specialCharPassword = specialCharRegExp.test(passwordRef.current.value);
    const minLengthPassword =   minLengthRegExp.test(passwordRef.current.value);
    let errMsg ="";
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            errMsg="Las contraseñas no coinciden";
    }else if(passwordLength===0){
            errMsg="La contraseña esta vacía";
    }else if(!uppercasePassword){
            errMsg="La contraseña debe poseer una letra mayúscula";
    }else if(!lowercasePassword){
            errMsg="La contraseña debe poseer una letra mínimo";
    }else if(!digitsPassword){
            errMsg="La contraseña debe poseer un dígito";
    }else if(!specialCharPassword){
            errMsg="La contraseña debe poseer al menos un caracter especial";
    }else if(!minLengthPassword){
            errMsg="La contraseña debe poseer al menos 8 caracteres";
    }else{
        errMsg="";
    };
    if(errMsg != ""){return setError(errMsg)};
    
    

    try {
      setError("")
      setLoading(true)
      await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
      await signOut(auth)
      history.push("/")
    } catch (e) {
      //if(e.message.includes("Firebase: Error (auth/email-already-in-use).")){setError("El email ya es utilizado por otra cuenta")}
      setError("Error al crear la cuenta");
      
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Registrarme</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
              <Form.Label>Nombre y apellido</Form.Label>
              <Form.Control type="name" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        ¿Ya tenes una cuenta? <Link to="#" style={{color: '#FB3640'}} onClick={props.onLoginClicked}>Ingresá</Link>
      </div>
    </>
  )
}
