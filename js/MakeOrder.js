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
			priceSetter: null,
			amountSetter: null,
			totalSetter: null
		}

		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleTotalChange = this.handleTotalChange.bind(this);
		this.handlePercentageClick = this.handlePercentageClick.bind(this);
		this.handleBuyTx = this.handleBuyTx.bind(this);
	}

	handlePriceChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: newValue, 
												amountSetter: prevState.amountSetter,
												totalSetter: prevState.amountSetter ? (newValue * prevState.amountSetter).toFixed(3) : (0).toFixed(3)
											})});
	}

	handleAmountChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: prevState.priceSetter, 
												amountSetter: newValue,
												totalSetter: (newValue * prevState.priceSetter).toFixed(3)
											})});
	}

	handleTotalChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: prevState.priceSetter, 
												amountSetter: (newValue / prevState.priceSetter).toFixed(3),
												totalSetter: newValue
											})});
	}

	handlePercentageClick(event) {
		const percentage = event.target.value;
		this.setState((prevState)=>{
			return({
					priceSetter: prevState.priceSetter,
					amountSetter: ((percentage * AccountInfo.account.contract.eosBalance) / prevState.priceSetter).toFixed(3),
					totalSetter: (AccountInfo.account.contract.eosBalance * percentage).toFixed(3)
				})
		});
		console.log(this.state);
	}

	handleBuyTx() {
		const buyTx = {
			code: "exchangeb",
			action: "makeorder",
			from: AccountInfo.account.currentAccount,
			data: {
				maker_account: AccountInfo.account.currentAccount,
				target_token_contract: CoinInfo.coin.contract,
				amount_of_token: parseFloat(this.state.amountSetter).toFixed(3) + " " + CoinInfo.coin.symbol,
				buy_or_sell: 1,
				price: parseFloat(this.state.priceSetter).toFixed(8)
			}
		}
		AccountActions.handleTransaction(buyTx);
	}

	render() {
		return (
				<div class="buy-form-div">
		                <div><h3 class="buy-token-title">Buy {CoinInfo.coin.symbol}</h3></div>
		                <form class="buy-form" onSubmit={this.handleBuyTx}>
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
			priceSetter: null,
			amountSetter: null,
			totalSetter: null
		}

		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleTotalChange = this.handleTotalChange.bind(this);
		this.handlePercentageClick = this.handlePercentageClick.bind(this);
		this.handleSellTx = this.handleSellTx.bind(this);
	}

	handlePriceChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: newValue, 
												amountSetter: prevState.amountSetter,
												totalSetter: prevState.amountSetter ? (newValue * prevState.amountSetter).toFixed(3) : (0).toFixed(3)
											})});
	}

	handleAmountChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: prevState.priceSetter, 
												amountSetter: newValue,
												totalSetter: (newValue * prevState.priceSetter).toFixed(3)
											})});
	}

	handleTotalChange(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({	priceSetter: prevState.priceSetter, 
												amountSetter: (newValue * prevState.priceSetter).toFixed(3),
												totalSetter: newValue
											})});
	}

	handlePercentageClick(event) {
		const percentage = event.target.value;
		this.setState((prevState)=>{
			return({
					priceSetter: prevState.priceSetter,
					amountSetter: (AccountInfo.account.contract.tokenBalance * percentage).toFixed(3),
					totalSetter: ((percentage * AccountInfo.account.contract.tokenBalance) * prevState.priceSetter).toFixed(3)
				})
		});
		console.log(this.state);
	}

	handleSellTx() {
		const sellTx = {
			code: "exchangeb",
			action: "makeorder",
			from: AccountInfo.account.currentAccount,
			data: {
				maker_account: AccountInfo.account.currentAccount,
				target_token_contract: CoinInfo.coin.contract,
				amount_of_token: parseFloat(this.state.amountSetter).toFixed(3) + " " + CoinInfo.coin.symbol,
				buy_or_sell: 0,
				price: parseFloat(this.state.priceSetter).toFixed(8)
			}
		}
		console.log(sellTx.data.price);
		AccountActions.handleTransaction(sellTx);
	}

	render() {
		return (
				<div id="sell-form-form">
	                <div class="buy-form-div">
	                	<div><h3 class="buy-token-title">Sell {CoinInfo.coin.symbol}</h3></div>
		                <form class="buy-form" onSubmit={this.handleSellTx}>
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