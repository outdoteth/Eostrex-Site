import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

import AccountInfo from "./AccountInfo/AccountInfo.js";
import CoinInfo from "./CoinInfo/CoinInfo.js";

class DepositBox extends React.Component {
	constructor(props) {
		super(props);

		this.handleEosDeposit = this.handleEosDeposit.bind(this);
		this.handleTokenDeposit = this.handleTokenDeposit.bind(this);
	}


	handleEosDeposit() {

	}

	handleTokenDeposit() {

	}

	render() {
		return (
				<div class="deposit-withdraw">
	                <div class="deposit-withdraw-buts">
	                    <div class="dep-with-div dep-selected"><h3 class="dep-but-h3">Deposit</h3></div>
	                    <div onClick={this.props.handleSwitch} class="dep-with-div"><h3 class="dep-but-h3">Withdraw</h3></div>
	                </div>
	                <h3 class="deposit-tits dep-1">Deposit EOS</h3>
	                <form class="dep-form">
	                    <input placeholder="0.000 EOS" class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Deposit"></input>
	                </form> 
	                <h3 class="deposit-tits">Deposit {CoinInfo.coin.symbol}</h3>
	                <form class="dep-form  dep-2">
	                    <input placeholder={"0.000 "+CoinInfo.coin.symbol} class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Deposit"></input>
	                </form>
		        </div>
			)
	}
}

class WithdrawBox extends React.Component {
	constructor(props) {
		super(props);

		this.handleEosWithdraw = this.handleEosWithdraw.bind(this);
		this.handleTokenWithdraw = this.handleTokenWithdraw.bind(this);
	}

	handleEosWithdraw() {

	}

	handleTokenWithdraw() {
		
	}

	render() {
		return (
				<div class="deposit-withdraw">
	                <div class="deposit-withdraw-buts">
	                    <div onClick={this.props.handleSwitch} class="dep-with-div"><h3 class="dep-but-h3">Deposit</h3></div>
	                    <div class="dep-with-div dep-selected"><h3 class="dep-but-h3">Withdraw</h3></div>
	                </div>
	                <h3 class="deposit-tits dep-1">Withdraw EOS</h3>
	                <form class="dep-form">
	                    <input placeholder="0.000 EOS" class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Withdraw"></input>
	                </form> 
	                <h3 class="deposit-tits">Withdraw {CoinInfo.coin.symbol}</h3>
	                <form class="dep-form  dep-2">
	                    <input placeholder={"0.000 "+CoinInfo.coin.symbol} class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Withdraw"></input>
	                </form>
		        </div>
			)
	}

}

class DepositWithdrawBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			depositClicked: true,
			withdrawClicked: false
		}

		this.handleSwitch = this.handleSwitch.bind(this);
	}

	handleSwitch() {
		this.setState({
			depositClicked: !this.state.depositClicked,
			withdrawClicked: !this.state.withdrawClicked
		});
	}

	render() {
		const depositBox = <DepositBox handleSwitch={this.handleSwitch}/>
		const withdrawBox = <WithdrawBox handleSwitch={this.handleSwitch}/>
		return (
				<div>
					{ this.state.depositClicked ? depositBox : withdrawBox }
				</div>
			)
	}
}

export default class MyProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wallet: {
				eosBalance: "0.000", 
				tokenBalance: "0.000"
			},
			contract: {
				eosBalance: "0.000",
				tokenBalance: "0.000"
			}
		}
		this.setBalances = this.setBalances.bind(this);
	}

	componentWillMount() {
		AccountInfo.on("ACCOUNT_BALANCES_UPDATED", this.setBalances);
	}

	componentWillUnmount() {
		AccountInfo.removeListener("ACCOUNT_BALANCES_UPDATED", this.setBalances);
	}

	setBalances() {
		this.setState({
			wallet: {
				eosBalance: AccountInfo.account.wallet.eosBalance,
				tokenBalance: AccountInfo.account.wallet.tokenBalance
			}
		})
	}

	render() {
		return(
				<div id="profile">
		            <div class="Wallet-Balance-Box">
		                <div class="Wallet-Title"><h3 class="tit-h3">Wallet Balance</h3></div>
		                <div><h3 class="subtit-ass">Asset</h3></div>
		                <div><h3 class="subtit-ass b">Amount</h3></div>
		                <div><h3 class="nums">EOS</h3></div>
		                <div><h3 class="nums b">{this.state.wallet.eosBalance}</h3></div>
		                <div><h3 class="nums">{CoinInfo.coin.symbol}</h3></div>
		                <div><h3 class="nums b">{this.state.wallet.tokenBalance}</h3></div>
		            </div>
		            <div class="contract-balance">
		                <div class="Wallet-Title"><h3 class="tit-h3">Smart Contract Balance</h3></div>
		                <div><h3 class="subtit-ass">Asset</h3></div>
		                <div><h3 class="subtit-ass b">Amount</h3></div>
		                <div><h3 class="nums">EOS</h3></div>
		                <div><h3 class="nums b">{this.state.contract.eosBalance}</h3></div>
		                <div><h3 class="nums">{CoinInfo.coin.symbol}</h3></div>
		                <div><h3 class="nums b">{this.state.contract.tokenBalance}</h3></div>
		            </div>
		            <DepositWithdrawBox/>
		        </div>
			)
	}
}