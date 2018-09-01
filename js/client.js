import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter, hashHistory, Redirect, Switch } from "react-router-dom";

import OrderBook from "./OrderBook.js";
import TopBanner from "./TopBanner.js";
import PastTrades from "./PastTrades.js";
import MyProfile from "./MyProfile.js";
import MyOrders from "./MyOrders.js";
import MakeOrder from "./MakeOrder.js";
import Chart from "./Chart.js"

import CoinInfo from "./CoinInfo/CoinInfo.js";
import * as CoinInfoActions from "./CoinInfo/CoinInfoActions.js";


class WholePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			coin: {
				contract: this.props.match.params.contract,
				symbol: this.props.match.params.symbol,
				price: this.getPrice()
			},
		}

		this.getPrice = this.getPrice.bind(this);
		this.updateCoinInfo = this.updateCoinInfo.bind(this);
	};

	componentWillMount() {
		this.updateCoinInfo({ contract: this.props.match.params.contract, symbol: this.props.match.params.symbol })
	}

	updateCoinInfo(newCoin) {
		CoinInfoActions.newCoinSetter(newCoin);
	}

	getPrice() {
		//return price
		return 1;
	}

	render() {
		return (
				<div>
					<TopBanner history={ this.props.history } coin={ this.state.coin }/>
				</div>
			)
	}
}

const topBanner = document.getElementById("top-banner-id");
ReactDOM.render(	
					<div>
						<HashRouter history={ hashHistory }>
							<Switch>
								<Route path="/trade/:contract/:symbol" component={ WholePage }/>
								<Redirect exact from="/" to="/trade/gem/GEM" />
							</Switch>
						</HashRouter>
					</div>
					, topBanner);

const myProfile = document.getElementById("profile-target");
ReactDOM.render(	
					<MyProfile/>, myProfile
				)

const makeOrder = document.getElementById("buy-sell-target");
ReactDOM.render(
					<MakeOrder/>, makeOrder
				)

const myOrders = document.getElementById("my-orders");
ReactDOM.render(
					<MyOrders/>, myOrders
				)

const orderBook = document.getElementById("order-book");
ReactDOM.render(
					<OrderBook/>, orderBook
				)


/*
const orderBook = document.getElementById("order-book");
ReactDOM.render(<OrderBook/>, topBanner);

const makeOrder = document.getElementById("make-order");
ReactDOM.render(<TopBanner/>, topBanner);

const myOrders = document.getElementById("my-orders");
ReactDOM.render(<TopBanner/>, topBanner);

const chart = document.getElementById("chart");
ReactDOM.render(<TopBanner/>, topBanner);

const topBanner = document.getElementById("top-banner");
ReactDOM.render(<TopBanner/>, topBanner);
*/
