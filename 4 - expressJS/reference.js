const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
/* parses incoming requests that have a HTTP Content-Type Header of "application/x-www-form-urlencoded". 
The extended property limits what type of data can be parsed (false means only strings and arrays).*/

app.use('/users', (req, res, next) => {
	console.log('Hello from users page');
	res.send('<h1>Users Page</h1>');
}); // runs for all requests that begin with '/users'

app.use('/add-product', (req, res, next) => {
	res.send(
		"<form action='/product' method='POST'><input type='text' name='title'/> <button type='submit'>Add Product</button></form>"
	);
});

app.use('/product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

app.use('/', (req, res, next) => {
	console.log('Hello from home page');
	res.send('<h1>Home Page</h1>');
});
/* unless the middleware of a route is specified e.g '/users'
 this middleware will run for all routes */

/* The reason we don't place '/users' after '/' is because
the requests runs from top to bottom so if we don't call next
it never reaches '/users'
*/

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
