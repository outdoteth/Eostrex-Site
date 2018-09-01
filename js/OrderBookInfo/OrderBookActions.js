import { orderBookDispatcher } from "./OrderBookInfo.js";

var socket = io();
socket.emit('order-request', "gem");
socket.on("orders-sent", (res) => {
	updateOrders(res);
});

export const updateOrders = function(data) {
	orderBookDispatcher.dispatch({ type: "UPDATE_ORDERS", data })
}