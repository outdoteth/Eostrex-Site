import { EventEmitter } from "events";
import { Dispatcher  } from "flux";

import * as AccountActions from "../AccountInfo/AccountActions.js";
import { Socket } from "../socket/socket.js";

class CoinInfo extends EventEmitter {
	constructor() {
		super();

		this.coin = {
			contract: null,
			symbol: null, 
			price: "0 EOS",
		}
	}

	setNewCoin(newCoin) {
		this.coin.contract = newCoin.contract;
		this.coin.symbol = newCoin.symbol;
		AccountActions.accountUpdateBalances();
		console.log(this.coin);
		this.emit("NEW_COIN_SET");
		Socket.emit('order-request', this.coin.contract);
		Socket.emit("trade-request", this.coin.contract);
	}

	handleActions(action) {
		switch(action.type) {
			case "SET_NEW_COIN": {
				this.setNewCoin(action.data);
				break;
			}
			default: {
				console.log("Invalid Action on CoinInfo");
				break;
			}
		}
	}
}

const coinInfo = new CoinInfo();
var	dispatcher = new Dispatcher();
dispatcher.register(coinInfo.handleActions.bind(coinInfo));

export const coinDispatcher = dispatcher;
export default coinInfo;