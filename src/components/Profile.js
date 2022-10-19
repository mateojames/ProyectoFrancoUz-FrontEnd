import React, { useState, useEffect, useRef } from "react"
import Button from "./Button";
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom"
import CardContent from '@mui/material/CardContent';
import { Avatar, Paper, Card } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import {
  updatePassword
} from "firebase/auth";

export default function Profile() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const locationData = useLocation();
  const nameRef = useRef()
  const professionConfirmRef = useRef()
  const [error, setError] = useState("")
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const currentUser = useSelector(state => state.auth.currentUser);


  function handleSubmit(e) {

      e.preventDefault()

      if(editing){

        setEditing(false)
     /* const promises = []
      setLoading(true)
      setError("")

      if (nameRef.current.value) {
        //promises.push(updatePass(nameRef.current.value))
      }

      Promise.all(promises)
        .then(() => {
          setLoading(false)
        })
        .catch(() => {
          setError("Error al actualizar el perfil")
        })*/
      }else{
        setEditing(true)
      }
  }

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleEdit = () => {
    console.log('EDITING')
    setEditing(true)
  }

  const professionField = (
    <Form.Group id="profession">
      <Form.Label>Profesión</Form.Label>
      <Form.Control
        type="name"
        defaultValue={locationData.state.profession ? locationData.state.profession : ''}
        disabled={!editing}
      />
  </Form.Group>);  

  console.log('location ',locationData)
  return (
    <Box sx={{display: 'flex', alignContent:'center', justifyContent: 'center', alignItems: 'center'}}>
      <Paper elevation={10} 
          style={{display: 'flex',  flexDirection: 'column', alignContent:'center', justifyContent: 'center', alignItems: 'center', height: 0.9*windowSize.innerHeight, width: 0.95*windowSize.innerWidth}}
          sx={{margin:1}}
        >
        <Box>
          <Avatar
            alt="Remy Sharp"
            sx={{ width:  0.2*windowSize.innerHeight, height:  0.2*windowSize.innerHeight, margin: 2 }}
          />
        </Box>
          <Box>
            <Card sx={{width: 0.5*windowSize.innerWidth}}>
            <CardContent>
              <h2 className="text-center mb-4">{locationData.state.role}</h2>
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
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={locationData.state.name}
                    disabled={!editing}
                  />
                </Form.Group>
                {locationData.state.role === 'profesional' ? professionField : <></>}
                <Button disabled={loading} className="w-100" type="submit">
                  {editing ? 'Actualizar' : 'Editar'}
               </Button>
              </Form>
            </CardContent>
          </Card>
          </Box>
        </Paper>
    </Box>
  )
}
