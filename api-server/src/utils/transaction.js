import Transaction from 'mongoose-transactions';

const defaultFailHandler = error => console.error(error);

Transaction.prototype.runAndTerminate = function({
	successHandler,
	failHandler = defaultFailHandler
}) {
	const transaction = this;
	transaction
		.run()
		.then(successHandler)
		.catch(error => {
			failHandler(error);
			transaction
				.rollback()
				.then(() => {
					transaction.clean();
					res.sendStatus(500);
				})
				.catch(() => res.sendStatus(500));
		});
};

export default Transaction;
