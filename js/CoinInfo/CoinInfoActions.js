import { coinDispatcher } from "./CoinInfo.js";

export const newCoinSetter = function(newCoin) {
	coinDispatcher.dispatch({ type: "SET_NEW_COIN", data: newCoin });
}