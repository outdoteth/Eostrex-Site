import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";
import OrderBookInfo from "./OrderBookInfo/OrderBookInfo.js";
import * as OrderBookActions from "./OrderBookInfo/OrderBookActions.js";

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

	}

	render() {
		return (
				<li>
                    <div>
                        <h3 class="price1">0.123</h3>
                        <h3 class="amount1">13278</h3>
                        <div class="total1">
                            <h3>232312389</h3>
                        </div>
                    </div>
                </li>
			)
	}
}




export default class OrderBook extends React.Component {
	constructor(props) {
		super(props);

		this.setOrders = this.setOrders.bind(this);
		this.state = {
			buyOrders: [],
			sellOrders: []
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
		const sellOrders = /*for loop to go through <SellOrderLi>*/null;
		return(
				<div class="ababa">
		            <div class="container2">
			            <div class="order-sell-list">
			                <div>
			                    <ul>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/>
			                        <SellOrderLi/> {/*<!-- TODO: This needs to be changed to sellOrders -->*/}
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
		                        	{buyOrders}
		                    	</ul>
		                    </div>
			            </div>
		            </div>
		        </div>
			)
	}
}
