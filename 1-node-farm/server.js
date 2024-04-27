const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate.js');

const templateOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);
const templateCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);
const templateProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
	const { pathname, query } = url.parse(req.url, true);

	// overview page
	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, {
			'Content-type': 'text/html'
		});

		const cardsHtml = dataObj
			.map((el) => replaceTemplate(templateCard, el))
			.join('');

		const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

		res.end(output);
	}

	// product page
	else if (pathname === '/product') {
		res.writeHead(200, {
			'Content-type': 'text/html'
		});

		const product = dataObj.find((el) => el.id === Number(query.id));
		const output = replaceTemplate(templateProduct, product);

		res.end(output);
	}

	// API
	else if (pathname === '/api') {
		res.writeHead(200, {
			'Content-type': 'application/json'
		});
		res.end(data);
	}

	// not found
	else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world'
		});
		res.end('<h1>Page not found!</html>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening on port 8000');
});
