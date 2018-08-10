import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

import AccountInfo from "./AccountInfo/AccountInfo.js";

class DepositBox extends React.Component {
	constructor(props) {
		super(props);
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
	                <h3 class="deposit-tits">Deposit Karma</h3>
	                <form class="dep-form  dep-2">
	                    <input placeholder="0.000 Karma" class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Deposit"></input>
	                </form>
		        </div>
			)
	}
}

class WithdrawBox extends React.Component {
	constructor(props) {
		super(props);
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
	                <h3 class="deposit-tits">Withdraw Karma</h3>
	                <form class="dep-form  dep-2">
	                    <input placeholder="0.000 Karma" class="dep-input"></input>
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
	constructor() {
		super();
	}

	render() {
		return(
				<div id="profile">
		            <div class="Wallet-Balance-Box">
		                <div class="Wallet-Title"><h3 class="tit-h3">Wallet Balance</h3></div>
		                <div><h3 class="subtit-ass">Asset</h3></div>
		                <div><h3 class="subtit-ass b">Amount</h3></div>
		                <div><h3 class="nums">EOS</h3></div>
		                <div><h3 class="nums b">1000</h3></div>
		                <div><h3 class="nums">Karma</h3></div>
		                <div><h3 class="nums b">1000</h3></div>
		            </div>
		            <div class="contract-balance">
		                <div class="Wallet-Title"><h3 class="tit-h3">Contract Balance</h3></div>
		                <div><h3 class="subtit-ass">Asset</h3></div>
		                <div><h3 class="subtit-ass b">Amount</h3></div>
		                <div><h3 class="nums">EOS</h3></div>
		                <div><h3 class="nums b">1000</h3></div>
		                <div><h3 class="nums">Karma</h3></div>
		                <div><h3 class="nums b">1000</h3></div>
		            </div>
		            <DepositWithdrawBox/>
		        </div>
			)
	}
}