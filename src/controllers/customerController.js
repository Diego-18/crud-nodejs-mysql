const controller = {};

/**
 * 
 * Customer List
 */
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        try {
            conn.query('SELECT * FROM customers', (err, rows) => {
                res.render('customers', {
                    data: rows
                });
            }); 
        } catch (err) {
            alert("Error found");
        }
    });
};

/**
 * Add a new customer
 */
controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        try {
            conn.query('INSERT INTO customers SET ?', data, (err, rows) => {
                res.redirect('/');
            });
        } catch (err) {
            alert("Error found");
        }         
    });
};

/**
 * View customer information
 */
controller.edit = (req, res) => {
    const {id} = req.params;

    req.getConnection((err, conn) => {
        try {
            conn.query('SELECT * FROM customers WHERE id = ?', [id], (err, rows) => {
                res.render('customers_edit', {
                    data: rows[0]
                });
            });
        } catch (err) {
            alert("Error found");
        }    
    });
};

/**
 * 
 * Update customer information
 */
controller.update = (req, res) => {
    const {id} = req.params;
    const newData = req.body;

    req.getConnection((err, conn) => {
        try {
            conn.query('UPDATE customers SET ? WHERE id = ?', [newData, id], (err, rows) => {
                res.redirect('/');
            });
        } catch (err) {
            alert("Error found");
        }
    });
};

/**
 * 
 * Delete a customer
 */
controller.delete = (req, res) => {
    const {id} = req.params;

    req.getConnection((err, conn) => {
        try {
            conn.query('DELETE FROM customers WHERE id = ?', [id], (err, rows) => {
                res.redirect('/');
            });
        } catch (err) {
            alert("Error found");
        }
    });
};

module.exports = controller;