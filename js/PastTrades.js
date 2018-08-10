import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

class PastTradeLi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			price: props.price,
			amount: props.amount,
			date: props.date,
		}
	}

	render() {
		return(
				<div>
					<p>{this.state.price}</p>
					<p>{this.state.amount}</p>
					<p>{this.state.date}</p>
				</div>
			)
	}
}

export default class PastTrades extends React.Component {
	render() {
		return (
				<div>
					<ul>
						//for loop needed here to loop through data from backend and display trades
						<li>
							<PastTradeLi/>
						</li>
					</ul>					
				</div>
			)
	}
}
