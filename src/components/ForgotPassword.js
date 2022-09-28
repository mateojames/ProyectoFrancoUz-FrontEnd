import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import Button from "./Button"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword(props) {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
    } catch {
      //setError("Error al cambiar contraseña")
    }
    setMessage("Revisá tu casilla para continuar")
    setLoading(false)
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
