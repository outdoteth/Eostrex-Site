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
				eosBalance: null,
				tokenBalance: null,
			},

			//--------- TODO: ADD THE HANDLER FOR UPDATING CONTRACT BALANCES ---------//
			contract: {
				eosBalance: null,
				tokenBalance: null
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

	//Update the balances (and orders??)
	updateBalances(account) {
		//Update wallet balance
		eos.getTableRows({ code: "eosio.token", scope: account, table: "accounts", json: true }).then(res1 => {
			if (res1.rows[0]) {
				this.account.eosBalance = res1.rows[0].balance.replace(/ .*/,'');
			} else {
				this.account.eosBalance = "0.000";
			}
			eos.getTableRows({ code: CoinInfo.coin.contract, scope: account, table: "accounts", json: true }).then(res2 => {
				if (res2.rows[0]) {
					this.account.tokenBalance = res2.rows[0].balance.replace(/ .*/,'');
				} else {
					this.account.tokenBalance = "0.000";
				}

				//---------- TODO: UPDATE CONTRACT BALANCES ----------//
				/*eos.getTableRows({}).then(res3=>{
					///Update contract balance
					eos.getTableRows({}).then(res4=>{
						///Update contract balance
					});
				});*/
				this.emit("ACCOUNT_BALANCES_UPDATED");
			});
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