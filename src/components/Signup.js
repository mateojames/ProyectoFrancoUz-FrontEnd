import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import Button from "./Button"
import { Link, useHistory } from "react-router-dom"
import { auth } from "../firebase"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
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

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Las contraseñas no coinciden")
    }

    try {
      setError("")
      setLoading(true)
      await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Error al crear la cuenta")
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
