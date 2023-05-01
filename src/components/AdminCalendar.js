import React, {useState, useEffect, useRef} from "react"
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  Resources,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  EditRecurrenceMenu,
  AppointmentTooltip,
  AppointmentForm,
  ViewSwitcher,
  Toolbar,
  DragDropProvider,
  DateNavigator,
  TodayButton,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import Joi from "joi";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete, Chip, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ViewState, EditingState} from '@devexpress/dx-react-scheduler';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from "../store/actions/addAppointment";
import { loadAppointments } from "../store/actions/loadAppointments";
import {editAppointment} from "../store/actions/editAppointment";
import {deleteAppointment} from "../store/actions/deleteAppointment";
import { Loading } from './Loading/Loading.js';
import { loadPatients } from "../store/actions/loadPatients";
import { loadProfessionals } from "../store/actions/loadProfessionals";
import { loadLocations } from "../store/actions/loadLocations";
import { loadTherapies } from "../store/actions/loadTherapies";
import { useLocation } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import SendIcon from '@mui/icons-material/Send';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import { addComment } from "../store/actions/addComment";
import Badge from '@mui/material/Badge';
import MoreIcon from '@mui/icons-material/MoreVert';
import HeaderMenu from "./HeaderMenu";
import Button from "./Button"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addCommentToRecurrent } from "../store/actions/addCommenToRecurrent";
import { emptyCurrentAppointment } from "../store/actions/emptyCurrentAppoinment";
import { 
  todayButtonMessages,
  editRecurrenceMenuMessages,
  appointmentFormMessages,
  confirmationDialogMessages
} from "./Locale";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterMenu from "./FilterMenu";
import { connectProps } from '@devexpress/dx-react-core';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar } from "@mui/material";

const PREFIX = 'FrancoUz';

const DEFAULTBACKGROUND = 'https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg'

