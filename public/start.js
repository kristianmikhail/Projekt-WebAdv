console.log("Helloo");

fetch('http://localhost:3000/all', )
    .then(res => res.text()) // or JSON, if you expect a JSON response
    .then(res => console.log(res));

    


