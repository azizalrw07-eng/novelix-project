const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.use(session({
    secret: "novelix",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");
app.set("views", "./Views");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "novelix"
});

db.connect(function(err){

    if(err){
        console.log(err);
    }

    else{
        console.log("Database Connected");
    }

});

app.get("/", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    const sql = "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql, [username, password], function(err, result){

        if(err){
            console.log(err);
        }

        else{

            if(result.length > 0){

                req.session.user = username;

                res.redirect("/home");
            }

            else{
                res.send("Wrong Username or Password");
            }

        }

    });

});

app.get("/home", function(req, res){

    if(req.session.user){
       res.render("home", { username: req.session.user });
    }

    else{
        res.redirect("/");
    }

});

app.get("/products", function(req, res){

    const sql = "SELECT * FROM items";

    db.query(sql, function(err, result){

        if(err){
            console.log(err);
        }

        else{
            res.render("products", {products: result});
        }

    });

});

app.get("/cart", function(req, res){
    res.render("cart");
});
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = "customer";

    const sql = "INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)";

    db.query(sql, [username, password, role, email], function(err, result){

        if(err){
            console.log(err);
            res.send("Registration Error");
        }

        else{
            res.redirect("/");
        }

    });

});
app.get("/buy", function(req, res){
    res.render("buy");
});

app.post("/buy", function(req, res){

    const custname = req.session.user || "customer";
    const total = req.body.total;
    const payment = req.body.payment;
    const note = req.body.note;

    const sql = "INSERT INTO orders (custname, total, payment_method, note) VALUES (?, ?, ?, ?)";

    db.query(sql, [custname, total, payment, note], function(err, result){

        if(err){
            console.log(err);
            res.send("Order Error");
        }

        else{
           res.send("Order Completed Successfully");
        }

    });

});
app.get("/manage", function(req, res){

    const sql = "SELECT * FROM items";

    db.query(sql, function(err, result){

        if(err){
            console.log(err);
        }

        else{
            res.render("manage", {items: result});
        }

    });

});


app.post("/add-item", function(req, res){

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    const sql = "INSERT INTO items (title, description, price, image) VALUES (?, ?, ?, ?)";

    db.query(sql, [title, description, price, image], function(err, result){

        if(err){
            console.log(err);
        }

        else{
            res.redirect("/manage");
        }

    });

});


app.get("/delete-item/:id", function(req, res){

    const id = req.params.id;

    const sql = "DELETE FROM items WHERE id=?";

    db.query(sql, [id], function(err, result){

        if(err){
            console.log(err);
        }

        else{
            res.redirect("/manage");
        }

    });

});
app.get("/edit-item/:id", function(req, res){

    const id = req.params.id;

    const sql = "SELECT * FROM items WHERE id=?";

    db.query(sql, [id], function(err, result){

        if(err){
            console.log(err);
        }

        else{
            res.render("edit", {item: result[0]});
        }

    });

});


app.post("/update-item/:id", function(req, res){

    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    const sql = "UPDATE items SET title=?, description=?, price=?, image=? WHERE id=?";

    db.query(sql, [title, description, price, image, id], function(err, result){

        if(err){
            console.log(err);
        }

        else{
            res.redirect("/manage");
        }

    });

});
app.get("/logout", function(req, res){

    req.session.destroy(function(err){

        if(err){
            console.log(err);
        }

        res.redirect("/");

    });

});
app.get("/search", function(req, res){
    res.render("search");
});

app.post("/search", function(req, res){

    const bookname = req.body.bookname.toLowerCase();

    const sql = "SELECT * FROM items";

    db.query(sql, function(err, result){

        if(err){
            console.log(err);
        }

        else{
            const filtered = result.filter(function(item){
                return item.title.toLowerCase().includes(bookname);
            });

            res.render("search", { product: filtered });
        }

    });

});
app.listen(3000, function(){
    console.log("Server running on port 3000");
});