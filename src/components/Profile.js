import React, { useState, useEffect } from "react"
import Alert from '@mui/material/Alert';
import Button from "./Button";
import Card from '@mui/material/Card';
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom"
import CardContent from '@mui/material/CardContent';
import MainBox from "./MainBox";

export default function Profile() {
  const [error, setError] = useState("")
  const locationData = useLocation();
  const currentUser = useSelector(state => state.auth.currentUser);
  
  console.log('location ',locationData)
  return (
    <MainBox>
        <Card variant='outlined' sx={{flexGrow: 1}}>
          <CardContent>
            <h2 className="text-center mb-4">Perfil</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Actualizar Perfil
            </Link>
          </CardContent>
        </Card>
    </MainBox>
  )
}
