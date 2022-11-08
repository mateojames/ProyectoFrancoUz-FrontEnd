import React, { useEffect } from "react"
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from "../store/actions/modal";
import { Box } from "@mui/material";



export default function FullModal(props) {
  const show = useSelector(state => state.modal.show);
  const dispatch = useDispatch()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4
  };

  useEffect(() => {
    //Runs only on the first render
    dispatch(hideModal())
  }, []);

  return (
      <Modal open={show} onClose={props.handleModalClose}>
         <Box sx={style}>
          {props.form}
          </Box>
      </Modal>
  )
}
