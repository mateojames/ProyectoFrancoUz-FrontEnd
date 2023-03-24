import React, {useState, useEffect  } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import {
    EditingState,
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
    TableEditRow,
    TableEditColumn,
    PagingPanel,
    Toolbar,
    SearchPanel,
    TableFilterRow,
    TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';

import { loadLocations } from "../store/actions/loadLocations"; 

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { updateLocation } from "../store/actions/updateLocation.js";
import { createLocation } from "../store/actions/createLocation.js"; 
import { deleteLocation } from "../store/actions/deleteLocation.js"; 

import { Alert, Snackbar } from "@mui/material";
import { Loading } from "./Loading/Loading.js";


const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Create new row"
    >
      Crear sala
    </Button>
  </div>
);


const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Editar Sala" size="large">
    <EditIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Guardar los cambios" size="large">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancelar los cambios" size="large">
    <CancelIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Esta seguro que desea eliminar la sala?')) {
        onExecute();
      }
    }}
    title="Delete row"
    size="large"
  >
    <DeleteIcon />
  </IconButton>
);


const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const getRowId = row => row.id;


const EditCell = (props) => {
    return <TableEditRow.Cell {...props} />;
  };

const FilterCell = (props) => {
  return <TableFilterRow.Cell {...props} />;
};



export default function LocationGrid(props) {
  const [columns] = useState([
    { name: 'name', title: 'Sala' }
  ]);
  const locations = useSelector(state => state.resource.locations); //<-----------------------------------
  const [rows, setRows] = useState([])
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const dispatch = useDispatch();
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [validationStatus, setValidationStatus] = useState({});
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [editingStateColumnExtensions] = useState([]);

  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'name', width: window.innerWidth/(columns.length + 1.5)}
  ])


  const commitChanges = ({changed, added, deleted}) => {
    if (changed) {
        setLoading(true)
        dispatch(updateLocation(changed, handleLoading))
    }
    else if (added) {
        setLoading(true)
        dispatch(createLocation(added[0], handleLoading))
    }
    else if (deleted) {
      const id = deleted[0]
      const data = {}
      data[id] = {deleted: true}
      setLoading(true)
      dispatch(deleteLocation(data, handleLoading))
    }
  };
  

  const handleLocationsToRows = () => {
    /*const locationsToRender = locations.filter(x => x.deleted === false)
    setRows(() => {
        return locationsToRender.map((location) => { 
            return {
               ...location
            }
        })
    })*/
    setRows(locations)
  }

  const handleLoading = () => {
    setLoading(false)
  };


  useEffect(() => {
    handleLocationsToRows()
  }, [locations]);

  useEffect(() => {
    setLoading(true)
    dispatch(loadLocations(handleLoading))
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setColumnWidths(
        [
            { columnName: 'name', width: window.innerWidth/(columns.length + 1.5)}
        ]);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  
  const Cell = React.useCallback((props) => {
    const { tableRow: { rowId }, column: { name: columnName } } = props;
    const columnStatus = validationStatus[rowId]?.[columnName];
    const valid = !columnStatus || columnStatus.isValid;
    const style = {
      ...(!valid ? { border: '1px solid red' } : null),
    };
    const title = valid ? '' : validationStatus[rowId][columnName].error;
    if(title){setError(title)}
    return (
      <Table.Cell
        {...props}
        style={style}
        title={title}
      />
    );
  }, [validationStatus]);


  return (
    <Paper>
      <Grid
        rows={rows}
        locale='es-ES'
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
        <EditingState
             editingRowIds={editingRowIds}
             onEditingRowIdsChange={setEditingRowIds}
             rowChanges={rowChanges}
             onRowChangesChange={setRowChanges}
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions}
        />
        <SortingState
          defaultSorting={[]}
        />
        <IntegratedSorting />
        <Table
          cellComponent={Cell}
        />
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        />
        <TableHeaderRow showSortingControls />
        <TableEditRow
          cellComponent={EditCell}
        />
        <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
        />
        <Toolbar />
        <PagingPanel
          pageSizes={pageSizes}
        />
        <SearchPanel />
        <TableFilterRow
          cellComponent={FilterCell}
        />
      </Grid>
      {error && <Snackbar
      autoHideDuration={10000}
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        open={error ? true : false}
        onClose={() => setError('')}
        sx={{ width: '60%' }}
      >
         <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
        </Snackbar>}
        {loading && <Loading />}
    </Paper>
  );
}
