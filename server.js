const express = require("express");
const app = express();
const PORT = 3000;

app.use('/', express.static('public'));

app.get("/welcome", (res, req)=>{
    res.send("Welcome to the REST API!");
})

app.get("/", (req, res) => {
res.send("Welcome to the REST API!");
});


app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/posttest', express.json(), (req,res)=>{
    const {body} = req;
    console.log(body.msg)
    res.send('POST request to the homepage with ' + body.msg);
})


