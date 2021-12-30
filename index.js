const express = require("express");
const app = express();
const port = "3400"

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("welcomeRiddle", {
        btnArr: ['1','2','3','4','5','6','7','8','9','10'],
        routeArr: ["/1","/2","/3","/4","/5","/6","/7","/8","/9","/10"]
    })
})

app.get("/2", (req, res) => {
    res.render("monthRiddle", {
        btnArr: ['1','2','3','4','5','6','7','8','9','10', '11', '12'],
        routeArr: ["/2/1","/2/2","/2/3","/2/4","/2/5","/2/6","/2/7","/2/8","/2/9","/2/10","/2/11","/2/12"]
    })
})

app.get("/:wrong", (req, res) => {
    const wrong = req.params["wrong"];
    res.render("wrongAnswer", {
        wrongAnswer: wrong,
        goBack: "/"
    });
})

app.get("/2/12", (req, res) => {
    res.render("blackWhiteHatRiddle", {
        btnArr: ['1','2','3','4'],
        routeArr: ["/2/12/1","/2/12/2","/2/12/3","/2/12/4"]
    })
})

app.get("/2/:wrong", (req, res) => {
    const wrong = req.params["wrong"];
    res.render("wrongAnswer", {
        wrongAnswer: wrong,
        goBack: "/2"
    });
})

app.get("/2/12/2", (req, res) => {
    res.render("correctComplete")
})

app.get("/2/12/:wrong", (req, res) => {
    const wrong = req.params["wrong"];
    res.render("wrongAnswer", {
        wrongAnswer: wrong,
        goBack: "/2/12"
    });
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.use(express.static(__dirname + '/public'));