import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";
import MyOrderInfo from "./MyOrderInfo/MyOrderInfo.js";
import * as MyOrderActions from "./MyOrderInfo/MyOrderActions.js";
import AccountInfo from "./AccountInfo/AccountInfo.js";
import * as AccountActions from "./AccountInfo/AccountActions.js";

var transactionTemplate = {
	code: null,
	action: null,
	from: null,
	data: {}
}

class Table extends React.Component {
	constructor() {
		super();

		this.state = {
			orders: [] /*Array to store the orders*/
		}

		this.queryOrders = this.queryOrders.bind(this);
		this.setOrders = this.setOrders.bind(this);
	}

	componentWillMount() {
		AccountInfo.on("ACCOUNT_BALANCES_UPDATED", this.queryOrders);
		MyOrderInfo.on("MY_ORDERS_UPDATED", this.setOrders);
	}

	componentWillUnmount() {
		AccountInfo.removeListener("ACCOUNT_BALANCES_UPDATED", this.queryOrders);
		MyOrderInfo.removeListener("MY_ORDERS_UPDATED", this.setOrders);
	}

	setOrders() {
		this.setState({ orders: MyOrderInfo.orders });
	}

	queryOrders() {
		MyOrderActions.getMyOrders();
	}

	render() {
		const orders = this.state.orders.map((order) =>
									  			<Orders price={order.price} date={order.date} orderId={order.orderId} amount={order.amount + " " + order.symbol} contract={order.tokenContract}/>
											);
		return(
				<table>
					<tr class="title-tr">
						<th>Price</th>
						<th>Amount</th>
						<th>Order ID</th>
						<th>Date</th>
						<th id="padding-th"></th>
					</tr>
					{orders}
				</table>
			)
	}
}

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.handleCancel = this.handleCancel.bind(this);
		this.state = {
			price: this.props.price,
			date: this.props.date,
			orderId: this.props.orderId,  
			amount: this.props.amount,
			contract: Eos.modules.format.decodeName(this.props.contract, false)
		}
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleCancel() {
		transactionTemplate.code = "exchangeb";
		transactionTemplate.action = "cancelorder";
		transactionTemplate.from = AccountInfo.account.currentAccount;
		transactionTemplate.data = {
			maker_account: AccountInfo.account.currentAccount,
			target_token_contract: this.state.contract,
			order_id: this.state.orderId
		};
		AccountActions.handleTransaction(transactionTemplate);
	}

	render() {
		return (
				<tr>
					<td>{this.state.price}</td>
					<td>{this.state.amount}</td>
					<td>#{this.state.orderId}</td>
					<td>{this.state.date}</td>
					<td><button onClick={this.handleCancel} id="button-th">Cancel Order</button></td>
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