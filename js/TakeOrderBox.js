import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";
import OrderBookInfo from "./OrderBookInfo/OrderBookInfo.js";
import * as OrderBookActions from "./OrderBookInfo/OrderBookActions.js";

import CoinInfo from "./CoinInfo/CoinInfo.js";

import PastTradeInfo from "./PastTradeInfo/PastTradeInfo.js";
import * as PastTradeActions from "./PastTradeInfo/PastTradeActions.js";

import AccountInfo from "./AccountInfo/AccountInfo.js";
import * as AccountActions from "./AccountInfo/AccountActions.js";

class Box extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			price: this.props.price,
			tokenAmount: this.props.amount,
			eosAmount: parseFloat(this.props.amount * this.props.price).toFixed(4),
			orderId: this.props.orderId,
			symbol: this.props.symbol,
			orderAmount: this.props.orderAmount,
			buy_or_sell: this.props.buy_or_sell
		}

		this.takeOrder = this.takeOrder.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleEosChange = this.handleEosChange.bind(this);
		this.handleTokenChange = this.handleTokenChange.bind(this);
	}

	takeOrder() {
		const transaction = {
			code: "exchangeb",
			action: "takeorder",
			from: AccountInfo.account.currentAccount,
			data: {
				taker_account: AccountInfo.account.currentAccount,
				target_token_contract: CoinInfo.coin.contract,
				amount_of_token: this.state.tokenAmount + " " + CoinInfo.coin.symbol,
				order_id: this.state.orderId,
				price: this.state.price
			}
		}
		AccountActions.handleTransaction(transaction);
	}

	handleEosChange(e) {
		this.setState({
			eosAmount: e.target.value / this.state.price <= this.state.orderAmount / this.state.price ? e.target.value : this.state.orderAmount * this.state.price,
			tokenAmount: e.target.value / this.state.price <= this.state.orderAmount / this.state.price ? e.target.value / this.state.price : e.target.value / this.state.orderAmount
		});
	}

	handleTokenChange(e) {
		this.setState({
			eosAmount: e.target.value <= this.state.orderAmount ? e.target.value * this.state.price : this.state.orderAmount * this.state.price,
			tokenAmount: e.target.value <= this.state.orderAmount ? e.target.value : this.state.orderAmount 
		})
	}

	handleClose() {
		this.props.openTakeOrder();
	}

	render() {
		return (
				<div>
					<div onClick={this.handleClose} class="cover"></div>
					<div class="take-trade-box">
	                    <div class="take-order-tit-div">
	                        <h3>{this.state.buy_or_sell == 0 ? "Buy Order" : "Sell Order"}</h3><h1 onClick={this.handleClose}>X</h1>
	                    </div>
	                    <div class="take-order-form">
	                        <div>
                                <h3 class="order-id-fill">Order Id: {this.state.orderId}</h3>
                                <h3 class="order-id-expiration">Price: {this.state.price} EOS/{this.state.symbol}</h3>
	                        </div>
	                        <form>
	                            <h3 class="amount-to-fill">Amount to {this.state.buy_or_sell == 0 ? "buy" : "sell" } - Order Size Max: {this.state.orderAmount} {this.state.symbol}</h3>
	                            <div>
	                                <input type="number" onChange={this.handleTokenChange} value={this.state.tokenAmount} max={this.state.orderAmount} step="any"/>
	                                <h3>{this.state.symbol}</h3>
	                            </div>
	                             <h3 class="amount-to-fill">Total EOS</h3>
	                            <div>
	                                <input type="number" onChange={this.handleEosChange} value={this.state.eosAmount} max={this.state.orderAmount * this.state.price} step="any"/>
	                                <h3>EOS</h3>
	                            </div>
	                        </form>
	                        <button class={this.state.buy_or_sell == 0 ? "fill-take-order-buy" : "fill-take-order-sell"} onClick={this.takeOrder}>{this.state.buy_or_sell == 0 ? "Buy Order" : "Sell Order"}</button>
	                        <button class="fill-take-order-cancel" onClick={this.handleClose}>Cancel</button>
	                    </div>
	                </div>
	            </div>
			)
	}
}

export default class TakeOrderBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			price: this.props.price,
			amount_of_token: this.props.tokenAmount,
			orderId: this.props.orderId,
			symbol: this.props.symbol
		}
	}

	render() {
		return (
				<Box openTakeOrder={this.props.openTakeOrder}
						price={this.state.price} 
						tokenAmount={this.state.amount_of_token}
						amount={this.state.amount_of_token}
						orderId={this.state.orderId}
						orderAmount={this.state.amount_of_token}
						symbol={this.state.symbol}
						buy_or_sell={this.props.buy_or_sell}/>
			)
	}
}

