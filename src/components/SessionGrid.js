import React, {useState, useEffect  } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import {
  PagingState,
  IntegratedPaging,
  SearchState,
  FilteringState,
  SortingState,
  IntegratedSorting,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  SearchPanel,
  TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';
import { Loading } from './Loading/Loading.js';
import { loadAppointments } from "../store/actions/loadAppointments";
import { loadLocations, loadTherapies } from "../store/actions/resources.js";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from "react-router-dom";

const getRowId = row => row.id;

const Cell = (props) => {
  console.log('Cel ', props)
  const { column } = props;
  if (column.name === 'link') {
    return <Link
    to={{
      pathname: "/calendar",
      state: props.row
    }}
  ><OpenInNewIcon/></Link>;
  }
  return <Table.Cell {...props} />;
};

export default function SessionsGrid(props) {
  const [columns] = useState([
    { name: 'title', title: 'Titulo' },
    { name: 'therapy', title: 'Terapia' },
    { name: 'patient', title: 'Paciente' },
    { name: 'professional', title: 'Profesional' },
    { name: 'location', title: 'Ubicación' },
    { name: 'date', title: 'Fecha de inicio' },
    { name: 'isRecurrent', title: '¿Es recurrente?' },
    { name: 'link', title: 'Link'}
  ]);
  const [rows, setRows] = useState([]);
  const appointments = useSelector(state => state.calendar.appointments);
  const therapies = useSelector(state => state.resource.therapies);
  const locations = useSelector(state => state.resource.locations);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const handleLoading = () => {
    setLoading(false)
  };

  const handleAppointmentsToRows = () => {
    console.log('terapias ', therapies)
    console.log('locations ', locations)
    console.log('sesiones ', appointments)


    setRows(() => {
      return appointments.map((appointment) => {
      const therapy = therapies.find((therapy)=> therapy.id == appointment.therapy)
      const location = locations.find((location)=> location.id == appointment.location)
      return {
        ...appointment,
        therapy: therapy ? therapy.name : 'No encontrada',
        location: location ? location.name : 'No encontrada',
        patient: appointment.patient.name,
        professional: appointment.professional.name
      }
    })
  })
    console.log('rows ', rows)
  }

  useEffect(() => {
    console.log('dispatch')
    setLoading(true)
    dispatch(loadAppointments(handleLoading))
    dispatch(loadTherapies())
    dispatch(loadLocations())
  }, []);

  useEffect(() => {
    handleAppointmentsToRows()
  }, [appointments, locations, therapies]);


  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <PagingState
          defaultCurrentPage={0}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <SearchState />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <IntegratedPaging />
        <SortingState
          defaultSorting={[]}
        />
        <IntegratedSorting />
        <Table
          cellComponent={Cell}
        />
        <TableHeaderRow showSortingControls />
        <Toolbar />
        <PagingPanel
          pageSizes={pageSizes}
        />
        <SearchPanel />
        <TableFilterRow />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};
