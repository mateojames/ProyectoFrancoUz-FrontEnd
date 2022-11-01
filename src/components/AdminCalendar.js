import React, {useState, useEffect} from "react"
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete } from '@mui/material';
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
import { loadLocations, loadTherapies } from "../store/actions/resources";
import { useLocation } from "react-router-dom";
const PREFIX = 'FrancoUz';

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-SalaMusicoterapia`,
  firstRoom: `${PREFIX}-SalaPsicoterapia`,
  secondRoom: `${PREFIX}-SalaRadioterapia`,
  thirdRoom: `${PREFIX}-SalaJuegos`,
  bomboneraRoom: `${PREFIX}-LaBombonera`,
  header: `${PREFIX}-header`,
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
    height: '260px',
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

const Header = (({
  children, appointmentData, ...restProps
}) => (
  <StyledAppointmentTooltipHeader
    {...restProps}
    className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
    appointmentData={appointmentData}
  >
  </StyledAppointmentTooltipHeader>
));

const Content = (({
  children, appointmentData, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center" rowSpacing={1}>
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledPatient className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span style={{fontWeight: 'bold'}}>Paciente: </span>
        <span>{appointmentData.patient.name}</span>
      </Grid>
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledProfessional className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span style={{fontWeight: 'bold'}}>Profesional: </span>
        <span>{appointmentData.professional.name}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

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
    onFieldChange({ patient: newValue || null });
  };
  const onProfessionalFieldChange = (event, newValue) => {
    onFieldChange({ professional: newValue || null });
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
        disablePortal
        id="combo-box-demo"
        options={patients}
        fullWidth
        sx={{mt:1}}
        value={appointmentData.patient || null}
        onChange={onPatientFieldChange}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue ={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Paciente" />}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={professionals}
        fullWidth
        sx={{mt:2}}
        value={appointmentData.professional || null}
        onChange={onProfessionalFieldChange}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue ={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Profesional" />}
      />
    </AppointmentForm.BasicLayout>
  );
};



export default function AdminCalendar(){
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

  const addTherapy = (appointment) => {
    const therapy = therapies.find(therapy => therapy.id === appointment.therapy)
    appointment = {...appointment, therapy: therapy}
    return appointment
  }

  const handleCommitChanges = (action) => {
    console.log('commit');
    if(action.added){
      dispatch(addAppointment(action));
      console.log(action)
    }
    if(action.changed){
      dispatch(editAppointment(action));
    }
    if(action.deleted)dispatch(deleteAppointment(action));
  }

  const handleLoading = () => {
    setLoading(false)
  };

  const Appointment = ({
    children, style, ...restProps
  }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
  );

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
    if(dataSession.state != undefined){
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
          <EditingState
            onCommitChanges={handleCommitChanges}
          />

          <WeekView
            startDayHour={8}
            endDayHour={20}
          />
          <DayView />
          <MonthView />

          <EditRecurrenceMenu />
          <ConfirmationDialog />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />

          <Appointments appointmentComponent={Appointment}/>
          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            booleanEditorComponent={BooleanEditor}
            dateEditorComponent={DateEditor}
          />
          <Resources
            data={resources}
            mainResourceName="therapy"
          />
          <DragDropProvider />        
        </Scheduler>
        {loading && <Loading />}
      </Paper>
    )
}