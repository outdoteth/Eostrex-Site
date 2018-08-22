import { myOrderDispatcher } from "./MyOrderInfo.js";

export const getMyOrders = function() {
	myOrderDispatcher.dispatch({ type: "GET_ORDERS", data: null });
}