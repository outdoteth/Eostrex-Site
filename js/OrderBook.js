import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";


class BuyOrderLi extends React.Component {
	constructor(props) {
		super(props);

		/* 	TODO: Set the state to hold the order;
			price, amount, total, orderId */
	}

	render() {
		return (
				<li>
	                <div>
	                    <h3 class="price2">0.123</h3>
	                    <h3 class="amount1">13278</h3>
	                    <div class="total1">
	                        <h3>232312389</h3>
	                    </div>
	                </div>
	            </li>
			)
	}
}

class SellOrderLi extends React.Component {
	constructor(props) {
		super(props);

		/* 	TODO: Set the state to hold the order;
			price, amount, total, orderId */
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

		this.queryOrderBook = this.queryOrderBook.bind(this);
	}

	/*set all of the orders*/
	queryOrderBook() {
		/*	open a websocket and request the orders
			using the CoinActions dispatcher */
	}

	
	render() {
		const buyOrders = /*for loop to go through <BuyOrderLi>*/null;
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
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/>
		                        	<BuyOrderLi/> {/*<!-- TODO: This needs to be changed to buyOrders -->*/}
		                    	</ul>
		                    </div>
			            </div>
		            </div>
		        </div>
			)
	}
}
