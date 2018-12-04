const path = require('path');

let product = () => {
	return path.join('..', '..', 'build', 'Release', 'dns_sd_bindings');
}

try {
	module.exports = require(product());
} catch (ex) {
	console.error(ex);
}
