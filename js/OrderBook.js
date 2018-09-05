import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";
import OrderBookInfo from "./OrderBookInfo/OrderBookInfo.js";
import * as OrderBookActions from "./OrderBookInfo/OrderBookActions.js";

import PastTradeInfo from "./PastTradeInfo/PastTradeInfo.js";
import * as PastTradeActions from "./PastTradeInfo/PastTradeActions.js";

import AccountInfo from "./AccountInfo/AccountInfo.js";

import TakeOrderBox from "./TakeOrderBox.js";


class BuyOrderLi extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			amount_of_token: this.props.amount_of_token,
			buy_or_sell: this.props.buy_or_sell,
			expiration_date: this.props.expiration_date,
			maker_account: this.props.maker_account,
			order_id: this.props.order_id,
			price: this.props.price,
			target_token_contract: this.props.target_token_contract,
			symbol: this.props.symbol,
			isClicked: false
		}
		
		this.openTakeOrder = this.openTakeOrder.bind(this);
	}

	componentWillMount() {
		AccountInfo.on("TRANSACTION_MADE", ()=>{this.setState({isClicked: false})})
	}

	openTakeOrder() {
		this.setState((prevState) => {
			return {isClicked: !prevState.isClicked}
		});
	}

	render() {
		const renderBox = this.state.isClicked ? <TakeOrderBox 	openTakeOrder={this.openTakeOrder} 
																price={this.state.price} 
																tokenAmount={this.state.amount_of_token}
																orderId={this.state.order_id}
																symbol={this.state.symbol}
																buy_or_sell="1" /> : "";
		return (
				<li>
					{renderBox}
	                <div onClick={this.openTakeOrder}>
	                    <h3 class="price2">{this.state.price}</h3>
	                    <h3 class="amount1">{this.state.amount_of_token}</h3>
	                    <div class="total1">
	                        <h3>{(this.state.amount_of_token * this.state.price).toFixed(4)}</h3>
	                    </div>
	                </div>
	            </li>
			)
	}
}

class SellOrderLi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			amount_of_token: this.props.amount_of_token,
			buy_or_sell: this.props.buy_or_sell,
			expiration_date: this.props.expiration_date,
			maker_account: this.props.maker_account,
			order_id: this.props.order_id,
			price: this.props.price,
			target_token_contract: this.props.target_token_contract,
			symbol: this.props.symbol,
			isClicked: false
		}

		this.openTakeOrder = this.openTakeOrder.bind(this);
	}

	componentWillMount() {
		AccountInfo.on("TRANSACTION_MADE", ()=>{this.setState({isClicked: false})})
	}

	openTakeOrder() {
		this.setState((prevState) => {
			return {isClicked: !prevState.isClicked}
		})
	}

	render() {
		const renderBox = this.state.isClicked ? <TakeOrderBox 	openTakeOrder={this.openTakeOrder} 
																price={this.state.price} 
																tokenAmount={this.state.amount_of_token}
																orderId={this.state.order_id}
																symbol={this.state.symbol}
																buy_or_sell="0" /> : "";
		return (
				<li>
					{renderBox}
                    <div onClick={this.openTakeOrder}>
                        <h3 class="price1">{this.state.price}</h3>
                        <h3 class="amount1">{this.state.amount_of_token}</h3>
                        <div class="total1">
                            <h3>{(this.state.amount_of_token * this.state.price).toFixed(4)}</h3>
                        </div>
                    </div>
                </li>
			)
	}
}


class OrderBook extends React.Component {
	constructor(props) {
		super(props);

		this.setOrders = this.setOrders.bind(this);
		this.state = {
			buyOrders: OrderBookInfo.buyOrders,
			sellOrders: OrderBookInfo.sellOrders,
			lastPrice: this.props.lastPrice,
			secondLastPrice: this.props.secondLastPrice
		}
		this.updateTrades = this.updateTrades.bind(this);
	}

	componentWillMount() {
		OrderBookInfo.on( "ORDERS_UPDATED", this.setOrders );
		PastTradeInfo.on("CACHED_TRADES_UPDATED", this.updateTrades);
	}

	updateTrades() {
		console.log("ASDASDASDASD");
		console.log(PastTradeInfo.cachedTrades);
		this.setState({
			buyOrders: OrderBookInfo.buyOrders,
			sellOrders: OrderBookInfo.sellOrders,
			lastPrice: parseFloat(PastTradeInfo.cachedTrades[0].data.price).toFixed(7),
			secondLastPrice: PastTradeInfo.cachedTrades[1] ? parseFloat(PastTradeInfo.cachedTrades[1].data.price).toFixed(7) : 0
		})
	}

