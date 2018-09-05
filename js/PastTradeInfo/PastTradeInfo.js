import { EventEmitter } from "events";
import { Dispatcher  } from "flux";

class PastTradeInfo extends EventEmitter {
	constructor() {
		super();
		this.cachedTrades = [];
	}

	updateCachedTrades(trades) {
		this.cachedTrades = trades.reverse();
		this.emit("CACHED_TRADES_UPDATED");
	}

	handleActions(action) {
		switch(action.type) {
			case "UPDATE_CACHED_TRADES": {
				this.updateCachedTrades(action.data);
				break;
			}
		}
	}
}

const pastTradeInfo = new PastTradeInfo();
var	dispatcher = new Dispatcher();
const pastTradeToken = dispatcher.register(pastTradeInfo.handleActions.bind(pastTradeInfo));

export const pastTradeDispatcher = dispatcher;
export default pastTradeInfo;