const controller = {};

/**
 * Customer List
 */
controller.list = (req, res) => {
	req.getConnection((err, conn) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Error occurred');
		}

		conn.query('SELECT * FROM customers', (err, rows) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Error occurred');
			}

			res.render('customers', {
				data: rows,
			});
		});
	});
};

/**
 * Add a new customer
 */
controller.save = (req, res) => {
	const data = req.body;
	req.getConnection((err, conn) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Error occurred');
		}

		conn.query('INSERT INTO customers SET ?', data, (err, rows) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Error occurred');
			}

			res.redirect('/');
		});
	});
};

/**
 * View customer information
 */
controller.edit = (req, res) => {
	const { id } = req.params;

	req.getConnection((err, conn) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Error occurred');
		}

		conn.query(
			'SELECT * FROM customers WHERE id = ?',
			[id],
			(err, rows) => {
				if (err) {
					console.error(err);
					return res.status(500).send('Error occurred');
				}

				res.render('customers_edit', {
					data: rows[0],
				});
			}
		);
	});
};

/**
 * Update customer information
 */
controller.update = (req, res) => {
	const { id } = req.params;
	const newData = req.body;

	req.getConnection((err, conn) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Error occurred');
		}

		conn.query(
			'UPDATE customers SET ? WHERE id = ?',
			[newData, id],
			(err, rows) => {
				if (err) {
					console.error(err);
					return res.status(500).send('Error occurred');
				}

				res.redirect('/');
			}
		);
	});
};

/**
 * Delete a customer
 */
controller.delete = (req, res) => {
	const { id } = req.params;

	req.getConnection((err, conn) => {
		if (err) {
			console.error(err);
			return res.status(500).send('Error occurred');
		}

		conn.query('DELETE FROM customers WHERE id = ?', [id], (err, rows) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Error occurred');
			}

			res.redirect('/');
		});
	});
};

module.exports = controller;
