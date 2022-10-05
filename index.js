import { builder } from '@snowytime/xmlify';

const myXml = builder({
	tree: {
		purchase: {
			order_id: 'my order id',
		},
	},
});
console.log(myXml);
