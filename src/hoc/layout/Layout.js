import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer : false
  }

  sideDrawerClosedHandeler = () => {
    this.setState({showSideDrawer : false});
  }

  sideDrawerToggleHandeler = () => {
    this.setState((prevState)=> {
      return {showSideDrawer : !prevState.showSideDrawer};

    })
  }


  render() {
    return (
      <Aux>
        <ToolBar layoutToggle= {this.sideDrawerToggleHandeler} />
        <SideDrawer closed ={this.sideDrawerClosedHandeler} open={this.state.showSideDrawer}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
