import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingrediantsSummary = Object.keys(props.ingridiants)
        .map(inKey =>{
          return <li key={inKey}>
            <span style={{textTransform:'capitalize'}}>{inKey}</span> : {props.ingridiants[inKey]}
            </li>
        });

  return(
    <Aux>
      <h3>Your Order</h3>
      <p>A delecious burger with the following ingrediants:</p>
      <ul>
        {ingrediantsSummary}
      </ul>
      <p><strong>Total price: {props.totalPriceSummary.toFixed(2)} €</strong></p>
      <p>Continue to checkout? </p>
      <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
      <Button btnType='Success'clicked={props.continue}>CONTINUE</Button>
    </Aux>
  );
}

export default orderSummary