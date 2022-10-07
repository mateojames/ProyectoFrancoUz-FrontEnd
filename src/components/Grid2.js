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
import { styled } from '@mui/material/styles';
import { loadUsers } from '../store/actions/loadUsers';

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

export default function Grid2(){
  const [columns] = useState([
    { name: 'email', title: 'Name' },
    { name: 'isVerified', title: 'Gender' },
    { name: 'role', title: 'City' }  ]);

  const dummyData = [{id:0, email:'hola',isVerified: 'true', role:'paciente'}]
  const [rows] = useState(dummyData);
  const [editingStateColumnExtensions] = useState([
    { columnName: 'email', editingEnabled: false },
  ]);
  const [pageSize, setPageSize] = useState(0);
  const [pageSizes] = useState([5, 10, 0]);
  const dispatch = useDispatch();

  const commitChanges = (action) => {
    console.log(action)
    /*let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);*/
  };

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    </Paper>
  );
};
