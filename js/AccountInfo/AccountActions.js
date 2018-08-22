import { accountDispatcher } from "./AccountInfo.js";
let scatter;


export const scatterListener =  document.addEventListener('scatterLoaded', scatterExtension => { 
	scatter = window.scatter;
	accountDispatcher.dispatch({type: "SCATTER_LOADED", data: scatter});
});

export const scatterLogin = function() {
	scatter.getIdentity({accounts:[{blockchain:'eos', host:'http://127.0.0.1', port:8888, chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"}]}).then(res=>{
		accountDispatcher.dispatch({ type: "SCATTER_LOGIN", data: res });
	});
}

export const accountSelect = function(selected) {
	accountDispatcher.dispatch({type: "ACCOUNT_SELECT", data: selected});
}

export const accountUpdateBalances = function() {
	accountDispatcher.dispatch({type: "UPDATE_ACCOUNT_BALANCE", data: null});
}

//{to, from, amount}
export const handleTransaction = function(transaction) {
	accountDispatcher.dispatch({type: "TRANSACTION", data: transaction});
}

export const scatterObject = scatter; 