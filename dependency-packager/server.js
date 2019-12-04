const packager = require('./packager');
const { Package } = require('./database');
const express = require('express');

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/', (req, res) => {
	const module = req.body.moduleName;
	const version = req.body.moduleVersion;
	Package.findOne({ module, version }, (err, result) => {
		if (!result || err) {
			const [Bundle, moduleVersion] = packager(module, version);
			const data = new Package({
				module,
				version,
				data: JSON.stringify(Bundle)
			});
			data.save();
			res.send(data);
		} else {
			res.send(result);
		}
	});
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
