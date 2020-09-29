import React from 'react';
import classes from './Burger.css'
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant'

const burger = (props) => {

  let transformedIngrediant = Object.keys(props.ingridiants).map(igKey => {
    return [...Array( props.ingridiants[igKey] )].map((_,i)=>{
      return <BurgerIngrediant key={igKey+i} type={igKey}/>
    })
  }).reduce((accumelatorArray,currentArray)=>{
    return accumelatorArray.concat(currentArray)
  },[]);

  if(transformedIngrediant.length ===0){
    transformedIngrediant = <p>Start chosing ingrediants!</p>
  }



  return (
    <div className={classes.Burger}>
        <BurgerIngrediant type="bread-top"/>
        {transformedIngrediant}
        <BurgerIngrediant type="bread-bottom"/>
    </div>
  );
}

export default burger;