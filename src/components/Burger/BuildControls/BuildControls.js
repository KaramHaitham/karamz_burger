import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
  {label: 'Salad' , type : 'salad'},
  {label: 'Bacon' , type : 'bacon'},
  {label: 'Cheese' , type : 'cheese'},
  {label: 'Meat' , type : 'meat'},
 
 
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
      <p><strong>Current price : {props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl  key={ctrl.label} 
          added = {() => props.addIngrediant(ctrl.type)}
          removed = {() => {props.removeIngrediant(ctrl.type)}}    
          label={ctrl.label}
          disable = {props.disabeled[ctrl.type]} />
    ))}
    <button className={classes.OrderButton} disabled={!props.purchasable}
      onClick={props.ordered}
    >ORDER NOW</button>
  </div>
  
);

export default buildControls