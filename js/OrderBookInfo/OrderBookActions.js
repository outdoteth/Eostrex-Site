import { orderBookDispatcher } from "./OrderBookInfo.js";
import { Socket } from "../socket/socket.js";

Socket.on("orders-sent", (res) => {
	updateOrders(res);
});

export const updateOrders = function(data) {
	orderBookDispatcher.dispatch({ type: "UPDATE_ORDERS", data })
}