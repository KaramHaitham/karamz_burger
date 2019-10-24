import React , {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGRIDIANT_PRICES = {
  salad : 0.8,
  bacon : 0.7,
  cheese : 0.5,
  meat : 1.3
};

class BurgerBuilder extends Component {
state = {
 ingridiants : {
  salad : 0,
  bacon : 0,
  cheese: 0,
  meat:0
 },
 totalPrice : 4,
 purchasable : false,
 purchasing : false
 
}

updatePurchaseState = (ingrediants)=>{
  const sum = Object.keys(ingrediants).map(igKey => {
    return ingrediants[igKey];
  }).reduce((sum , el)=>{
    return sum + el;
  },0);
  this.setState({purchasable : sum > 0})
}

addIngrediantHandeler = (type)=> {
  const oldCount = this.state.ingridiants[type];
  const updatedCount = oldCount + 1;
  const updatedIngrediant = {
    ...this.state.ingridiants
  };
  updatedIngrediant[type]= updatedCount;
  const priceAddition = INGRIDIANT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice + priceAddition;
  this.setState({ingridiants : updatedIngrediant , totalPrice : newPrice })
  this.updatePurchaseState(updatedIngrediant);
  
}

removeIngrediantHandeler = (type) => {
  const oldCount = this.state.ingridiants[type];
  if(oldCount <=0){
    return;
  }
  const updatedCount = oldCount -1;
  const updatedIngrediant = {
    ...this.state.ingridiants
  }
  updatedIngrediant[type] = updatedCount 

  const priceSubtraction = INGRIDIANT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceSubtraction;


  this.setState({totalPrice : newPrice , ingridiants : updatedIngrediant})
  this.updatePurchaseState(updatedIngrediant);
  
}

purchasingHandeler = () => {
  this.setState({purchasing : true})
}

cancelPurchasing = () =>{
  this.setState({purchasing : false})
}

continuePurchasing = () =>{
  alert('you continue !');
}

  render(){
    const disabeledInfo = {
      ...this.state.ingridiants
    };
    
    for ( let key in disabeledInfo){
      disabeledInfo[key] = disabeledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show ={this.state.purchasing} modalClosed ={this.cancelPurchasing}>
          <OrderSummary ingridiants = {this.state.ingridiants}
              continue = {this.continuePurchasing}
              cancel = {this.cancelPurchasing}
              totalPriceSummary = {this.state.totalPrice}
          />
        </Modal>
        <Burger ingridiants= {this.state.ingridiants}/>
        <Buildcontrols  addIngrediant={this.addIngrediantHandeler}
           removeIngrediant={this.removeIngrediantHandeler}
           disabeled={disabeledInfo}
           price ={this.state.totalPrice}
           purchasable = {this.state.purchasable}
           ordered = {this.purchasingHandeler}
           ></Buildcontrols>
      </Aux>
    );
  }
}

export default BurgerBuilder;