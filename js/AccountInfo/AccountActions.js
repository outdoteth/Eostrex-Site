import { accountDispatcher } from "./AccountInfo.js";
let scatter;


export const scatterListener =  document.addEventListener('scatterLoaded', scatterExtension => { 
	scatter = window.scatter;
	accountDispatcher.dispatch({type: "SCATTER_LOADED", data: scatter});
});

export const scatterLogin = function() {
	scatter.getIdentity({accounts:[{blockchain:'eos', host:'192.99.200.155', port:8888, chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"}]}).then(res=>{
		accountDispatcher.dispatch({ type: "SCATTER_LOGIN", data: res });
	});
}

export const accountSelect = function(selected) {
	accountDispatcher.dispatch({type: "ACCOUNT_SELECT", data: selected});
}

export const scatterObject = scatter; 