console.log("Helloo");

fetch('http://localhost:3000/posttest', {
    method: 'POST',
    headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(
    {"msg":"Some message","other":"Other msg"}
    )
})
    .then(res => res.text()) // or JSON, if you expect a JSON response
    .then(res => console.log(res));