const classes = {
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-SalaMusicoterapia`,
  firstRoom: `${PREFIX}-SalaPsicoterapia`,
  secondRoom: `${PREFIX}-SalaRadioterapia`,
  thirdRoom: `${PREFIX}-SalaJuegos`,
  bomboneraRoom: `${PREFIX}-LaBombonera`,
  header: `${PREFIX}-header`,
  layout: `${PREFIX}-layout`,
  commandButton: `${PREFIX}-commandButton`,
};

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
  [`&.${classes.header}`]: {
    height: '260px',
    backgroundSize: '100% 100%' //review in a future, maybe 'cover' is better
  }
}));

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center',
  },
}));

const StyledPatient = styled(EscalatorWarningIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const StyledTherapy = styled(Diversity2Icon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const StyledProfessional = styled(AssignmentIndIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const StyledAppointmentTooltipCommandButton = styled(AppointmentTooltip.CommandButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
}));

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    margin: '0 auto 0 0',
  },
}));

const FlexibleSpace = (({
  filters, setFilters, therapies, locations, patients, professionals, restProps
}) => {
  const [anchorMenu, setAnchorMenu] = useState(null);
    const openMenu = Boolean(anchorMenu);
    const handleMenuClick = (event) => {
        setAnchorMenu(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorMenu(null);
    };

    const deleteFilter = (item) => {
        setFilters((previousState) => previousState.filter((filter => filter.id !== item.id)))
    }

  return (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace} sx={{display: 'flex'}}>
    <IconButton onClick={handleMenuClick}  aria-label="delete">
      <FilterAltIcon/>
    </IconButton>
    {filters.map((item) => {
          return (<Chip
            avatar={<IconButton onClick={() => deleteFilter(item)} aria-label={item.name}>
                      <CloseIcon/>
                    </IconButton>}
            label={item.name}
            variant="outlined"
        />)
        })}
    <FilterMenu filters={filters} setFilters={setFilters} therapies={therapies} locations={locations} professionals={professionals} patients={patients} open={openMenu} handleClose={handleMenuClose} handleClick={handleMenuClick} anchorEl={anchorMenu} />
  </StyledToolbarFlexibleSpace>
)});


const StyledAppointmentTooltipLayout = styled(AppointmentTooltip.Layout)((props) => ({
  [`&.${classes.layout}`]: {
      maxHeight: props.size.innerHeight / 1.6
      
  },
}));


const Layout = (({
  children, ...restProps
}) => { 
  const [windowSize, setWindowSize] = useState(getWindowSize());
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
  <StyledAppointmentTooltipLayout
    {...restProps}
    size={windowSize}
    className={classNames(classes.layout)}
  >
  </StyledAppointmentTooltipLayout>
)});

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}


const Appointment = ({
  children, style, ...restProps
}) => {

  let dinamicStyle = {
      ...style,
      borderRadius: '8px'
    }
  let state = (
      <Typography
          component="span"
          variant="body1"
          color="white"
          style={{margin: '5px'}}
      >
          
      </Typography>
  )

  if(restProps.data.state){
      if(restProps.data.state === 'finalized' || restProps.data.state === 'cancelled'){
          dinamicStyle = {
              ...style,
              borderRadius: '8px',
              backgroundColor: 'lightgrey'
            }
          if(restProps.data.state === 'finalized'){
              state = (
                  <Typography
                      component="span"
                      variant="body2"
                      color="white"
                      style={{margin: '5px'}}
                  >
                      FINALIZADA
                  </Typography>
              )
          }else if(restProps.data.state === 'cancelled'){
              state = (
                  <Typography
                      component="span"
                      variant="body2"
                      color="white"
                      style={{margin: '5px'}}
                  >
                      CANCELADA
                  </Typography>
              )
          }
      }
  }

  return (
  <Appointments.Appointment
    {...restProps}
    style={dinamicStyle}
  >
  {state}
    {children}
  </Appointments.Appointment>
)};

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
}));

const Header = (({
  children, appointmentData, ...restProps
}) => {
      const commentRef = useRef()
      const currentUser = useSelector(state => state.auth.currentUser);
      const [anchorHeaderMenu, setAnchorHeaderMenu] = useState(null);
      const openHeaderMenu = Boolean(anchorHeaderMenu);
      const [open, setOpen] = React.useState(false);
      const appointments = useSelector(state => state.calendar.appointments);
      const locations = useSelector(state => state.resource.locations);
      const [openCancelar, setOpenCancelar] = useState(false);
      const [backgorund, setBackground] = useState(null);
      const addedAppointment = useSelector(state => state.calendar.currentAppointment);

      let currentAppointment = addedAppointment ? addedAppointment : appointments.find(appointment => appointment.id === appointmentData.id)
      currentAppointment = currentAppointment ? currentAppointment : appointmentData
      
      const dispatch = useDispatch()
      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
        setOpenCancelar(false)
      };
      const handleHeaderMenuClick = (event) => {
          setAnchorHeaderMenu(event.currentTarget);
      };
      const handleHeaderMenuClose = () => {
          setAnchorHeaderMenu(null);
      };
      const handleFinalizarClicked = () =>{
          handleClickOpen()
      }
      const handleCancelarClicked = () =>{
          setOpenCancelar(true)
      }
      const handleSubmitAction = (appointment, action) => {
          const comment = {
              id: new Date().valueOf().toString(),
              author: currentUser.uid,
              comment: commentRef.current.value,
              date: new Date().toLocaleDateString('en-GB').concat(' ', new Date().toLocaleTimeString()),
              action: action
          }
          let exDate = appointment.rRule ? appointment.startDate.toISOString().replaceAll('-', '').replaceAll(':', '').replace('.000', '') : null
          const commentActionData = {
              appointment: appointment,
              comment: comment,
              exDate: exDate
          }

          if(commentActionData.exDate){
            dispatch(addCommentToRecurrent(commentActionData))
          }else{
            dispatch(addComment(commentActionData))
          }
          handleClose()
          commentRef.current.value = ''
      }

      useEffect(() => {
        if(locations.length > 0 && currentAppointment){
           const currentLocation = locations.find((location) => location.id === currentAppointment.location)
           
           if(currentLocation){
           
            setBackground(currentLocation.url)
           }
        }
      }, [locations, currentAppointment]);


      useEffect(() => {

      }, [backgorund]);

      useEffect(() => {
        dispatch(emptyCurrentAppointment())
      }, []);

      return (
          <StyledAppointmentTooltipHeader
          {...restProps}
          className={classes.header}
          sx={{ background: `url(${backgorund ? backgorund : DEFAULTBACKGROUND})`}}
          appointmentData={currentAppointment}
          showOpenButton={currentAppointment ? ((currentAppointment.state === 'finalized' || currentAppointment.state === 'cancelled') ? false : true) : true}
          >
          <StyledIconButton
          onClick={handleHeaderMenuClick}
          className={classes.commandButton}
          disabled={currentAppointment.state === 'finalized' || currentAppointment.state === 'cancelled'}
          size="large"
          >
          <MoreIcon />
          </StyledIconButton>
          <HeaderMenu open={openHeaderMenu} handleClose={handleHeaderMenuClose} handleClick={handleHeaderMenuClick} anchorEl={anchorHeaderMenu} role={'profesional'} handleFinalizar={handleFinalizarClicked} handleCancelar={handleCancelarClicked} appointment={appointmentData}/>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Finalizar Sesión</DialogTitle>
              <DialogContent>
              <DialogContentText>
                  Para finalizar la sesión por favor deje un comentario dando un breve resumen de la misma
              </DialogContentText>
              <FormControl fullWidth>
                  <TextField
                      autoFocus
                      margin="dense"
                      label="Agregue un comentario"
                      type="text"
                      fullWidth
                      variant="standard"
                      inputRef={commentRef}
                      multiline
                  />
              </FormControl>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={() => handleSubmitAction(appointmentData, 'finalizar')}>Finalizar</Button>
              </DialogActions>
          </Dialog>
          <Dialog open={openCancelar} onClose={handleClose}>
              <DialogTitle>Cancelar Sesión</DialogTitle>
              <DialogContent>
              <DialogContentText>
                  Para cancelar la sesión por favor deje un comentario con el motivo de la cancelación
              </DialogContentText>
              <FormControl fullWidth>
                  <TextField
                      autoFocus
                      margin="dense"
                      label="Agregue un comentario"
                      type="text"
                      fullWidth
                      variant="standard"
                      inputRef={commentRef}
                      multiline
                  />
              </FormControl>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose}>Atrás</Button>
              <Button onClick={() => handleSubmitAction(appointmentData, 'cancelar')}>Enviar</Button>
              </DialogActions>
          </Dialog>
          </StyledAppointmentTooltipHeader>
      )});


const Content = (({
  children, appointmentData, ...restProps
}) => {
  const [expanded, setExpanded] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const commentRef = useRef()
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.calendar.appointments);
  const addedAppointment = useSelector(state => state.calendar.currentAppointment);
  
  let currentAppointment = addedAppointment ? addedAppointment : appointments.find(appointment => appointment.id === appointmentData.id)
  currentAppointment = currentAppointment ? currentAppointment : appointmentData

  useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    const hanldeSubmitComment = (appointment) => {
      const comment = {
          id: new Date().valueOf().toString(),
          author: currentUser.uid,
          comment: commentRef.current.value,
          date: new Date().toLocaleDateString('en-GB').concat(' ', new Date().toLocaleTimeString())
      }
      let exDate = appointment.rRule ? appointment.startDate.toISOString().replaceAll('-', '').replaceAll(':', '').replace('.000', '') : null
      const commentActionData = {
          appointment: appointment,
          comment: comment,
          exDate: exDate
      }
      if(commentActionData.exDate){
        dispatch(addCommentToRecurrent(commentActionData))
      }else{
        dispatch(addComment(commentActionData))
      }
     //console.log('exDate, ', commentActionData.appointment.startDate.toISOString().replaceAll('-', '').replaceAll(':', '').replaceAll('.', ''))
      commentRef.current.value = ''
  }
  const commentsToDisplay = [...currentAppointment.comments].reverse()

  const commentsList = (
          <List sx={{bgcolor: 'background.paper', maxHeight: windowSize.innerHeight / 4,overflow:'auto'}}>
              {commentsToDisplay.map((item) => {
                  let listItem = (
                      <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                          <Avatar alt={item.author.name} />
                      </ListItemAvatar>
                      <ListItemText
                      primary={
                          <React.Fragment>
                          <Typography
                              component="span"
                              variant="body1"
                              color="text.primary"
                          >
                              {item.comment}
                          </Typography>
                          </React.Fragment>
                      }
                      secondary={
                          <React.Fragment>
                          <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body4"
                              color="text.secondary"
                          >
                              {item.author.name + ' - ' + item.author.role}
                          </Typography>
                          <br></br>
                          <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body6"
                              color="text.secondary"
                          >
                              {item.date}
                          </Typography>
                          </React.Fragment>
                      }
                      
                      />
                  </ListItem>
                  )
                  if(item.action === 'finalizar'){
                      listItem = (
                          <ListItem alignItems="flex-start" sx={{bgcolor: 'lightgray', borderRadius: 2, margin:0.5}}>
                          <ListItemAvatar>
                              <Avatar alt={item.author.name} />
                          </ListItemAvatar>
                          <Tooltip disableFocusListener title="Comentario de finalización" arrow>
                          <ListItemText
                          primary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.primary"
                              >
                                  {item.comment}
                              </Typography>
                              </React.Fragment>
                          }
                          secondary={
                              <React.Fragment>
                              <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body4"
                                  color="text.secondary"
                              >
                                  {item.author.name + ' - ' + item.author.role}
                              </Typography>
                              <br></br>
                              <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body6"
                                  color="text.secondary"
                              >
                                  {item.date}
                              </Typography>
                              </React.Fragment>
                          }
                          
                          />
                          </Tooltip>
                      </ListItem>)
                  }else if(item.action === 'cancelar'){
                      listItem = (
                          <ListItem alignItems="flex-start"sx={{bgcolor: 'lightgray', borderRadius: 2, margin:0.5}}>
                          <ListItemAvatar>
                              <Avatar alt={item.author.name} />
                          </ListItemAvatar>
                          <Tooltip disableFocusListener title="Comentario de cancelación" arrow>
                          <ListItemText
                          primary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body1"
                                  color="text.primary"
                              >
                                  {item.comment}
                              </Typography>
                              </React.Fragment>
                          }
                          secondary={
                              <React.Fragment>
                              <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body4"
                                  color="text.secondary"
                              >
                                  {item.author.name + ' - ' + item.author.role}
                              </Typography>
                              <br></br>
                              <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body6"
                                  color="text.secondary"
                              >
                                  {item.date}
                              </Typography>
                              </React.Fragment>
                          }
                          
                          />
                          </Tooltip>
                      </ListItem>)
                  }
                  return (
                      <>
                      {listItem}
                       <Divider variant="inset" component="li" />
                       </>
                  )
              })}
          </List>
      )

  let disableComments = false
  if(currentAppointment.state){
      if(currentAppointment.state === 'finalized' || currentAppointment.state === 'cancelled'){
          disableComments = true
      }
  }

    return (
  <AppointmentTooltip.Content {...restProps} appointmentData={currentAppointment}>
    <Grid container alignItems="center" rowSpacing={1}>
    <StyledGrid item xs={2} className={classes.textCenter}>
      <StyledPatient className={classes.icon} />
    </StyledGrid>
    <Grid item xs={10}>
      <span style={{fontWeight: 'bold'}}>Paciente/s: </span>
        {currentAppointment.patients.map((item) => {
          return (<Chip
            avatar={<Avatar alt={item.name} src="/" />}
            label={item.name}
            variant="outlined"
        />)
        })}
    </Grid>
    <StyledGrid item xs={2} className={classes.textCenter}>
      <StyledProfessional className={classes.icon} />
    </StyledGrid>
    <Grid item xs={10}>
      <span style={{fontWeight: 'bold'}}>Profesional/es: </span>
      {currentAppointment.professionals.map((item) => {
          return (<Chip
            avatar={<Avatar alt={item.name} src="/" />}
            label={item.name}
            variant="outlined"
        />)
        })}
    </Grid>
  </Grid>
    <Divider variant="middle" sx={{mt: 2, mb: 2}}/>
  <Accordion onChange={() => setExpanded((previousState) => !previousState)} expanded={expanded}>
      <AccordionSummary
        expandIcon={
          <Badge badgeContent={currentAppointment.comments.length} color="primary" invisible={expanded}>
              <ExpandMoreIcon />
          </Badge>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Ver Comentarios</Typography>
      </AccordionSummary>
      <AccordionDetails>
          {commentsList}
      </AccordionDetails>
    </Accordion>
    <Paper

      sx={{ p: "2px 4px", display: "flex", alignItems: "center", mt: 1}}
      >
          <IconButton color="primary" sx={{ p: "10px" }} disabled>
              <InsertCommentIcon />
          </IconButton>
          <FormControl sx={{ ml: 1, flex: 1 }}>
          <InputBase
              inputRef={commentRef}
              placeholder="Agregar comentario"
              inputProps={{ "aria-label": "Agregar comentario" }}
              disabled={disableComments}
          />
          </FormControl>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" onClick={() => hanldeSubmitComment(appointmentData)} disabled={disableComments}>
              <SendIcon/>
          </IconButton>
      </Paper>
  </AppointmentTooltip.Content>
)}
);

const CommandButton = (({
  ...restProps
}) => (
  <StyledAppointmentTooltipCommandButton {...restProps} className={classes.commandButton} />
));

const BooleanEditor =(props) => {
  if(props.label=="All Day"){
    return null
  }
  else{
    return <AppointmentForm.BooleanEditor {...props}/>
  }
}
/*
const DateEditor=(props) => {
  return ( 
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DateTimePicker
    label="Fecha"
    renderInput={ props => <TextField {...props} />}
    value={props.value}
    onChange={props.onValueChange}
    className={props.className}
    readOnly={props.readOnly}
  />
  </LocalizationProvider>)
}
*/

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <TextField label={props.placeholder} value={props.value} disabled={props.readOnly} fullWidth onChange={(event) => props.onValueChange(event.target.value)} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const patients = useSelector(state => state.user.patients);
  const professionals = useSelector(state => state.user.professionals);
  const onPatientFieldChange = (event, newValue) => {
    onFieldChange({ patients: newValue || null });
  };
  const onProfessionalFieldChange = (event, newValue) => {
    onFieldChange({ professionals: newValue || null });
  };
  //console.log(restProps.appointmentRef);
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
      labelComponent={(props) => {
        if(props.text==="-"){
          return <AppointmentForm.Label {...props}/>
        }
        else{
          return null
      }}}
    >

      <Autocomplete
        multiple
        disablePortal
        id="combo-box-demo"
        options={patients}
        fullWidth
        sx={{mt:1}}
        value={appointmentData.patients || []}
        onChange={onPatientFieldChange}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue ={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Paciente" />}
      />

      <Autocomplete
        multiple
        disablePortal
        id="combo-box-demo"
        options={professionals}
        fullWidth
        sx={{mt:2}}
        value={appointmentData.professionals || []}
        onChange={onProfessionalFieldChange}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue ={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Profesional" />}
      />
    </AppointmentForm.BasicLayout>
  );
};


const CommandLayout = ({appointmentChanges, action, setError, ...restProps}) => {
    const handleButtonCLicked = (changes) => {
      console.log(action, ' , ', appointmentChanges);
      const mensajesDeError = {
        'any.required': 'El campo {#label} es obligatorio.',
        'boolean.base': 'El campo {#label} debe ser verdadero o falso.',
        'string.empty': 'El campo {#label} es obligatorio.',
        'string.alphanum': 'El campo {#label} solo debe contener letras y números.',
        'string.min': 'El campo {#label} debe tener al menos {#limit} caracteres.',
        'string.max': 'El campo {#label} no debe tener más de {#limit} caracteres.',
        'string.pattern.base': 'El campo {#label} solo permite letras, números y espacios.',
        'array.base': 'El campo {#label} debe ser una lista.',
        'array.min': 'Debe seleccionar al menos {#limit} {#label}.',
      };
      const opcionesValidador = {
        abortEarly: false,
        messages: mensajesDeError,
      };
      let validation = {}
      const addingAppointmentSchema = Joi.object({
        allDay: Joi.boolean().optional().label('Todo el día'),
        startDate: Joi.date().required().label('Fecha de inicio'),
        endDate: Joi.date().required().label('Fecha de finalización'),
        exDate: Joi.date().optional().label('Excepción'),
        location: Joi.string().alphanum().min(1).max(50).required().label('Ubicación'),
        rRule: Joi.string().min(1).max(400).optional().label('Regla de repetición'),
        therapy: Joi.string().min(1).max(128).required().label('Terapia'),
        title: Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(1).max(30).required().label('Título'),
        patients: Joi.array().required().label('Pacientes'),
        professionals: Joi.array().required().label('Profesionales'),
      });
      const editingAppointmentSchema = Joi.object({
        allDay: Joi.boolean().optional().label('Todo el día'),
        startDate: Joi.date().optional().label('Fecha de inicio'),
        endDate: Joi.date().optional().label('Fecha de finalización'),
        exDate: Joi.date().optional().label('Excepción'),
        location: Joi.string().alphanum().min(1).max(50).optional().label('Ubicación'),
        rRule: Joi.string().min(1).max(400).optional().label('Regla de repetición'),
        therapy: Joi.string().min(1).max(128).optional().label('Terapia'),
        title: Joi.string().pattern(/^[a-zA-Z0-9 ]+$/).min(1).max(30).optional().label('Título'),
        patients: Joi.array().optional().label('Pacientes'),
        professionals: Joi.array().optional().label('Profesionales'),
      });
    if(action === 'editing'){
      validation =  editingAppointmentSchema.validate(appointmentChanges, opcionesValidador)
      console.log('editing validation, ',validation)
    }
    if(action === 'adding'){
      validation =  addingAppointmentSchema.validate(appointmentChanges, opcionesValidador)
      console.log('adding validation, ',validation)
    }
    if(action){
      if(validation.error){
        /*
        const mensajeDeError = mensajesDeError[validation.error.details[0].type];
        if(mensajeDeError){
          mensajeDeError.replace('{#limit}', validation.error.details[0].context.limit || '');
          setError(mensajeDeError)
          console.log('error ', mensajeDeError)
        }else{
          setError(validation.error.message)
          console.log('error ', validation.error.message)
        }*/
        setError(validation.error.message)
        console.log('error ', validation.error.message)
      }else{
        restProps.onCommitButtonClick(changes)
      }
    }
  }
  return (
    <AppointmentForm.CommandLayout
      {...restProps}
      disableSaveButton={false}
      onCommitButtonClick={handleButtonCLicked}
    >
    </AppointmentForm.CommandLayout>
  );
};



export default function AdminCalendar(){
  const [currentDate, setCurrentDate] = useState(new Date())
  const data = useSelector(state => state.calendar.appointments);
  const [filteredData, setFilteredData] = useState([])
  const [resources, setResources] = useState([
    {fieldName: 'therapy', title: 'Tipo de terapia',instances: []},
    {fieldName: 'location', title: 'Ubicación',instances: []}
  ]);
  const [filters, setFilters] = useState([])
  const therapies = useSelector(state => state.resource.therapies);
  const locations = useSelector(state => state.resource.locations);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [appointmentChanges, setAppointmentChanges] = useState({})
  const [action, setAction] = useState(null)
  const [error, setError] = useState('')
  const handleCurrentDateChange = (currentDate) => {
    setCurrentDate(currentDate)
  }
  const patients = useSelector(state => state.user.patients);
  const professionals = useSelector(state => state.user.professionals);

  const dataSession = useLocation();

  const addTherapy = (appointment) => {
    const therapy = therapies.find(therapy => therapy.id === appointment.therapy)
    appointment = {...appointment, therapy: therapy}
    return appointment
  }

  const handleCommitChanges = (action) => {
    console.log('commit ',action);
   
   if(action.added){
      dispatch(addAppointment(action));
      console.log(action)
    }
    if(action.changed){
      dispatch(editAppointment(action));
    }
    if(action.deleted)dispatch(deleteAppointment(action));
  }

  const handleAddedAppointmentChange = (changes) => {
    console.log('added changes: ', changes)
    setAppointmentChanges(changes)
    setAction('adding')
  }

  const handleChangesChange = (changes) =>{
    console.log('changes change, ', changes)
    setAppointmentChanges(changes)
    setAction('editing')
  }

  const handleLoading = () => {
    setLoading(false)
  };

  const handleTherapiesToResources = () => {
    if(therapies.length > 0){
      const theToRes = therapies.map((therapy)=>{
        return {id:therapy.id, text: therapy.name}
      });
      setResources((previousState) => {
        return previousState.map((resource)=>{
          return resource.fieldName == 'therapy'? {...resource, instances: theToRes} : resource
        })
      })}
  }

  const handleLocationsToResources = () => {
    if(locations.length > 0){
      const notDeletedLocations = locations.filter((location) => !location.deleted)
      const locToRes = notDeletedLocations.map((location)=>{
        return {id:location.id, text: location.name}
      });
      setResources((previousState) => {
        return previousState.map((resource)=>{
          return resource.fieldName == 'location'? {...resource, instances: locToRes} : resource
        })
      })}
  }

  const handleSessionFocus = () => {
    if(dataSession != undefined && dataSession.state != undefined && dataSession.state.date != undefined){
      const date = dataSession.state.date;

      const d = date.slice(0,2);
      const m = date.slice(3,5) - 1;
      const y = date.slice(6,10);

      const newDate = new Date(y, m, d);

      handleCurrentDateChange(newDate);
    }
  }

  
  const applyFilter = (appointments, filter) => {
    let filteredAppointments = appointments
    if (filter.category === 'Profesional') {
      filteredAppointments = filteredAppointments.filter((appoinment) => appoinment.professionals.map(p => p.id).includes(filter.id))
    } else if (filter.category === 'Paciente') {
      filteredAppointments = filteredAppointments.filter((appoinment) => appoinment.patients.map(p => p.id).includes(filter.id))
    } else if (filter.category === 'Sala') {
      filteredAppointments = filteredAppointments.filter((appoinment) => appoinment.location === filter.id)
  } else if (filter.category === 'Terapia') {
    filteredAppointments = filteredAppointments.filter((appoinment) => appoinment.therapy === filter.id)
  } else if (filter.category === 'Estado') {
    filteredAppointments = filteredAppointments.filter((appoinment) => appoinment.state === filter.id)
  }
    return filteredAppointments
  }

  useEffect(()=>{
    let filteredAppointments = data
    for (const filter of filters) {
      filteredAppointments = applyFilter(filteredAppointments, filter)
    }
    setFilteredData(filteredAppointments)
  },[filters])

  const handleAddClicked = () => {
    setFormVisibility(true)
  }
  

  useEffect(() => {
    setLoading(true);
    dispatch(loadAppointments(handleLoading));
    dispatch(loadPatients());
    dispatch(loadProfessionals());
    dispatch(loadTherapies());
    dispatch(loadLocations());
    handleSessionFocus();
  }, []);

  useEffect(()=>{
    handleTherapiesToResources()
  },[therapies])

  useEffect(()=>{
    handleLocationsToResources()
  },[locations])

  useEffect(()=>{
    handleSessionFocus()
  },[dataSession])

  useEffect(()=>{
    setFilteredData(data)
  },[data])

  const flexibleSpace = connectProps(FlexibleSpace, () => {

    return {
      filteredData: filteredData,
      patients: patients,
      professionals: professionals,
      filters:filters,
      therapies: therapies,
      locations: locations,
      setFilters: setFilters,
    };
  });


  useEffect(() => {
    flexibleSpace.update()
  })

  const commandLayout = connectProps(CommandLayout, () => {

    return {
      appointmentChanges: appointmentChanges,
      action: action,
      setError: setError
    };
  });


  useEffect(() => {
    commandLayout.update()
  })




  return (
      <Paper>
        <Scheduler
          data={filteredData}
          locale='es-ES'
          height={870}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={handleCurrentDateChange}
          />
          <EditingState
            onCommitChanges={handleCommitChanges}
            onAddedAppointmentChange={handleAddedAppointmentChange}
            onAppointmentChangesChange={handleChangesChange}
          />

          <WeekView
            startDayHour={8}
            endDayHour={23}
            name="Semana"
          />
          <DayView name="Día"/>
          <MonthView name="Mes"/>

          <EditRecurrenceMenu messages={editRecurrenceMenuMessages}/>
          <ConfirmationDialog messages={confirmationDialogMessages}/>

          <Toolbar flexibleSpaceComponent={flexibleSpace}/>
          <DateNavigator />
          <TodayButton messages={todayButtonMessages}/>
          <ViewSwitcher />

          <Appointments appointmentComponent={Appointment}/>
          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            layoutComponent={Layout}
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            commandLayoutComponent={commandLayout}
            textEditorComponent={TextEditor}
            booleanEditorComponent={BooleanEditor}
            
            messages={appointmentFormMessages}
            visible={formVisibility}
            onVisibilityChange={(e) => setFormVisibility(e)}
          />
          <Resources
            data={resources}
            mainResourceName="therapy"
          />
          <DragDropProvider />        
        </Scheduler>
        <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 16, right:16}}>
        <Fab color="primary" aria-label="add" onClick={handleAddClicked}>
            <AddIcon/>
        </Fab>
        </Box>
        {loading && <Loading />}
        {error && <Snackbar
          autoHideDuration={10000}
          anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
          open={error ? true : false}
          onClose={() => setError('')}
          sx={{ width: '60%' }}
        >
            <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
          </Snackbar>}
      </Paper>
    )
}