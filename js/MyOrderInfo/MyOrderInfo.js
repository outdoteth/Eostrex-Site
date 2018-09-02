import { EventEmitter } from "events";
import { Dispatcher  } from "flux";
import CoinInfo from "../CoinInfo/CoinInfo.js";
import { eosRef as eos } from "../AccountInfo/AccountInfo.js";
import AccountInfo from "../AccountInfo/AccountInfo.js";

//Need an array of these
let orderTemplate = {
	price: null,
	symbol: null,
	date: null,
	orderId: null,
	tokenContract: null
}

class MyOrderInfo extends EventEmitter {
	constructor() {
		super();

		this.orders = [];
	}

	updateOrders() {
		eos.getTableRows({ code: "exchangeb", scope:  AccountInfo.account.currentAccount, table: "myorders", json: true }).then(res=> {
			this.orders = [];
			for (var i = 0; i < res.rows.length; i++) {
				const rowRef = res.rows[i];
				let order = {
					symbol: rowRef.amount_of_token.split(" ").pop(), //e.g. EOS
					amount: Number(rowRef.amount_of_token.replace(/ .*/,'')).toFixed(4), //e.g. 0.123
					date: rowRef.expiration_date,
					orderId: rowRef.order_id,
					tokenContract: rowRef.target_token_contract,
					price: rowRef.price
				}
				this.orders.push(order);
			}
			this.emit("MY_ORDERS_UPDATED");
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