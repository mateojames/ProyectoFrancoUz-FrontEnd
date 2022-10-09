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

const getRowId = row => row.id;

export default function SessionsGrid(props) {
  const [columns] = useState([
    { name: 'title', title: 'Titulo' },
    { name: 'therapy', title: 'Terapia' },
    { name: 'patient', title: 'Paciente' },
    { name: 'professional', title: 'Profesional' },
    { name: 'date', title: 'Fecha de inicio' },
    { name: 'isRecurrent', title: '¿Es recurrente?' }
  ]);
  const rows = useSelector(state => state.calendar.appointments);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const handleLoading = () => {
    setLoading(false)
  };

  useEffect(() => {
    console.log('dispatch')
    setLoading(true)
    dispatch(loadAppointments(handleLoading))
  }, []);


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
        <Table />
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
