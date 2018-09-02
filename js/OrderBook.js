import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";
import OrderBookInfo from "./OrderBookInfo/OrderBookInfo.js";
import * as OrderBookActions from "./OrderBookInfo/OrderBookActions.js";

import PastTradeInfo from "./PastTradeInfo/PastTradeInfo.js";
import * as PastTradeActions from "./PastTradeInfo/PastTradeActions.js";

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
			target_token_contract: this.props.target_token_contract
		}
	}

	render() {
		return (
				<li>
	                <div>
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
			target_token_contract: this.props.target_token_contract
		}
	}

	render() {
		return (
				<li>
                    <div>
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
			sellOrders: OrderBookInfo.sellOrders
		}
	}

	componentWillMount() {
		OrderBookInfo.on( "ORDERS_UPDATED", this.setOrders );
	}

	setOrders() {
		this.setState({
			buyOrders: OrderBookInfo.buyOrders,
			sellOrders: OrderBookInfo.sellOrders
		});
	}

	render() {
		const buyOrders = this.state.buyOrders.map( (order) =>
			<BuyOrderLi price={parseFloat(order.price).toFixed(7)} amount_of_token={order.amount_of_token.replace(/ .*/,'')}/>
		);
		const sellOrders = this.state.sellOrders.map( (order) =>
			<SellOrderLi price={parseFloat(order.price).toFixed(7)} amount_of_token={order.amount_of_token.replace(/ .*/,'')}/>
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
		                <h3>0.5478 EOS</h3>
		                <h3>+1.06%</h3>
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
			amount: this.props.amount_of_token,
			timestamp: this.props.timestamp
		}
	}

	render() {
		return (
				<li>
	                <div class="past-trade-div-single">
                        <h3>0.1234</h3>
                        <h3>23589</h3>
                        <h3>18:23:21</h3>
                    </div>    
                </li>
			)
	}
}

class PastTrades extends React.Component {
	constructor() {
		super();
		this.state = {
			trades: []
		}
		this.updateTrades = this.updateTrades.bind(this);
	}

	componentWillMount() {
		PastTradeInfo.on("CACHED_TRADES_UPDATED", this.updateTrades);
	}

	updateTrades() {
		this.setState({
			trades: PastTradeInfo.cachedTrades
		})
	}

	render() {
		//const trades = this.state.trades.map((trade) => 
		//);
		return(
				<div class="past-trades-div">
	                <ul class="past-trades-ul">
	                	<PastTradeLi/>
	                	<PastTradeLi/>
	                </ul>
	            </div>
			)
	}
}

export default class OrdersAndTrades extends React.Component {
	constructor() {
		super();
		this.state = {
			orderBookClicked: true
		}

		this.handleSwitch = this.handleSwitch.bind(this);
	}

	handleSwitch() {
		this.setState((prevState) => {
			return {orderBookClicked: !prevState.orderBookClicked};  
		});
	}

	render() {
		const orderBookClicked = this.state.orderBookClicked;
		const toDisplay = orderBookClicked ? <OrderBook/> : <PastTrades/>;
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
