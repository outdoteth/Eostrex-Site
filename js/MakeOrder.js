import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

import AccountInfo from "./AccountInfo/AccountInfo.js";
import * as AccountActions from "./AccountInfo/AccountActions.js";

import CoinInfo from "./CoinInfo/CoinInfo.js";

class BuyBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceSetter: 0,
			amountSetter: null,
			totalSetter: null
		}

		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleTotalChange = this.handleTotalChange.bind(this);
		this.handlePercentageClick = this.handlePercentageClick.bind(this);
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

	handleTotalChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: prevState.priceSetter, 
												amountSetter: newValue / prevState.priceSetter,
												totalSetter: newValue
											})});
	}

	handlePercentageClick(event) {
		const percentage = event.target.value;
		this.setState((prevState)=>{
			return({
					priceSetter: prevState.priceSetter,
					amountSetter: ((percentage * AccountInfo.account.wallet.eosBalance) / prevState.priceSetter).toFixed(4),
					totalSetter: (AccountInfo.account.wallet.tokenBalance * percentage).toFixed(4)
				})
		});
		console.log(this.state);
	}

	handleBuyTx() {
		const buyTx = {
			actions: [
					{
						account: /* the smart contract */null,
						name: /* the smart contract makeorder action */null,
						authorization: [{
						  actor: AccountInfo.account.currentAccount,
						  permission: 'active'
						}],
						data: /*the data needed to make the order */null
					}
				]
		}
		AccountActions.handleBuySell()
	}

	render() {
		return (
				<div class="buy-form-div">
		                <div><h3 class="buy-token-title">Buy {CoinInfo.coin.symbol}</h3></div>
		                <form class="buy-form">
		                    <div><label>Price:</label><input onChange={this.handlePriceChange} placeholder={"0.000 EOS/" + CoinInfo.coin.symbol} class="buy-input"type="text"></input></div>
		                    <div><label>Amount:</label><input onChange={this.handleAmountChange} value={this.state.amountSetter} type="text" placeholder={"0.000 " + CoinInfo.coin.symbol} class="buy-input"></input></div>
		                    <div>
		                        <button onClick={this.handlePercentageClick} value={1.00} type="button">100%</button>
		                        <button onClick={this.handlePercentageClick} value={0.75} type="button">75%</button>
		                        <button onClick={this.handlePercentageClick} value={0.50} type="button">50%</button>
		                        <button onClick={this.handlePercentageClick} value={0.25} type="button">25%</button>
		                    </div>
		                    <div><label>Total:</label><input type="text" onChange={this.handleTotalChange} placeholder="0.000 EOS" value={this.state.totalSetter} class="buy-input"></input></div>
		                    <input class="buy-sell-but" type="submit" value="Buy"></input>
		                </form>
		        </div>
			)
	}
}

class SellBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceSetter: 0,
			amountSetter: null,
			totalSetter: null
		}

		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleTotalChange = this.handleTotalChange.bind(this);
		this.handlePercentageClick = this.handlePercentageClick.bind(this);
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

	handleTotalChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: prevState.priceSetter, 
												amountSetter: newValue * prevState.priceSetter,
												totalSetter: newValue
											})});
	}

	handlePercentageClick(event) {
		const percentage = event.target.value;
		this.setState((prevState)=>{
			return({
					priceSetter: prevState.priceSetter,
					amountSetter: (AccountInfo.account.wallet.tokenBalance * percentage).toFixed(4),
					totalSetter: ((percentage * AccountInfo.account.wallet.tokenBalance) * prevState.priceSetter).toFixed(4)
				})
		});
		console.log(this.state);
	}

	handleBuyTx() {
		const buyTx = {
			actions: [
					{
						account: /* the smart contract */null,
						name: /* the smart contract makeorder action */null,
						authorization: [{
						  actor: AccountInfo.account.currentAccount,
						  permission: 'active'
						}],
						data: /*the data needed to make the order */null
					}
				]
		}
		AccountActions.handleBuySell()
	}

	render() {
		return (
				<div id="sell-form-form">
	                <div class="buy-form-div">
	                	<div><h3 class="buy-token-title">Sell {CoinInfo.coin.symbol}</h3></div>
		                <form class="buy-form">
		                    <div><label>Price:</label><input onChange={this.handlePriceChange} placeholder={"0.000 EOS/"+CoinInfo.coin.symbol} class="buy-input"type="text"></input></div>
		                    <div><label>Amount:</label><input onChange={this.handleAmountChange} value={this.state.amountSetter} type="text" placeholder={"0.000 " + CoinInfo.coin.symbol} class="buy-input"></input></div>
		                    <div>
		                        <button onClick={this.handlePercentageClick} value={1.00} type="button">100%</button>
		                        <button onClick={this.handlePercentageClick} value={0.75} type="button">75%</button>
		                        <button onClick={this.handlePercentageClick} value={0.50} type="button">50%</button>
		                        <button onClick={this.handlePercentageClick} value={0.25} type="button">25%</button>
		                    </div>
		                    <div><label>Total:</label><input type="text" onChange={this.handleTotalChange} placeholder="0.000 EOS" value={this.state.totalSetter} class="buy-input"></input></div>
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