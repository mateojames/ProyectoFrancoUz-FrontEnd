import React, { useState } from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuList } from "@mui/material";
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect } from "react";



const categorys = [{ id: 1, name: 'Profesional' },
{ id: 2, name: 'Paciente' },
{ id: 3, name: 'Sala' },
{ id: 4, name: 'Terapia' },
{ id: 5, name: 'Estado'}
]

const states = [{ id: 'active', name: 'Activa' },
{ id: 'cancelled', name: 'Cancelada' },
{ id: 'finalized', name: 'Finalizada' }
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
        if (optionSelected && !props.filters.map(f => f.id).includes(optionSelected.id)) {
            props.setFilters((previousState) => previousState.concat({...optionSelected, category: category.name}))
        }
    }, [optionSelected]);

    useEffect(() => {
        if (category) {
            if (category.name === 'Profesional') {
                setCategoryOptions(props.professionals)
            } else if (category.name === 'Paciente') {
                setCategoryOptions(props.patients)
            } else if (category.name === 'Sala') {
                setCategoryOptions(props.locations)
            } else if (category.name === 'Terapia') {
                setCategoryOptions(props.therapies)
            } else if (category.name === 'Estado') {
                setCategoryOptions(states)
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
