const fs = require('fs');
const path = require('path');
const superagent = require('superagent');

// callback based
// fs.readFile(path.join(__dirname, 'dog.txt'), 'utf-8', (err, data) => {
// 	console.log(`Breed: ${data}`);

// 	superagent
// 		.get(`https://dog.ceo/api/breed/${data}/images/random`)
// 		.end((err, res) => {
// 			if (err) console.log(err.message);
// 			console.log(res.body.message);

// 			fs.writeFile('dog-img.txt', res.body.message, 'utf-8', (err) => {
// 				if (err) return console.log(err.message);
// 				console.log('Random dog image saved to file');
// 			});
// 		});
// });

// promise based
const readFilePromise = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf-8', (err, data) => {
			if (err) reject('I could not find that file');
			resolve(data);
		});
	});
};

const writeFilePromise = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, 'utf-8', (err) => {
			if (err) reject(err.message);
			resolve('Random dog image saved to file');
		});
	});
};

// readFilePromise(`${__dirname}/dog.txt`)
// 	.then((data) => {
// 		console.log(`Breed: ${data}`);
// 		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// 	})
// 	.then((res) => {
// 		console.log(res.body.message);

// 		return writeFilePromise('dog-img.txt', res.body.message);
// 	})
// 	.then((result) => console.log(result))
// 	.catch((err) => console.log(err));

// async - await
const getDogPic = async () => {
	try {
		const data = await readFilePromise(`${__dirname}/dog.txt`);
		console.log(`Breed: ${data}`);

		const res = await superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		// resolving multiple promises
		const res1Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		const res2Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		const res3Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
		const images = all.map((el) => el.body.message);

		await writeFilePromise('dog-img.txt', res.body.message);
		console.log('Random dog image sent to file');
	} catch (err) {
		console.log(err);
		throw err;
	}
};

getDogPic();
