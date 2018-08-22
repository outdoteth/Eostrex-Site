import { EventEmitter } from "events";
import { Dispatcher  } from "flux";
import CoinInfo from "../CoinInfo/CoinInfo.js";
import { eosRef as eos } from "../AccountInfo/AccountInfo.js";
import AccountInfo from "../AccountInfo/AccountInfo.js";

class MyOrderInfo extends EventEmitter {
	constructor() {
		super();

	}

	updateOrders() {
		eos.getTableRows({ code: "exchangea", scope:  AccountInfo.account.currentAccount, table: "myorders", json: true }).then(res=> {
			console.log(res.rows);
		});
	}

	handleActions(action) {
		switch (action.type) {
			case "GET_ORDERS": {
				this.updateOrders();
				break;
			}
			default: {
				console.log("Invalid action on MyOrderInfo");
				break;
			}
		}
	}
}

const myOrderInfo = new MyOrderInfo();
var	dispatcher = new Dispatcher();
const myOrdersToken = dispatcher.register(myOrderInfo.handleActions.bind(myOrderInfo));

export const myOrderDispatcher = dispatcher;
export default myOrderInfo;