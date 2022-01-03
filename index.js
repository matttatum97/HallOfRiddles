const express = require("express");
const session = require('express-session');
const app = express();
const port = process.env.PORT || "3400";

app.use(express.urlencoded({extended: true}))
app.use(express.json()) //To parse the incoming requests with JSON payloads

console.log("made it")

app.use(session({
  secret: 'random string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    let user = "";
    let punctuation = "";
    let invalid_login = false;

    invalid_login = req.query.reason || null;


    if (req.session && req.session.username) {
        user = req.session.username;
        punctuation = ","
    }
    res.render("index", {
        my_user: user,
        punctuation: punctuation,
        invalid_login:invalid_login
    })
})
app.post('/signup', (req, res) => {
    const valid_users = [
        {"name": "sue", "password": "sue"},
        {"name": "joe", "password": "joe"},
        {"name": "sam", "password": "sam"}
    ];
    const user = req.body.username;
    const pass = req.body.password;


    const found_user = valid_users.find(usr => {
        return usr.name == user && usr.password == pass;
    })

    if (found_user) {
        req.session.username = user;
        req.session.numOfTries = 1
        res.redirect("/welcomeRiddle")
    } else {
        req.session.destroy(() => {
            console.log("user reset")
        })
        res.redirect("/?reason=invalid_user&day=monday")
    }
})

app.get('/welcomeRiddle', (req, res) => {
    if (req.session && req.session.username) {
        res.render('welcomeRiddle', {
            user: req.session.username,
            btnArr: ['1','2','3','4','5','6','7','8','9','10'],
            routeArr: ["/1","/2","/3","/4","/5","/6","/7","/8","/9","/10"]})
    }
})

app.get("/2", (req, res) => {
    if (req.session && req.session.username) {
        res.render("monthRiddle", {
            btnArr: ['1','2','3','4','5','6','7','8','9','10', '11', '12'],
            routeArr: ["/2/1","/2/2","/2/3","/2/4","/2/5","/2/6","/2/7","/2/8","/2/9","/2/10","/2/11","/2/12"]
        })
    }
    
})


app.get("/:wrong", (req, res) => {
    if (req.session && req.session.username) {
        req.session.numOfTries += 1
        const wrong = req.params["wrong"];
        res.render("wrongAnswer", {
        wrongAnswer: wrong,
        goBack: "/welcomeRiddle"
    });
    }
    
})


app.get("/2/12", (req, res) => {
    if (req.session && req.session.username) {
        res.render("blackWhiteHatRiddle", {
            btnArr: ['1','2','3','4'],
            routeArr: ["/2/12/1","/2/12/2","/2/12/3","/2/12/4"]
        })
    }
    
})

app.get("/2/:wrong", (req, res) => {
    if (req.session && req.session.username) {
        req.session.numOfTries += 1
        const wrong = req.params["wrong"];
        res.render("wrongAnswer", {
        wrongAnswer: wrong,
        goBack: "/2"
    });
    }
    
})

app.get("/2/12/2", (req, res) => {
    if (req.session && req.session.username) {
        res.render("fractionRiddle", {
            btnArr: ["Childbirth", "Chiffon", "Chicago", "Chipmunk"],
            routeArr: ["/2/12/2/Childbirth", "/2/12/2/Chiffon", "/2/12/2/Chicago", "/2/12/2/Chipmunk",]
        })
    }
    
})

app.get("/2/12/:wrong", (req, res) => {
    if (req.session && req.session.username) {
        req.session.numOfTries += 1
        const wrong = req.params["wrong"];
        res.render("wrongAnswer", {
        wrongAnswer: wrong,
        goBack: "/2/12"
    });
    }
    
})

app.get("/2/12/2/Chicago", (req, res) => {
    if (req.session && req.session.username) {
        totalTries = req.session.numOfTries
        res.render("correctComplete", {
            totalTries: totalTries
        })
    }
    
})

app.get("/2/12/2/:wrong", (req, res) => {
    if (req.session && req.session.username) {
        req.session.numOfTries += 1
        const wrong = req.params["wrong"];
        res.render("wrongAnswer", {
        wrongAnswer: wrong,
        goBack: "/2/12/2"
    });
    }
    
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.use(express.static(__dirname + '/public'));



