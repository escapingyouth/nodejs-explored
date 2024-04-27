// using this module allows access to various methods related to the file system
const fs = require('fs');

// BLOCKING/SYNCHRONOUS
// reading files in node
const readFile = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(readFile);

// writing to files in node
const newText = `This is what we know about the avocado${readFile}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', newText);
console.log('File written');

// NON-BLOCKING/ASYNCHRONOUS

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
// 	console.log(data);
// });
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
	console.log('ERROR!💥');
	if (err) return;
	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
		console.log(data2);

		fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
			console.log(data3);

			fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
				console.log('Your file has been written😉');
			});
		});
	});
});

console.log('Reading file...');
