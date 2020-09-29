import React from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandeler = (WrappedComponent) => {
  return (props) => {
    return ( <Aux>
      <Modal >
        somthing went wrong ....
      </Modal>
      <WrappedComponent {...props}/>
    </Aux>);
  }
}

export default withErrorHandeler;

