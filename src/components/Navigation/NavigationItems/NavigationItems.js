import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = ()=>(
  <ul className={classes.NavigationItems}>
    <NavigationItem link="./" isActive={true} >Burger Builder</NavigationItem>
    <NavigationItem link="./">Ckechout</NavigationItem>
  </ul>
);

export default navigationItems