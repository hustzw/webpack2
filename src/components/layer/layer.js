// import tpl from './layer.html'
var tpl = require('./layer.html')

function layer(argument) {
	return {
		name:'layer',
		tpl: tpl
	};
}

export default layer;