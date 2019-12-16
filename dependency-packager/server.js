require('dotenv').config();
const packager = require('./packager');
const { Package } = require('./database');
const express = require('express');

const PORT = process.env.DEPENDENCY_SERVER_PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/', (req, res) => {
	const { moduleName, moduleVersion } = req.body;
	try {
		Package.findOne(
			{ module: moduleName, version: moduleVersion },
			(err, result) => {
				if (!result || err) {
					const [Bundle, version] = packager(
						moduleName,
						moduleVersion
					);
					const data = new Package({
						module: moduleName,
						version: moduleVersion,
						data: JSON.stringify(Bundle)
					});
					data.save();
					res.send(data);
				} else {
					res.send(result);
				}
			}
		);
	} catch (e) {
		res.send('error');
	}
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
