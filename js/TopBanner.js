import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";
import AccountInfo from "./AccountInfo/AccountInfo.js";
import * as AccountActions from "./AccountInfo/AccountActions.js";

import CoinInfo from "./CoinInfo/CoinInfo.js";
import * as CoinInfoActions from "./CoinInfo/CoinInfoActions.js";

import { accountDispatcher } from "./AccountInfo/AccountInfo.js";

var chain = {
    mainnet: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
  }

var eos = Eos({
	httpEndpoint: "https://api.eosnewyork.io:443",
	chainId: chain.mainnet,
	verbose: true
});

class LoginBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
				<div class="login-div">
	                <h3 class="login-with login-stuff">Login with</h3>
	                <button onClick={this.props.handleScatter} class="login-but scatter-login login-stuff">Scatter</button>
	                <h3 class="or-login-with login-stuff"> or </h3>
	                <button onClick={this.props.handlePkey} class="login-but pkey-login login-stuff">Private Key</button>
	            </div>
			)
	}
}

class LoggedIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accountNames: props.accountNames,
			selected: props.accountNames[0].name
		}
		this.setSelect = this.setSelect.bind(this);
	}

	componentWillMount() {
		setTimeout(()=>{AccountActions.accountSelect(this.state.selected)}, 0);
	}

	setSelect(event) {
		this.setState({selected: event.target.value});
		AccountActions.accountSelect(event.target.value);
	}

	render() {
		let accountNames = this.state.accountNames.map(names => 
			<option value={names.name}>{names.name}</option>
		);
		return(
				<div class="loggedin-div">
	                <h3 class="login-titles">Account<br/>
	                	<select value={this.state.selected} onChange={this.setSelect} class="account-select">
	                		{accountNames}
	                		<option value="1">asdasd</option>
	                	</select>
	                </h3>
	                <button onClick={this.props.handleLogout} class="login-but logout pkey-login">Logout</button>
		        </div>
			)
	}
}

class Price extends React.Component {
	constructor() {
		super();
		this.state = {
			price: 0.00
		}
	}

	render() {
		return (
				<h3 class="price-banner">Price <br/>{this.state.price} EOS</h3>
			)
	}
}

export default class TopBanner extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			date: Date(),
			coin: {
				contract: this.props.coin.contract,
				symbol: this.props.coin.symbol,
			},
			account: {
				accountNames: null,
				hasLoggedIn: false 
			},
			contractSearch: this.props.contractSearch,
			symbolSearch: this.props.symbolSearch
		};

		this.handleSymbolChange = this.handleSymbolChange.bind(this);
		this.handleContractChange = this.handleContractChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);

		this.handleScatter = this.handleScatter.bind(this);
		this.handlePkey = this.handlePkey.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.setAccounts = this.setAccounts.bind(this);
	}

	handleContractChange(event) {
		this.setState({contractSearch: event.target.value});
	}

	handleSymbolChange(event) {
		this.setState({symbolSearch: event.target.value});
	}

	handleSearch() {
		this.props.history.push("/");
		this.props.history.push("/trade/" + this.state.contractSearch + "/" + this.state.symbolSearch);
		this.setState({ coin: {
								contract: this.state.contractSearch,
								symbol: this.state.symbolSearch
							}
					});
		CoinInfoActions.newCoinSetter({contract: this.state.contractSearch, symbol: this.state.symbolSearch});
	}

	setAccounts(accountNames) {
		this.setState({ account: { accountNames: accountNames, hasLoggedIn: true }});	
	}

	componentWillMount() {
		AccountInfo.on("SCATTER_LOGIN", this.setAccounts);
	}

	componentWillUnmount() {
		AccountInfo.removeListener("SCATTER_LOGIN", this.setAccounts)
	}

	handleScatter() {
		if(!AccountInfo.foundScatter) {
			return;
		}
		AccountActions.scatterLogin();
	}

	handlePkey() {
		//private key login
	}

	handleLogout() {
		this.setState((prevState) => { return { account: { accountNames: prevState.account.accountNames, hasLoggedIn: false } } });
	}

	render() {
		const loginBox = <LoginBox handleScatter={this.handleScatter} handlePkey={this.handlePkey}/>
		const loggedIn = <LoggedIn handleLogout={this.handleLogout} accountNames={this.state.account.accountNames}/>
		return (
				<Router>
					<Route path="/" render={()=> {
						return (
							<div class="top-top-banner">
					            <h3 class="time">Tue Aug 07 2018 11:38:21<br/>GMT +01:00</h3>
					            <h3 class="banner-titles">Asset <br/>{this.state.coin.symbol}</h3>
					            <h3 class="banner-titles">Contract <br/>{this.state.coin.contract}</h3>
					            <Price/>
					            <form class="search-for-coin-form" onSubmit={this.handleSearch}>
					                    <input onChange={this.handleContractChange} class="coin-contract" placeholder="contract - e.g. eosio.token" type="text" required/>
					                    <input onChange={this.handleSymbolChange} class="coin-symbol" placeholder="symbol - e.g. EOS" type="text" required/>
					                    <input class="search-submit" type="submit" value=" Search for token"/>
					            </form>
					            {this.state.account.hasLoggedIn ?  loggedIn : loginBox}
					        </div>
						)
					}}>
					</Route>
				</Router>
			)
	}
}