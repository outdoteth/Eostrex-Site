import { EventEmitter } from "events";
import { Dispatcher  } from "flux";
import CoinInfo from "../CoinInfo/CoinInfo.js";

var chain = {
    mainnet: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
}

var eos = Eos({
	httpEndpoint: 'http://127.0.0.1:8888',
	chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
	verbose: true
})

const network = {
    protocol:'http', // Defaults to https
    blockchain:'eos',
    host:'127.0.0.1', // ( or null if endorsed chainId )
    port:8888, // ( or null if defaulting to 80 )
    chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
}

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

			contract: {
				eosBalance: "0.000",
				tokenBalance: "0.000"
			},
			loginType: {
				usingScatter: false, 
				usingPkey: false
			},
		};
		this.scatter = null;
		this.foundScatter = false;
	}

	scatterLoaded(scatter) {
		this.foundScatter = true;
		this.scatter = scatter;
		this.emit("SCATTER_LOADED");
	}

	scatterLogin(scatterAccount) {
		this.account.names = scatterAccount.accounts;
		eos = this.scatter.eos( network, Eos, {}, 'http' );
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
				//Update contract balance
				eos.getTableRows({ code: "exchangeb", scope: account, table: "accounts", json: true }).then(res3=>{
					let encodedEosContract = Eos.modules.format.encodeName("eosio.token", false);
					let encodedTokenContract = Eos.modules.format.encodeName(CoinInfo.coin.contract, false);
					let foundTBalance = false;
					let foundEBalance = false;
					for (var i = 0; i < res3.rows.length; i++) {
						if (res3.rows[i].token_contract == encodedTokenContract) {
							this.account.contract.tokenBalance = res3.rows[i].balance.replace(/ .*/,'');
							foundTBalance = true;
						}
						if (res3.rows[i].token_contract == encodedEosContract) {
							this.account.contract.eosBalance = res3.rows[i].balance.replace(/ .*/,'');
							foundEBalance = true;
						}
					}
					if (!foundEBalance) {
						this.account.contract.eosBalance = "0.000";
					}
					if (!foundTBalance) {
						this.account.contract.tokenBalance = "0.000";
					}
					this.emit("ACCOUNT_BALANCES_UPDATED");
				}).catch(err1=>{

				});
			}).catch(err1=>{
				alert(`Error: The contract "${CoinInfo.coin.contract}" does not exist`);
			});
		}).catch(err1=>{
			alert("Error: Could not make request to server; Try refreshing the page.");
		});
	}

	handleTransaction(transaction) {
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
		}).catch(err=>{
			console.log(err);
			alert("Transaction Error");
		}).then(res=>{
			console.log(res);
			this.emit("TRANSACTION_MADE");
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
			case "TRANSACTION": {
				this.handleTransaction(action.data);
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

export const eosRef = eos;
export const accountDispatcher = dispatcher;
export default accountInfo;