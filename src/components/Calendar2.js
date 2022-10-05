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
import { ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from "../store/actions/addAppointment";
import { loadAppointments } from "../store/actions/loadAppointments";


import { connectProps } from '@devexpress/dx-react-core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import LocationOn from '@mui/icons-material/LocationOn';
import Notes from '@mui/icons-material/Notes';
import Close from '@mui/icons-material/Close';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Create from '@mui/icons-material/Create';



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

const StyledDiv = styled('div')(({ theme }) => ({
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: '100%',
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: 'right',
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  [`& .${classes.wrapper}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  [`&.${classes.addButton}`]: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));

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

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
}));

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center',
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
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
  console.log(location);
  return classes.thirdRoom;
};

const Header = (({children, appointmentData, ...restProps}) => (
  <StyledAppointmentTooltipHeader
    {...restProps}
    className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
    appointmentData={appointmentData}
  >
    <StyledIconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(JSON.stringify(appointmentData))}
      className={classes.commandButton}
      size="large"
    >
      <MoreIcon />
    </StyledIconButton>
  </StyledAppointmentTooltipHeader>
));

const Content = (({children, appointmentData, ...restProps}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledRoom className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
));

const CommandButton = (({...restProps}) => (
  <StyledAppointmentTooltipCommandButton {...restProps} className={classes.commandButton} />
));

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};


const AppointmentFormContainerBasic = (({ onFieldChange, ...restProps }) => {
  const [state, setState] = useState({
    appointmentChanges: {},
  });

  const {
    visible,
    visibleChange,
    appointmentData,
    cancelAppointment,
    target,
    onHide,
  } = restProps;

  const changeAppointment = ({ field, changes }) => {
    const nextChanges = {
      ...state,
      [field]: changes,
    };
    setState({
      appointmentChanges: nextChanges,
    });
  };

  const commitAppointment = (type) => {
    const { commitChanges } = restProps;
    const appointment = {
      ...appointmentData,
      ...state.appointmentChanges,
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    setState({
      appointmentChanges: {},
    });
  };

  const displayAppointmentData = {
    ...appointmentData,
    ...state.appointmentChanges,
  };

  const isNewAppointment = appointmentData.id === undefined;

  const applyChanges = isNewAppointment
    ? () => commitAppointment('added')
    : () => commitAppointment('changed');

  
  const textEditorProps = field => ({
    variant: 'outlined',
    onChange: ({ target: change }) => changeAppointment({
      field: [field], changes: change.value,
    }),
    value: appointmentData[field] || '',
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  const pickerEditorProps = field => ({
    // keyboard: true,
    value: appointmentData[field],
    onChange: date => changeAppointment({
      field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
    }),
    ampm: false,
    inputFormat: 'DD/MM/YYYY HH:mm',
    onError: () => null,
  });

  const startDatePickerProps = pickerEditorProps('startDate');
  const endDatePickerProps = pickerEditorProps('endDate');
  const cancelChanges = () => {
    setState({
      appointmentChanges: {},
    });
    visibleChange();
    cancelAppointment();
  };

  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={target}
      fullSize
      onHide={onHide}
    >
      <StyledDiv>
        <div className={classes.header}>
          <IconButton className={classes.closeButton} onClick={cancelChanges} size="large">
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField
              {...textEditorProps('Titulo')}
            />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="Desde"
                renderInput={
                  props => <TextField className={classes.picker} {...props} />
                }
                {...startDatePickerProps}
              />
              <DateTimePicker
                label="Hasta"
                renderInput={
                  props => <TextField className={classes.picker} {...props} />
                }
                {...endDatePickerProps}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.wrapper}>
            <LocationOn className={classes.icon} color="action" />
            <TextField
              {...textEditorProps('Ubicacion')}
            />
          </div>
          <div className={classes.wrapper}>
            <Notes className={classes.icon} color="action" />
            <TextField
              {...textEditorProps('Notas')}
              multiline
              rows="6"
            />
          </div>
        </div>
        <div className={classes.buttonGroup}>
          {!isNewAppointment && (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                commitAppointment('deleted');
              }}
            >
              Borrar
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange();
              applyChanges();
            }}
          >
            {isNewAppointment ? 'Crear' : 'Guardar'}
          </Button>
        </div>
      </StyledDiv>
    </AppointmentForm.Overlay>
  );
});

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Paciente"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Ingrese el paciente correspondiente"
      />

      <AppointmentForm.Label
        text="Profesional"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Ingrese el paciente correspondiente"
      />
    </AppointmentForm.BasicLayout>
  );
};

export default function Demo(){
  const appointments = useSelector(state => state.calendar.appointments);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    data: appointments,
    currentDate: '2022-09-21',
    confirmationVisible: false,
    editingFormVisible: false,
    deletedAppointmentId: undefined,
    editingAppointment: undefined,
    previousAppointment: undefined,
    addedAppointment: {},
    startDayHour: 9,
    endDayHour: 19,
    isNewAppointment: false,
  });

  
  const handleCurrentDateChange = (({currentDate}) => { setState({ currentDate }); });

  const handleOnEditingAppointmentChange = (({editingAppointment}) => {
    setState({ editingAppointment });
  });

  const handleOnAddedAppointmentChange = ({addedAppointment}) => {
    setState({ addedAppointment });
    const { editingAppointment } = state;
    if (editingAppointment !== undefined) {
      setState({
        previousAppointment: editingAppointment,
      });
    }
    setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  const handleSetDeletedAppointmentId = ({id}) => {
    setState({ deletedAppointmentId: id });
  }

  const handleToggleEditingFormVisibility = () => {
    const { editingFormVisible } = state;
    setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  const handleToggleConfirmationVisible = () => {
    const { confirmationVisible } = state;
    setState({ confirmationVisible: !confirmationVisible });
  }

  const handleCommitDeletedAppointment = () => {
    setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    handleToggleConfirmationVisible();
  }

  const handleCommitChanges = ({added, changed, deleted }) => {
    setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        dispatch(addAppointment(added));
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        handleSetDeletedAppointmentId(deleted);
        handleToggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }
  
  const Appointment = ({ children, style, ...restProps}) => (
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

  const appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
    const {
      data,
      editingFormVisible,
      editingAppointment,
      addedAppointment,
      isNewAppointment,
      previousAppointment,
    } = state;

    const currentAppointment = data
      .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
      || addedAppointment;
    
    const cancelAppointment = () => {
      if (isNewAppointment) {
        setState({
          editingAppointment: previousAppointment,
          isNewAppointment: false,
        });
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges: handleCommitChanges,
      visibleChange: handleToggleEditingFormVisibility,
      onEditingAppointmentChange: handleOnEditingAppointmentChange,
      cancelAppointment, //que onda esto?
    };
  });

  //useEffect(appointmentForm.update()); //esto estara bien?


  useEffect(() => {
    dispatch(loadAppointments());
  }, []);

  return (
      <Paper>
        <Scheduler
          data={state.data}
          height={870}
        >
          <ViewState
            currentDate={state.currentDate}
            onCurrentDateChange={handleCurrentDateChange}
          />
          <EditingState
            onCommitChanges={handleCommitChanges}
            onEditingAppointmentChange={handleOnEditingAppointmentChange}
            onAddedAppointmentChange={handleOnAddedAppointmentChange}
          />

          <WeekView
            startDayHour={8}
            endDayHour={20}
          />
          <DayView />
          <MonthView />

          <EditRecurrenceMenu />
          <IntegratedEditing />
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
          />
          <AppointmentForm
            overlayComponent={appointmentForm}
            visible={state.editingFormVisible}
            onVisibilityChange={handleToggleEditingFormVisibility}
          />
          
          <DragDropProvider />        
        </Scheduler>

        <Dialog
          open={state.confirmationVisible}
          onClose={handleToggleConfirmationVisible}
        >
          <DialogTitle>
            Borrar turno
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Estas seguro que quieres borrar este turno?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToggleConfirmationVisible} color="primary" variant="outlined">
              Cancelar
            </Button>
            <Button onClick={handleCommitDeletedAppointment} color="secondary" variant="outlined">
              Borrar
            </Button>
          </DialogActions>
        </Dialog>

        <StyledFab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            setState({ editingFormVisible: true });
            handleOnEditingAppointmentChange(undefined);
            handleOnAddedAppointmentChange({
              startDate: new Date(state.currentDate).setHours(state.startDayHour),
              endDate: new Date(state.currentDate).setHours(state.startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </StyledFab>
      </Paper>
    )
}