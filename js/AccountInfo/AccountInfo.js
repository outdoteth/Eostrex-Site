import { EventEmitter } from "events";
import { Dispatcher  } from "flux";

class AccountInfo extends EventEmitter {
	constructor() {
		super();
		this.account = {
			names: null,
			currentAccount: null,
			eosBalance: null,
			tokenBalance: null,
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
		console.log(this.account);
	}

	//Update the balances (and orders??)
	updateAccountInfo() {
		//need to use the eos library here
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