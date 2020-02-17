const http = require("http");
const fs = require("fs");
const axios = require("axios");
const url = "https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/9ed13fd53a144528568d1187c1d34073b36101fd/categories.json";

http.createServer((req, res) => {
    axios.get(url).then(response => {

        fs.readFile("index.html", (err, info) => {
            let ind = info.toString();
            response.data.forEach(element => {
                ind = ind.replace("<!--{{placeholder}}-->",'<div class="card"> <div class="card-header" id="heading' +element.name.toString().replace(/ /g, "")+'"> <h2 class="mb-0"> <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'
                + element.name.toString().replace(/ /g, "") +'" aria-expanded="true" aria-controls="collapse' +element.name.toString().replace(/ /g, "") + '">'
                      +  element.name + '</button> </h2> </div> <div id="collapse' +element.name.toString().replace(/ /g, "") + '" class="collapse show" aria-labelledby="heading' +element.name.toString().replace(/ /g, "")+'" data-parent="#accordionExample"> <div class="card-body"> <div class="row">'
                        +  "<!--{{placeholderfor"+element.name+"}}-->" + "</div> </div> </div> </div> </div> " + "<!--{{placeholder}}-->");

                element.products.forEach(producto => {
                    ind = ind.replace("<!--{{placeholderfor"+element.name+"}}-->" ,
                        '<div class="col-sm-4"><div class="card"> <img src="'
                        + producto.image + '" class="card-img-top" alt="..."> <div class="card-body"> <h5 class="card-title"> '
                        + producto.name + '</h5> <p class="card-text">' +
                        producto.description + '</br> <b> '
                        + producto.price + '</b> </p> <a href="#" class="btn btn-primary">Add to car</a></div> </div> </div>' +  "<!--{{placeholderfor"+element.name+"}}-->"
                    );

                }
                );
            });
            res.write(ind);
            res.end();
        });
    })
}).listen(3000);