	setOrders() {
		this.setState((prevState) => {
			console.log(prevState);
			return ({
				buyOrders: OrderBookInfo.buyOrders,
				sellOrders: OrderBookInfo.sellOrders,
				lastPrice: prevState.lastPrice,
				secondLastPrice: prevState.secondLastPrice
			})
		});
	}

	render() {
		const percentageChange = parseFloat((this.state.lastPrice - this.state.secondLastPrice) / this.state.secondLastPrice * 100).toFixed(2);
		const buyOrders = this.state.buyOrders.map( (order) =>
			<BuyOrderLi order_id={order.order_id} price={parseFloat(order.price).toFixed(7)} amount_of_token={order.amount_of_token.replace(/ .*/,'')} symbol={order.amount_of_token.split(" ")[1]}/>
		);
		const sellOrders = this.state.sellOrders.map( (order) =>
			<SellOrderLi order_id={order.order_id} price={parseFloat(order.price).toFixed(7)} amount_of_token={order.amount_of_token.replace(/ .*/,'')} symbol={order.amount_of_token.split(" ")[1]}/>
		);
		return(
				<div class="ababa">
		            <div class="order-sell-list">
		                <div>
		                    <ul>
		                    	{sellOrders}
		                    </ul>
		                </div>
		            </div>
		            <div class="halfway-order-book">
		                <h3>{this.state.lastPrice}</h3>
		                <h3 class={percentageChange >= 0 ? "trade-buy" : "trade-sell"} >{percentageChange >= 0 ? "+" : ""}{percentageChange}%</h3>
		            </div>
		            <div class="order-buy-list">
	                    <div>
	                        <ul>
	                        	{buyOrders}
	                    	</ul>
	                    </div>
		            </div>
		        </div>
			)
	}
}

class PastTradeLi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			price: this.props.price,
			amount: this.props.amount,
			timestamp: this.props.timestamp,
			buy_or_sell: this.props.buy_or_sell
		}
	}

	render() {
		return (
				<li>
	                <div class="past-trade-div-single">
                        <h3 class={this.state.buy_or_sell == 1 ? "trade-sell" : "trade-buy"}>{this.state.price}</h3>
                        <h3>{this.state.amount}</h3>
                        <h3>{this.state.timestamp}</h3>
                    </div>    
                </li>
			)
	}
}

class PastTrades extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trades: this.props.trades
		}
		this.updateTrades = this.updateTrades.bind(this);
	}

	componentWillMount() {
		PastTradeInfo.on("CACHED_TRADES_UPDATED", this.updateTrades);
	}

	updateTrades() {
		this.setState({
			trades: PastTradeInfo.cachedTrades
		});
	}

	render() {
		let trades = this.state.trades.map((trade) =>
			<PastTradeLi key={trade.timestamp} price={parseFloat(trade.data.price).toFixed(7)} buy_or_sell={trade.data.buy_or_sell} amount={trade.data.amount_of_token.split(" ")[0]} timestamp={trade.timestamp.split("T").pop().split(".")[0]}/> 
		);
		return(
				<div class="past-trades-div">
	                <ul class="past-trades-ul">
	                	{trades}
	                </ul>
	            </div>
			)
	}
}

export default class OrdersAndTrades extends React.Component {
	constructor() {
		super();
		this.state = {
			orderBookClicked: true,
			trades: [],
			lastPrice: 0,
			secondLastPrice: 0
		}

		this.handleSwitch = this.handleSwitch.bind(this);
	}

	handleSwitch() {
		this.setState((prevState) => {
			return ({
				orderBookClicked: !prevState.orderBookClicked,
				trades: PastTradeInfo.cachedTrades,
				lastPrice: PastTradeInfo.cachedTrades[0] ? parseFloat(PastTradeInfo.cachedTrades[0].data.price).toFixed(7) : 0,
				secondLastPrice: PastTradeInfo.cachedTrades[1] ? parseFloat(PastTradeInfo.cachedTrades[1].data.price).toFixed(7) : 0
			});  
		});
	}

	render() {
		const orderBookClicked = this.state.orderBookClicked;
		const toDisplay = orderBookClicked ? <OrderBook lastPrice={this.state.lastPrice} secondLastPrice={this.state.secondLastPrice}/> : <PastTrades trades={this.state.trades}/>; //Have to pass props into PastTrades because it doesnt initially render
		return (
				<div class="container2">
					<div class="order-container">
	                    <h3 onClick={this.handleSwitch} class={orderBookClicked ? "order-book-selected" : ""}>Order Book</h3>
	                    <h3 onClick={this.handleSwitch} class={!orderBookClicked ? "order-book-selected" : ""}>Past Trades</h3>
		            </div>
		            {toDisplay}
				</div>

			)
	}
}
