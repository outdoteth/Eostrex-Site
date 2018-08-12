import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

class BuyBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceSetter: 0,
			amountSetter: 0,
			totalSetter: 0
		}

		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleTotalChange = this.handleTotalChange.bind(this);
	}

	handlePriceChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: newValue, 
												amountSetter: prevState.amountSetter,
												totalSetter: newValue * prevState.amountSetter
											})});
	}

	handleAmountChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: prevState.priceSetter, 
												amountSetter: newValue,
												totalSetter: newValue * prevState.priceSetter
											})});
	}

	handleTotalChange() {

	}

	render() {
		return (
				<div class="buy-form-div">
		                <div><h3 class="buy-token-title">Buy Karma</h3></div>
		                <form class="buy-form">
		                    <div><label>Price:</label><input onChange={this.handlePriceChange} placeholder="0.000 EOS/Karma" class="buy-input"type="text"></input></div>
		                    <div><label>Amount:</label><input onChange={this.handleAmountChange} type="text" placeholder="0.000 Karma" class="buy-input"></input></div>
		                    
		                    <div><label>Total:</label><input type="text" placeholder="0.000 EOS" value={this.state.totalSetter} class="buy-input"></input></div>
		                    <input class="buy-sell-but" type="submit" value="Buy"></input>
		                </form>
		        </div>
			)
	}
}

class SellBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div id="sell-form-form">
	                <div class="buy-form-div">
	                	<div><h3 class="buy-token-title">Sell Karma</h3></div>
		                <form class="buy-form">
		                    <div><label>Price:</label><input placeholder="0.000 EOS/Karma" class="buy-input"type="text"></input></div>
		                    <div><label>Amount:</label><input type="text" placeholder="0.000 Karma" class="buy-input"></input></div>
		                    
		                    <div><label>Total:</label><input type="text" placeholder="0.000 EOS" class="buy-input"></input></div>
		                    <input class="buy-sell-but-sell" type="submit" value="Sell"></input>
		                </form>
	            	</div>
		        </div>
			)
	}	
}

export default class MakeOrder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div id="buy-sell">
					<BuyBox/>
					<SellBox/>
				</div>
			)
	}
}