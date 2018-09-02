import { EventEmitter } from "events";
import { Dispatcher  } from "flux";

class OrderBookInfo extends EventEmitter {
	constructor() {
		super();
		this.buyOrders = [];
		this.sellOrders = [];
	}

	updateOrders(orders) {
		this.buyOrders = orders[0].buyOrders;
		this.sellOrders = orders[0].sellOrders;
		this.emit("ORDERS_UPDATED");
		console.log(this.sellOrders);
	}

	handleActions(action) {
		switch(action.type) {
			case "UPDATE_ORDERS": {
				this.updateOrders(action.data);
				break;
			}
		}
	}
}

const orderBookInfo = new OrderBookInfo();
var	dispatcher = new Dispatcher();
const orderBookToken = dispatcher.register(orderBookInfo.handleActions.bind(orderBookInfo));

export const orderBookDispatcher = dispatcher;
export default orderBookInfo;