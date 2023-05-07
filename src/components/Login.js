import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import GoogleButton from 'react-google-button'
import Button from "./Button"
import { auth } from "../firebase"
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from "firebase/auth";
import { useDispatch } from "react-redux"
import { createUserProfile } from "../store/actions/createUser"
import Joi from "joi"

export default function Login(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch();

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
      }
    
    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        if(getAdditionalUserInfo(result).isNewUser){
          dispatch(createUserProfile({uid:result.user.uid,name: result.user.displayName}))
        }
        return result
    };

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
          setError("")
          setLoading(true)
          const mensajesDeError = {
            'any.required': 'El campo {#label} es obligatorio.',
            'string.empty': 'El campo {#label} es obligatorio.',
            'string.min': 'El campo {#label} debe tener al menos {#limit} caracteres.',
            'string.max': 'El campo {#label} no debe tener más de {#limit} caracteres.',
            'string.pattern.base': 'El campo {#label} debe ser un correo electronico',
            'string.email': 'Ingrese un {#label} válido.',
            'string.empty': '{#label} no debe estar vacío.'
          };
          const opcionesValidador = {
            abortEarly: false,
            messages: mensajesDeError,
          };
          const loginSchema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).required().label('Email'),
            password: Joi.string().required().label('Contraseña')
          });
          const validation =  loginSchema.validate({email:emailRef.current.value, password: passwordRef.current.value}, opcionesValidador)
          if(validation.error){
            setError(validation.error.message)
            console.log(validation.error.message)
          }else{
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/calendar")
          }
        } catch (error){
          setError("Error al ingresar")
          console.log(error)
        }
    
        setLoading(false)
      }
    
      const handleGoogleSignin = async () => {
        try {
          setError("")
          setLoading(true)
          loginWithGoogle();
          history.push("/calendar")
        } catch (error) {
          console.log(error)
          setError("Error al ingresar")
        }
        setLoading(false)
      };
    
  return (
    <>
      <Card>
        <Card.Body>
              <h2 className="text-center mb-4">Ingresar a tu cuenta</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" variant="contained" color="primary" type="submit">
                  Ingresar
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="#" style={{color: '#FB3640'}} onClick={props.onForgotClicked}>¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="w-100 text-center mt-3">
              <GoogleButton disabled={loading}  type="light" className="w-100"  onClick={handleGoogleSignin} label='Ingresar con Google'></GoogleButton>
              </div>
            </Card.Body>
          </Card>
        <div className="w-100 text-center mt-2">
        ¿No tenes una cuenta? <Link to="#" style={{color: '#FB3640'}} onClick={props.onSingUpClicked}>¡Registrate!</Link>
        </div>
    </>
  )
}
