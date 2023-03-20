import React, { useState } from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import { useHistory } from "react-router-dom"
import { MenuList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { filterData } from "../store/actions/filterData";


const categorys = [{ id: 1, name: 'Profesional' },
{ id: 2, name: 'Paciente' },
]

export default function FilterMenu(props) {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [category, setCategory] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [optionSelected, setOptionSelected] = useState(null);

    const onCategoryFieldChange = (event, newValue) => {
        setCategory(newValue || null);
    };

    const onOptionFieldChange = (event, newValue) => {
        setOptionSelected(newValue || null);
    };

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (optionSelected) {
            props.setFilters((previousState) => previousState.concat({...optionSelected, category: category.name}))
        }
    }, [optionSelected]);

    useEffect(() => {
        if (category) {
            if (category.name === 'Profesional') {
                setCategoryOptions(props.professionals)
            } else if (category.name === 'Paciente') {
                setCategoryOptions(props.patients)
            }
        } else {
            setCategoryOptions([])
        }
    }, [category]);

    var items = (<MenuList>
        <MenuItem >

            <Autocomplete

                disablePortal
                id="combo-box-demo"
                options={categorys}
                fullWidth
                sx={{ mt: 1 }}
                value={category || null}
                onChange={onCategoryFieldChange}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label='Filtrar por...' />}
            />
        </MenuItem>
        <MenuItem >

            <Autocomplete
                disabled={!(categoryOptions.length > 0)}
                disablePortal
                id="combo-box-demo"
                options={categoryOptions}
                fullWidth
                sx={{ mt: 1, width: 200 }}
                value={optionSelected || ''}
                onChange={onOptionFieldChange}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label={category ? category.name : 'Filtro'} />}
            />
        </MenuItem>

    </MenuList>)


    return (
        <Menu
            anchorEl={props.anchorEl}
            id="account-menu"
            open={props.open}
            onClose={props.handleClose}
            sx={{ width: windowSize.innerWidth }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {items}
        </Menu>
    );
}
