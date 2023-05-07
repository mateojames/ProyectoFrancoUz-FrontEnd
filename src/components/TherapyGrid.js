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
import { connectProps } from '@devexpress/dx-react-core';

import { loadTherapies } from "../store/actions/loadTherapies.js"; 

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { updateTherapy } from "../store/actions/updateTherapy.js";
import { createTherapy } from "../store/actions/createTherapy.js"; 
import { deleteTherapy } from "../store/actions/deleteTherapy.js"; 

import { Alert, Snackbar } from "@mui/material";
import { Loading } from "./Loading/Loading.js";


const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Create new row"
    >
      Crear terapia
    </Button>
  </div>
);


const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Editar Terapia" size="large">
    <EditIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => {
  const handleCommitClicked = (e) => {
    console.log('clicked')
    onExecute()
  }
  return (<IconButton onClick={handleCommitClicked} title="Guardar los cambios" size="large">
    <SaveIcon />
  </IconButton>)
};

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancelar los cambios" size="large">
    <CancelIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Esta seguro que desea eliminar la terapia?')) {
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

const requiredRule = {
  isValid: value => value?.trim().length > 0,
  errorText: 'Este campo no puede estar vacío',
};
const numberRule = {
  isValid: value => value ? value.match(/^\d*[1-9]\d*$/) || value.match(/^\d+\.\d+$/) : false,
  errorText: 'Este campo debe contener solo números positivos',
};
const textRule = {
  isValid: value => value ? value.match(/^[a-zA-Z ]+$/)  : false,
  errorText: 'Este campo debe contener solo letras, numeros y/o espacios',
};
const validationRules = {
  name: [requiredRule, textRule],
};

const validate = (changed, validationStatus) => Object.keys(changed).reduce((status, id) => {
  let rowStatus = validationStatus[id] || {};
  if (changed[id]) {
    rowStatus = {
      ...rowStatus,
      ...Object.keys(changed[id]).reduce((acc, field) => {
        const invalidRule = validationRules[field].find((rule) => !rule.isValid(changed[id][field]));
        console.log(invalidRule)
        let fieldStatus = {}
        if(invalidRule){
          fieldStatus = {
              ...acc,
              [field]: {
                  isValid: false,
                  error: invalidRule.errorText,
              }
          }
        }else{
          fieldStatus = {
              ...acc,
              [field]: {
                  isValid: true,
                  error: '',
              }
          }
        }
        return fieldStatus;
      }, {}),
    };
  }

  return { ...status, [id]: rowStatus };
}, {});



export default function TherapyGrid(props) {
  const [columns] = useState([
    { name: 'name', title: 'Terapia' }
  ]);
  const therapies = useSelector(state => state.resource.therapies); //<-----------------------------------
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
        const validation = validate(changed, validationStatus)
        setValidationStatus({ ...validationStatus, ...validation });
        const validationValue = Object.values(validation)[0]
        if( validationValue && validationValue.name && validationValue.name.isValid){
          setLoading(true)
          dispatch(updateTherapy(changed, handleLoading))
        }
    }
    else if (added) {
      const validation = validate(added, validationStatus)
      setValidationStatus({ ...validationStatus, ...validation });
      const validationValue = Object.values(validation)[0]
      if( validationValue && validationValue.name && validationValue.name.isValid){
        setLoading(true)
        dispatch(createTherapy(added[0], handleLoading))
      }
    }
    else if (deleted) {
      const id = deleted[0]
      const data = {}
      data[id] = {deleted: true}
      setLoading(true)
      dispatch(deleteTherapy(data, handleLoading))
    }
  };
  

  const handleTherapiesToRows = () => {
    /*const therapiesToRender = therapies.filter(x => x.deleted === false)
    setRows(() => {
        return therapiesToRender.map((therapy) => { 
            return {
               ...therapy
            }
        })
    })*/
    setRows(therapies)
  }

  const handleLoading = () => {
    setLoading(false)
  };


  useEffect(() => {
    handleTherapiesToRows()
  }, [therapies]);

  useEffect(() => {
    setLoading(true)
    dispatch(loadTherapies(handleLoading))
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
