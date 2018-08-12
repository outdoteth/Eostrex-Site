import { EventEmitter } from "events";
import { Dispatcher  } from "flux";
import CoinInfo from "../CoinInfo/CoinInfo.js";

var chain = {
    mainnet: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  }

var eos = Eos({
	httpEndpoint: 'https://api.eosnewyork.io:443',
	chainId: chain.mainnet,
	verbose: true
})

class AccountInfo extends EventEmitter {
	constructor() {
		super();
		this.account = {
			names: null,
			currentAccount: null,
			wallet: {
				eosBalance: "0.000",
				tokenBalance: "0.000",
			},

			//--------- TODO: ADD THE HANDLER FOR UPDATING CONTRACT BALANCES ---------//
			contract: {
				eosBalance: "0.000",
				tokenBalance: "0.000"
			},
			loginType: {
				usingScatter: false, 
				usingPkey: false
			}
		};
		this.foundScatter = false;
	}

	scatterLoaded() {
		this.foundScatter = true;
		this.emit("SCATTER_LOADED");
	}

	scatterLogin(scatterAccount) {
		this.account.names = scatterAccount.accounts;
		this.emit("SCATTER_LOGIN", this.account.names);
	}

	setCurrentAccount(selected) {
		this.account.currentAccount = selected;
		this.updateBalances(selected);
	}


	updateBalances(account) {
		//Update wallet balance
		eos.getTableRows({ code: "eosio.token", scope: account, table: "accounts", json: true }).then(res1 => {
			if (res1.rows[0]) {
				this.account.wallet.eosBalance = res1.rows[0].balance.replace(/ .*/,'');
			} else {
				this.account.wallet.eosBalance = "0.000";
			}
			eos.getTableRows({ code: CoinInfo.coin.contract, scope: account, table: "accounts", json: true }).then(res2 => {
				if (res2.rows[0]) {
					this.account.wallet.tokenBalance = res2.rows[0].balance.replace(/ .*/,'');
				} else {
					this.account.wallet.tokenBalance = "0.000";
				}

				//---------- TODO: UPDATE CONTRACT BALANCES ----------//
				/*eos.getTableRows({}).then(res3=>{
					///Update contract balance
					eos.getTableRows({}).then(res4=>{
						///Update contract balance
					});
				});*/
				this.emit("ACCOUNT_BALANCES_UPDATED");
			}).catch(err1=>{
				alert(`Error: The contract "${CoinInfo.coin.contract}" does not exist`);
			});
		}).catch(err1=>{
			alert("Error: Could not make request to server; Try refreshing the page.");
		});
	}

	handleDepositWithdraw(transaction) {
		eos.transaction(
			{
				actions: [
					{
						account: transaction.code,
						name: transaction.action,
						authorization: [{
						  actor: transaction.from,
						  permission: 'active'
						}],
						data: transaction.data
					}
				]
			}).then(res=>{
				this.emit("DEPOSIT_WITHDRAW_MADE");
			});
	}

	getAccount() {
		return this.account;
	}

	handleActions(action) {
		switch(action.type) {
			case "SCATTER_LOADED": {
				this.scatterLoaded(action.data);
				break;
			}
			case "SCATTER_LOGIN": {
				this.scatterLogin(action.data);
				break;
			}
			case "ACCOUNT_SELECT": {
				this.setCurrentAccount(action.data);
				break;
			}
			case "UPDATE_ACCOUNT_BALANCE": {
				this.updateBalances(this.account.currentAccount);
				break;
			}
			case "DEPOSIT_WITHDRAW": {
				this.handleDepositWithdraw(action.data);
				break;
			}
			default: {				
				console.log("Ivalid action");
				break;
			}
		}
	}
}

const accountInfo = new AccountInfo();
var	dispatcher = new Dispatcher();
const accountToken = dispatcher.register(accountInfo.handleActions.bind(accountInfo));

export const accountDispatcher = dispatcher;
export default accountInfo;