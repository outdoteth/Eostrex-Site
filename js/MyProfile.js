import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, HashRouter } from "react-router-dom";

import AccountInfo from "./AccountInfo/AccountInfo.js";
import * as AccountActions from "./AccountInfo/AccountActions.js";
import CoinInfo from "./CoinInfo/CoinInfo.js";

var transactionTemplate = {
	code: null,
	action: null,
	from: null,
	data: {}
}


class DepositBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			eosDepositAmount: 0,
			tokenDepositAmount: 0
		};

		this.handleEosDeposit = this.handleEosDeposit.bind(this);
		this.handleTokenDeposit = this.handleTokenDeposit.bind(this);
		this.setEosDepositAmount = this.setEosDepositAmount.bind(this);
		this.setTokenDepositAmount = this.setTokenDepositAmount.bind(this);
	}

	setEosDepositAmount(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({eosDepositAmount: Number(newValue).toFixed(3).toString(), tokenDepositAmount: Number(prevState.tokenDepositAmount).toFixed(3).toString()})});
	}

	setTokenDepositAmount(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{ return ({eosDepositAmount: Number(prevState.eosDepositAmount).toFixed(3).toString(), tokenDepositAmount: Number(newValue).toFixed(3).toString()})});
	}

	handleEosDeposit() {
		transactionTemplate.code = "eosio.token";
		transactionTemplate.action = "transfer";
		transactionTemplate.from = AccountInfo.account.currentAccount;
		transactionTemplate.data = {
			from: AccountInfo.account.currentAccount,
			to: "exchangeb",
			quantity: this.state.eosDepositAmount + " EOS",
			memo: 'Deposit {eosio.token} to EOStrader'
        };
		AccountActions.handleTransaction(transactionTemplate);
	}

	handleTokenDeposit() {
		transactionTemplate.code = CoinInfo.coin.contract,
		transactionTemplate.action = "transfer";
		transactionTemplate.from = AccountInfo.account.currentAccount;
		transactionTemplate.data = {
			from: AccountInfo.account.currentAccount,
			to: "exchangeb",
			quantity: this.state.tokenDepositAmount + " " + CoinInfo.coin.symbol,
			memo: `Deposit {${CoinInfo.coin.contract}} to EOStrader`
        };
		AccountActions.handleTransaction(transactionTemplate);
	}

	render() {
		return (
				<div class="deposit-withdraw">
	                <div class="deposit-withdraw-buts">
	                    <div class="dep-with-div dep-selected"><h3 class="dep-but-h3">Deposit</h3></div>
	                    <div onClick={this.props.handleSwitch} class="dep-with-div"><h3 class="dep-but-h3">Withdraw</h3></div>
	                </div>
	                <h3 class="deposit-tits dep-1">Deposit EOS</h3>
	                <form onSubmit={this.handleEosDeposit} class="dep-form">
	                    <input onChange={this.setEosDepositAmount} placeholder="0.000 EOS" class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Deposit"></input>
	                </form> 
	                <h3 class="deposit-tits">Deposit {CoinInfo.coin.symbol}</h3>
	                <form onSubmit={this.handleTokenDeposit} class="dep-form  dep-2">
	                    <input onChange={this.setTokenDepositAmount} placeholder={"0.000 "+CoinInfo.coin.symbol} class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Deposit"></input>
	                </form>
		        </div>
			)
	}
}

class WithdrawBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			eosWithdrawAmount: 0, 
			tokenWithdrawAmount: 0
		}
		this.handleEosWithdraw = this.handleEosWithdraw.bind(this);
		this.handleTokenWithdraw = this.handleTokenWithdraw.bind(this);
		this.setEosWithdrawAmount = this.setEosWithdrawAmount.bind(this);
		this.setTokenWithdrawAmount = this.setTokenWithdrawAmount.bind(this);
	}

	setEosWithdrawAmount(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{return({eosWithdrawAmount: Number(newValue).toFixed(3).toString(), tokenWithdrawAmount: Number(prevState.tokenWithdrawAmount).toFixed(3).toString()})});
	}

	setTokenWithdrawAmount(event) {
		const newValue = event.target.value;
		this.setState((prevState)=>{ return ({eosWithdrawAmount: Number(prevState.eosWithdrawAmount).toFixed(3).toString(), tokenWithdrawAmount: Number(newValue).toFixed(3).toString()})});
	}

	handleEosWithdraw() {
		transactionTemplate.code = "exchangeb",
		transactionTemplate.action = "makewithdraw";
		transactionTemplate.from = AccountInfo.account.currentAccount;
		transactionTemplate.data = {
			withdraw_account: AccountInfo.account.currentAccount,
			target_token_contract: "eosio.token",
			amount_of_token: this.state.eosWithdrawAmount + " EOS"
        };
		AccountActions.handleTransaction(transactionTemplate);
	}

	handleTokenWithdraw() {
		transactionTemplate.code = "exchangeb",
		transactionTemplate.action = "makewithdraw";
		transactionTemplate.from = AccountInfo.account.currentAccount;
		transactionTemplate.data = {
			withdraw_account: AccountInfo.account.currentAccount,
			target_token_contract: CoinInfo.coin.contract,
			amount_of_token: this.state.tokenWithdrawAmount + " " + CoinInfo.coin.symbol
		};		
		AccountActions.handleTransaction(transactionTemplate);
	}

	render() {
		return (
				<div class="deposit-withdraw">
	                <div class="deposit-withdraw-buts">
	                    <div onClick={this.props.handleSwitch} class="dep-with-div"><h3 class="dep-but-h3">Deposit</h3></div>
	                    <div class="dep-with-div dep-selected"><h3 class="dep-but-h3">Withdraw</h3></div>
	                </div>
	                <h3 class="deposit-tits dep-1">Withdraw EOS</h3>
	                <form onSubmit={this.handleEosWithdraw} class="dep-form">
	                    <input onChange={this.setEosWithdrawAmount} placeholder="0.000 EOS" class="dep-input"></input>
	                    <input class="dep-with-but" type="submit" value="Withdraw"></input>
	                </form> 
	                <h3 class="deposit-tits">Withdraw {CoinInfo.coin.symbol}</h3>
	                <form onSubmit={this.handleTokenWithdraw} class="dep-form  dep-2">
	                    <input onChange={this.setTokenWithdrawAmount} placeholder={"0.000 "+CoinInfo.coin.symbol} class="dep-input"></input>
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
		this.updateBalances = this.updateBalances.bind(this);
	}

	componentWillMount() {
		AccountInfo.on("ACCOUNT_BALANCES_UPDATED", this.setBalances);
		AccountInfo.on("TRANSACTION_MADE", this.updateBalances);
	}

	componentWillUnmount() {
		AccountInfo.removeListener("ACCOUNT_BALANCES_UPDATED", this.setBalances);
		AccountInfo.removeListener("TRANSACTION_MADE", this.updateBalances);
	}

	updateBalances() {
		AccountActions.accountUpdateBalances();
	}

	setBalances() {
		this.setState({
			wallet: {
				eosBalance: AccountInfo.account.wallet.eosBalance,
				tokenBalance: AccountInfo.account.wallet.tokenBalance
			},
			contract: {
				eosBalance: AccountInfo.account.contract.eosBalance,
				tokenBalance: AccountInfo.account.contract.tokenBalance
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