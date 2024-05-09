const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

// const expressHbs = require('express-handlebars');
// const {engine} = require('express-handlebars')

const app = express();

// app.engine(
// 	'hbs',
// 	expressHbs.engine({
// 		layoutsDir: path.join(__dirname, 'views', 'layouts'),
// 		defaultLayout: 'main-layout',
// 		extname: 'hbs'
// 	})
// );
// app.set('view engine', 'pug');
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/* express.static serves static files from a specific folder. 
Static files are typically HTML, CSS, JS, image, etc files that are created before your app runs 
and their content doesn't change. 
express.static checks every incoming request and if it's for a static file then it serves it.*/

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
