import { pastTradeDispatcher } from "./PastTradeInfo.js";
import { Socket } from "../socket/socket.js";

Socket.on("trades-sent", (res) => {
	updateTrades(res[0].trades);
});


export const updateTrades = function(data) {
	pastTradeDispatcher.dispatch({type: "UPDATE_CACHED_TRADES", data})
} 