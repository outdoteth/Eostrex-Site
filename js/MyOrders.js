import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

class Table extends React.Component {
	constructor() {
		super();

		this.state = {
			orders: [] /*Array to store the orders*/
		}

		this.queryOrders = this.queryOrders.bind(this);
	}

	/*Queries the orders of the AccountInfo.account.accountSelected*/
	queryOrders() {
		/*Send an action to AccountActions handler*/
	}

	render() {
		const orders = /*for loop to go through orders*/null;
		return(
				<table>
					<tr class="title-tr">
						<th>Price</th>
						<th>Amount</th>
						<th>Order ID</th>
						<th>Date</th>
						<th id="padding-th"></th>
					</tr>
					{/*{orders}*/}<Orders/>
				</table>
			)
	}
}

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.handleCancel = this.handleCancel.bind(this);
	}

	/*Sends eos tx. to cancel the order*/
	handleCancel() {
		/*Send an action to AccountActions handler*/
	}

	render() {
		return (
				<tr>
					<td>0.123 EOS/Karma</td>
					<td>13289 Karma</td>
					<td>#1283900</td>
					<td>15:00 GMT 08/07/2018</td>
					<td><button id="button-th">Cancel Order</button></td>
				</tr>
			)
	}
}

export default class MyOrders extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
				<div>
					<div class="past-trade-my-order-div">
						<div class="order-div"><h3>My Orders</h3></div>
						<div class="past-trade-div"><h3>Past Trades</h3></div>
					</div>
					<div class="order-table">
						<Table/>
					</div>
				</div>
			)
	}
}