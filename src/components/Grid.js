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
  TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Input from '@mui/material/Input';
import { Loading } from './Loading/Loading.js';
import { styled } from '@mui/material/styles';
import { loadUsers } from '../store/actions/loadUsers';
import { editRole } from "../store/actions/editRole";


const PREFIX = 'Demo';
const classes = {
  lookupEditCell: `${PREFIX}-lookupEditCell`,
  dialog: `${PREFIX}-dialog`,
  inputRoot: `${PREFIX}-inputRoot`,
  selectMenu: `${PREFIX}-selectMenu`,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.lookupEditCell}`]: {
    padding: theme.spacing(1),
  },
  [`& .${classes.dialog}`]: {
    width: 'calc(100% - 16px)',
  },
  [`& .${classes.inputRoot}`]: {
    width: '100%',
  },
  [`& .${classes.selectMenu}`]: {
    position: 'absolute !important',
  },
}));

const dummyData = [
    {
        "id": 0,
        "email": "bartolome@gmail.com",
        "isVerified": false,
        "role": "Sin asignar"
    },
    {
        "id": 1,
        "email": "mateojames@gmail.com",
        "isVerified": true,
        "role": "Sin asignar"
    },
    {
        "id": 2,
        "email": "bartolome.meritello@gmail.com",
        "isVerified": true,
        "role": "profesional"
    }
];

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Create new row"
    >
      New
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row" size="large">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
    title="Delete row"
    size="large"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes" size="large">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes" size="large">
    <CancelIcon />
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

const availableValues = {
  role: ['profesional', 'paciente', 'Sin asignar']
};

const LookupEditCell = ({
  availableColumnValues, value, onValueChange,
}) => (
  <StyledTableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      MenuProps={{
        className: classes.selectMenu,
      }}
      input={(
        <Input
          classes={{ root: classes.inputRoot }}
        />
      )}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </StyledTableCell>
);

const EditCell = (props) => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
  }
  return <TableEditRow.Cell {...props} />;
};


const getRowId = row => row.id;

export default function UsersGrid(props) {
  const [columns] = useState([
    { name: 'email', title: 'Correo' },
    { name: 'isVerified', title: 'Cuenta verificada?' },
    { name: 'role', title: 'Rol' }
  ]);
  const rows = useSelector(state => state.user.users);
  const [editingStateColumnExtensions] = useState([
    { columnName: 'email', editingEnabled: false },
    { columnName: 'isVerified', editingEnabled: false }
  ]);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const commitChanges = (action) => {
    console.log(action)
    if(action.changed){
        if(Object.values(action.changed)[0].role){
            console.log('dispatch')
            setLoading(true)
            dispatch(editRole(action, handleLoading))
        }
    }
    //setRows(changedRows);
  };

  const handleLoading = () => {
    setLoading(false)
  };

  useEffect(() => {
    console.log('dispatch')
    setLoading(true)
    dispatch(loadUsers(handleLoading))
  }, []);

  /*useEffect(() => {
    setRows(data);
    console.log('setRows')
    setLoading(false)
  }, [data]);*/

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
          onCommitChanges={commitChanges}
          columnExtensions={editingStateColumnExtensions}
        />
        <SortingState
          defaultSorting={[]}
        />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow showSortingControls />
        <TableEditRow
          cellComponent={EditCell}
        />
        <TableEditColumn
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
        />
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
