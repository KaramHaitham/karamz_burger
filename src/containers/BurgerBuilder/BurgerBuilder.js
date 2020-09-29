import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import Buildcontrols from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandeler/withErrorHandeler'

const INGRIDIANT_PRICES = {
  salad: 0.8,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingridiants: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    spinner: false
  };
  //getting ingrediants from API
  componentDidMount(){
    axios.get('https://karamz-burger.firebaseio.com/ingrediants.json')
    .then(response =>{
      this.setState({ingridiants : response.data})
    })
    .catch(err =>{
      console.log(err)
    }) 
  }

  updatePurchaseState = ingrediants => {
    const sum = Object.keys(ingrediants)
      .map(igKey => {
        return ingrediants[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngrediantHandeler = type => {
    const oldCount = this.state.ingridiants[type];
    const updatedCount = oldCount + 1;
    const updatedIngrediant = {
      ...this.state.ingridiants
    };
    updatedIngrediant[type] = updatedCount;
    const priceAddition = INGRIDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingridiants: updatedIngrediant, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngrediant);
  };

  removeIngrediantHandeler = type => {
    const oldCount = this.state.ingridiants[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngrediant = {
      ...this.state.ingridiants
    };
    updatedIngrediant[type] = updatedCount;

    const priceSubtraction = INGRIDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;

    this.setState({ totalPrice: newPrice, ingridiants: updatedIngrediant });
    this.updatePurchaseState(updatedIngrediant);
  };

  purchasingHandeler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchasing = () => {
    this.setState({ purchasing: false });
  };

  continuePurchasing = () => {
    //alert('you continue !');
    this.setState({ spinner: true });

    const order = {
      ingrediants: this.state.ingridiants,
      price: this.state.totalPrice,
      customer: {
        name: "Karam",
        adress: {
          street: "Rue de Valois",
          codePostal: "75001",
          country: "France"
        },
        email: "karamflyy@gmail.com  "
      },
      deleveryMethod: "Fast Deleviry"
    };

    axios
      .post("/order.json", order)
      .then(response => {
        this.setState({ spinner: false, purchasing: false });
      })
      .catch(err => {
        this.setState({ spinner: false, purchasing: false });
      });
  };

  

  render() {
    const disabeledInfo = {
      ...this.state.ingridiants
    };

    for (let key in disabeledInfo) {
      disabeledInfo[key] = disabeledInfo[key] <= 0;
    }

    let orderSummary = null
    
    
    //show spinner if no ingredients not found
    let burger = <Spinner />
    if (this.state.ingridiants){
    burger = (<Aux>
      <Burger ingridiants={this.state.ingridiants} />
        <Buildcontrols
          addIngrediant={this.addIngrediantHandeler}
          removeIngrediant={this.removeIngrediantHandeler}
          disabeled={disabeledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchasingHandeler}
        ></Buildcontrols>
    </Aux>);
    orderSummary = (
      <OrderSummary
        ingridiants={this.state.ingridiants}
        continue={this.continuePurchasing}
        cancel={this.cancelPurchasing}
        totalPriceSummary={this.state.totalPrice}
      />
    );
    }
    if (this.state.spinner) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder);
