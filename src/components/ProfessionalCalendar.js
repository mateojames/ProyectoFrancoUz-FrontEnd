import React, {useState, useEffect, useRef} from "react"
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  Resources,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState} from '@devexpress/dx-react-scheduler';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { loadAppointments } from "../store/actions/loadAppointments";
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
import { Chip, List, ListItem, Tooltip } from "@mui/material";
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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { 
  todayButtonMessages
} from "./Locale";
import { addCommentToRecurrent } from "../store/actions/addCommenToRecurrent";
import { emptyCurrentAppointment } from "../store/actions/emptyCurrentAppoinment";

const PREFIX = 'FrancoUz';

const classes = {
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
  [`&.${classes.firstRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  [`&.${classes.secondRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  [`&.${classes.bomboneraRoom}`]: {
    background: 'url(https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/05/14174202/boca-river-cancha.jpg)',
  },
  [`&.${classes.thirdRoom}`]: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  [`&.${classes.header}`]: {
    height: '240px',
    backgroundSize: 'cover',
  },
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

const getClassByLocation = (classes, location) => {
  if (location === 'Room 1') return classes.firstRoom; //la location esta en el appointment, la cambiamos ahi
  if (location === 'Room 2') return classes.secondRoom;
  if (location === 'La Bombonera') return classes.bomboneraRoom;
  return classes.thirdRoom;
};

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
    
    console.log('APPOINTMENT ', restProps)

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
        const [openCancelar, setOpenCancelar] = React.useState(false);
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
            console.log('FINALIZAR')
            handleClickOpen()
        }
        const handleCancelarClicked = () =>{
            console.log('CANCELAR')
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
        dispatch(emptyCurrentAppointment())
      }, []);

        return (
            <StyledAppointmentTooltipHeader
            {...restProps}
            className={classNames(getClassByLocation(classes, currentAppointment.location), classes.header)}
            appointmentData={currentAppointment}
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
            <FormControl sx={{ ml: 1, flex: 1 }} >
            <InputBase
                inputRef={commentRef}
                placeholder="Agregar comentario"
                inputProps={{ "aria-label": "Agregar comentario" }}
                disabled={disableComments}
                required
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
  


export default function ProfessionalCalendar(){
  const [currentDate, setCurrentDate] = useState(new Date())
  const data = useSelector(state => state.calendar.appointments);
  const [resources, setResources] = useState([
    {fieldName: 'therapy', title: 'Tipo de terapia',instances: []},
    {fieldName: 'location', title: 'Ubicación',instances: []}
  ]);
  const therapies = useSelector(state => state.resource.therapies);
  const locations = useSelector(state => state.resource.locations);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleCurrentDateChange = (currentDate) => {
    setCurrentDate(currentDate)
  }

  const dataSession = useLocation();


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
      const locToRes = locations.map((location)=>{
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
      console.log("Session info1 -->", date);

      const d = date.slice(0,2);
      const m = date.slice(3,5) - 1;
      const y = date.slice(6,10);

      const newDate = new Date(y, m, d);
      console.log("Nueva fecha",newDate);

      handleCurrentDateChange(newDate);
    }
  }

  const handleLoading = () => {
    setLoading(false)
  };
  

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



  return (
      <Paper>
        <Scheduler
          data={data}
          locale='es-ES'
          height={870}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={handleCurrentDateChange}
          />

          <WeekView
            startDayHour={8}
            endDayHour={23}
            name="Semana"
          />
          <DayView name="Día"/>
          <MonthView name="Mes"/>

          <Toolbar />
          <DateNavigator />
          <TodayButton messages={todayButtonMessages}/>
          <ViewSwitcher />

          <Appointments appointmentComponent={Appointment}/>
          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            layoutComponent={Layout}
            showCloseButton
          />
          <Resources
            data={resources}
            mainResourceName="therapy"
          />    
        </Scheduler>
        {loading && <Loading />}
      </Paper>
    )
}