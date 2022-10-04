import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import {
  updatePassword
} from "firebase/auth";
import { useSelector } from 'react-redux';

export default function UpdateProfile() {
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const currentUser = useSelector(state => state.auth.currentUser);

  const updatePass = async (password) => updatePassword(currentUser, password);

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Las contraseñas no coinciden")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (passwordRef.current.value) {
      promises.push(updatePass(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Error al actualizar el perfil")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Actualizar Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={currentUser.email}
                disabled
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Actualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancelar</Link>
      </div>
    </>
  )
}
