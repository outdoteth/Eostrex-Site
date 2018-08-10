import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

class OrderBookLi extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			price: props.price,
			amount: props.amount,
			total: props.total
		}
	}

	render() {
		return(
				<div>
					<p>{this.state.price}</p>
					<p>{this.state.amount}</p>
					<p>{this.state.total}</p>
				</div>
			)
	}
}

export default class OrderBook extends React.Component {
	render() {
		return(
				<div>
					<ul>
						//for loop to go through orders from backend 
						<li>
							<OrderBookLi/>
						</li>
					</ul>
				</div>
			)
	}
}
