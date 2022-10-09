import React, {useState, useEffect  } from "react"
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  AllDayPanel,
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
import { ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
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
        <StyledRoom className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledPatient className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span style={{fontWeight: 'bold'}}>Paciente: </span>
        <span>{appointmentData.patient}</span>
      </Grid>
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledProfessional className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span style={{fontWeight: 'bold'}}>Profesional: </span>
        <span>{appointmentData.professional}</span>
      </Grid>
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledTherapy className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span style={{fontWeight: 'bold'}}>Terapia: </span>
        <span>{appointmentData.therapy}</span>
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

const uniqueOptions = [{label: 'Jorge', id: 0},
                        {label: 'Hernan', id: 1},
                        {label: 'Julian', id: 2}]

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <TextField label={props.placeholder} value={props.value} disabled={props.readOnly} fullWidth onChange={(event) => props.onValueChange(event.target.value)} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onPatientFieldChange = (event, nextValue) => {
    console.log(nextValue)
    onFieldChange({ patient: nextValue.label || '' });
  };
  const onProfessionalFieldChange = (nextValue) => {
    onFieldChange({ professional: nextValue });
  };
  const onTherapyFieldChange = (nextValue) => {
    onFieldChange({ therapy: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
      labelComponent={(props) => {
        console.log(props)
        if(props.text==="-"){
          return <AppointmentForm.Label {...props}/>
        }
        else{
          return null
      }}}
    >

      <AppointmentForm.Label
        text="Profesional"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.professional}
        onValueChange={onProfessionalFieldChange}
        placeholder="Ingrese el profesional correspondiente"
      />

      <AppointmentForm.Label
        text="Tipo de Terapia"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.therapy}
        onValueChange={onTherapyFieldChange}
        placeholder="Ingrese el tipo de terapia correspondiente"
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={uniqueOptions}
        sx={{ width: 300 }}
        value={appointmentData.patient || ''}
        onChange={onPatientFieldChange}
        isOptionEqualToValue ={(option, value) => option.label === value}
        renderInput={(params) => <TextField {...params} label="Movie" />}
    />
    </AppointmentForm.BasicLayout>
  );
};



export default function Demo(){
  const [currentDate, setCurrentDate] = useState(new Date())
  const data = useSelector(state => state.calendar.appointments);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleCurrentDateChange = (currentDate) => {
    setCurrentDate(currentDate)
  }

  const handleCommitChanges = (action) => {
    console.log('commit');
    console.log(action)
    if(action.added) dispatch(addAppointment(action));
    if(action.changed)dispatch(editAppointment(action));
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
        backgroundColor: '#FFC107',
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  useEffect(() => {
    setLoading(true);
    dispatch(loadAppointments(handleLoading));
  }, []);

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
          
          <DragDropProvider />        
        </Scheduler>
        {loading && <Loading />}
      </Paper>
    )
}