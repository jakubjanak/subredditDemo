const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");
// console.log(redditData);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/cats", (req, res) => {
    const cats = [
        "Naked", "Sam", "Oscar", "Micinka", "Ellie"
    ]
    res.render("cats", { cats });
})

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random.ejs", { rand: num });
})

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if(data) {
        res.render("subreddit", { ...data }); // ...data nám umožní přístup přímo k hodnotám v data.json, budeme je moct volat podle jejich klíčů
    } else {
        res.render("notfound", { subreddit });
    }
    
})

app.listen(3000, () => console.log("Listening on port 3000:"));