import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import Button from "./Button"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import {
  sendPasswordResetEmail
} from "firebase/auth";
import Joi from "joi"


export default function ForgotPassword(props) {
  const emailRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
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
      });
      const validation =  loginSchema.validate({email:emailRef.current.value}, opcionesValidador)
      if(validation.error){
        setError(validation.error.message)
        console.log(validation.error.message)
      }else{
        await resetPassword(emailRef.current.value)
        setMessage("Revisá tu casilla para continuar")
      }
      setLoading(false)
    } catch {
      setError("Error")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Cambia tu contraseña</h2>
          <h7 className="text-center mb-4">Se enviará un correo para actualizar tu contraseña</h7>
          {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
          {message && <Alert className="mt-3" variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
          <Link to="#" style={{color: '#FB3640'}} onClick={props.onLoginClicked}>Ingresar</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        ¿No tenes una cuenta?<Link to="#" style={{color: '#FB3640'}} onClick={props.onSingUpClicked}>¡Registrate!</Link>
      </div>
    </>
  )
}
