import React, { useEffect } from "react"
import { Modal} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from "../store/actions/modal";



export default function FullBModal(props) {
  const show = useSelector(state => state.modal.show);
  const dispatch = useDispatch()

  useEffect(() => {
    //Runs only on the first render
    dispatch(hideModal())
  }, []);


  return (
      <Modal show={show} centered onHide={props.handleModalClose} >
        <Modal.Body>
          {props.form}
        </Modal.Body>
      </Modal>
  )
}
