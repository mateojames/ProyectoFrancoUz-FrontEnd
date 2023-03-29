import React, {useState, useEffect, useRef  } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { loadLocations } from "../store/actions/loadLocations"; 
import { updateLocation } from "../store/actions/updateLocation.js";
import { createLocationWithImage } from "../store/actions/createLocationWithImage.js"; 
import { deleteLocation } from "../store/actions/deleteLocation.js"; 

import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import Input from '@mui/material/Input';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import TextField from '@mui/material/TextField';
import Button from "./Button"
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Loading } from "./Loading/Loading.js";

export default function Locations(props) {
  const locations = useSelector(state => state.resource.locations);
  const [notDeletedLocations, setNotDeletedLocations] = useState([])
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(null)
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const nameRef = useRef()
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(null)

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

const handleFileChange = (event) => {
    if(event.target.files.length > 0){
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
    }
}

const handleSendCLicked = () => {
    setLoading(true)
    var data = new FormData()
    if(editing){
        if(file){
            data.append('file', file)
        }
        data.append('name', nameRef.current.value)
        data.append('id', editing.id)
        dispatch(updateLocation(data, handleLoading))
    }else{
        data.append('file', file)
        data.append('name', nameRef.current.value)
        dispatch(createLocationWithImage(data, handleLoading))
    }
    handleClose()
}

const handleDeleteClicked = () => {
    setLoading(true)
    dispatch(deleteLocation(deleting.id, handleLoading))
    handleDeleteClose()
}

const handleEditLocation = (location) => {
    console.log('item to edit ', location)
    setEditing(location)
    setOpen(true);
}

  const handleClose = () => {
    setOpen(false);
    setEditing(null)
    setFile(null)
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleting(null)
  };

  const handleOpenDelete = (location) => {
    setDeleting(location)
    setOpenDelete(true)
  };

  const handleLoading = () => {
    setLoading(false)
  };

  const handleAddClicked = () => {
    setOpen(true);
  };

  useEffect(() => {
    setLoading(true)
    dispatch(loadLocations(handleLoading))
  }, []);

  useEffect(() => {
    if(locations.length > 0){
        console.log('locations ',locations)
        setNotDeletedLocations(locations.filter(location => !location.deleted))
    }
  }, [locations]);

  useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


  return (
    <>
    <Grid container sx={{display: 'flex', justifyContent: "center", alignItems: "center" }}>
         <ImageList sx={{  width: {xs: windowSize.innerWidth, md: windowSize.innerWidth / 1.8, lg:windowSize.innerWidth / 2}, height: window.innerHeight/1.1, margin:2 }} cols={2}>
      {notDeletedLocations.map((item) => (
        <ImageListItem key={item.url} cols={1} rows={1} sx={{ maxWidth:windowSize.innerWidth / 2, maxHeight: window.innerHeight/ 2}}>
          <img
            src={`${item.url}?w=248&fit=crop&auto=format`}
            srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
            style={{maxWidth: '100%', maxHeight: '100%', borderRadius:'2%'}}
            
          />
          <ImageListItemBar
            title={item.name}
            actionIcon={
                <div>
              <IconButton
                sx={{ color: 'rgba(255,255,255, 0.9)' }}
                aria-label={`Editar ${item.name}`}
                onClick={() => handleEditLocation(item)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ color: 'rgba(255,255,255, 0.9)' }}
                aria-label={`Eliminar ${item.name}`}
                onClick={() => handleOpenDelete(item)}
              >
                <DeleteIcon />
              </IconButton>
              </div>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Agregar Sala</DialogTitle>
              <DialogContent>
              <DialogContentText>
                  Para agregar una sala porfavor complete el nombre y agregue una imagen de la misma
              </DialogContentText>
              <Box sx={{display: 'flex', flexDirection:'row'}}>
              <FormControl fullWidth>
                  <TextField
                      autoFocus
                      margin="dense"
                      label="Nombre"
                      type="text"
                      variant="standard"
                      inputRef={nameRef}
                      defaultValue ={editing ? editing.name : ''}
                      fullWidth
                  />
              </FormControl>
              <FormControl>
              <IconButton color="primary" sx={{ p: "20px" }} aria-label="upload picture" component="label">
                    <AddToPhotosIcon/>
                    <Input hidden accept="image/*" type="file" onChange={handleFileChange}/>
                </IconButton>
                </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button disabled={!editing && !(nameRef && file)} onClick={handleSendCLicked}>{editing ? 'Actualizar' : 'Enviar'}</Button>
              </DialogActions>
    </Dialog>
    <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea eliminar la Sala?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está acción no le permitirá crear más sesiones con dicha sala
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus>Cancelar</Button>
          <Button onClick={handleDeleteClicked}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 16, right:16}}>
        <Fab color="primary" aria-label="add" onClick={handleAddClicked}>
            <AddIcon/>
    </Fab>
    </Box>
    </Grid>
    {loading && <Loading/>}
    </>
  );
}
