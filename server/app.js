const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clothes_orders",
});

// AUTHENTICATION

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/register')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth)

// CHECK USER STATUS

app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         id, name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1}); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2, id: result[0].id }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3, id: result[0].id }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4, id: result[0].id }); // is user
            }
        }
    });
});


app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND password = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, password, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome!', type: 'info' });
    });
});

// AUTHENTICATION END


//CREATE
app.post("/server/clothes", (req, res) => {
    const sql = `
    INSERT INTO clothes (type, color, price, image, name)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.type, req.body.color, req.body.price, req.body.image, req.body.name], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/home/orders/:id", (req, res) => {
    const sql = `
    INSERT INTO orders (comment, size , clothe_id, client_id)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.comment, req.body.size, req.body.clothe_id, req.body.client_id, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//READ ALL
app.get("/server/clothes", (req, res) => {
    const sql = `
    SELECT *
    FROM clothes
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//READ ALL HOME
app.get("/home/clothes", (req, res) => {
    const sql = `
    SELECT *
    FROM clothes
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/server/orders", (req, res) => {
    const sql = `
    SELECT c.*, o.id, o.size, o.comment, o.client_id, o.status
    FROM clothes AS c
    LEFT JOIN orders AS o
    ON o.clothe_id = c.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// client
app.get("/home/client", (req, res) => {
    const sql = `
    SELECT id, name
    FROM users
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// FOR JOINED LIST
// app.get("/server/all", (req, res) => {
//     const sql = `
//     SELECT title, c.*, s.id AS sid, price
//     FROM electricity_suppliers AS s
//     INNER JOIN electricity_consumers AS c
//     ON c.supplier_id = s.id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

//DELETE
app.delete("/server/clothes/:id", (req, res) => {
    const sql = `
    DELETE FROM clothes
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.delete("/server/orders/:id", (req, res) => {
    const sql = `
    DELETE FROM orders
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//EDIT
app.put("/server/clothes/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE clothes
        SET type = ?, color = ?, price = ?, name = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.type, req.body.color, req.body.price, req.body.name, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE clothes
        SET type = ?, color = ?, price = ?, name = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.color, req.body.price, req.body.name, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE clothes
        SET type = ?, color = ?, name = ?, price = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.color, req.body.price, req.body.name, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/server/orders/:id", (req, res) => {
    const sql = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.status, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Elektra teka per ${port} portą!`)
});






// // READ
// // SELECT column1, column2, ...
// // FROM table_name;

// // app.get("/trees/:tipas", (req, res) => {

// //     // console.log(req.query.sort);

// //     const sql = `
// //     SELECT id, type, title, height
// //     FROM trees
// //     WHERE type = ? OR type = ?
// //     `;
// //     con.query(sql, [req.params.tipas, req.query.sort], (err, result) => {
// //         if (err) throw err;
// //         res.send(result);
// //     });
// // });

// // INNER JOIN
// // SELECT column_name(s)
// // FROM table1
// // INNER JOIN table2
// // ON table1.column_name = table2.column_name;
// app.get("/get-it/inner-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     INNER JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/left-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     LEFT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/right-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     RIGHT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });





// // READ (all)
// app.get("/trees", (req, res) => {
//     const sql = `
//     SELECT id, type, title, height
//     FROM trees
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //CREATE
// // INSERT INTO table_name (column1, column2, column3, ...)
// // VALUES (value1, value2, value3, ...);
// app.post("/trees", (req, res) => {
//     const sql = `
//     INSERT INTO trees (title, height, type)
//     VALUES (?, ?, ?)
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //DELETE
// // DELETE FROM table_name WHERE condition;
// app.delete("/trees/:id", (req, res) => {
//     const sql = `
//     DELETE FROM trees
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //EDIT
// // UPDATE table_name
// // SET column1 = value1, column2 = value2, ...
// // WHERE condition;
// app.put("/trees/:id", (req, res) => {
//     const sql = `
//     UPDATE trees
//     SET title = ?, height = ?, type = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });