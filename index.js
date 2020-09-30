const http = require('http');
const url = require('url');
const fs = require('fs');
const personnummer = require('personnummer.js')
const port = 3000;
let txtContent = "";
let htmlContent = "";

const secretKey = 'ALBATROSS';
const path = '/secret';
readFile();
readFileHtml();

let server = http.createServer((request, response) => {
  
  let urlData = url.parse(request.url, true);
  response.write('<html><head><meta charset="utf-8">');

  if(request.url !='/favicon.ico'){

    if(secretKey == urlData.query.key && urlData.pathname == path) {
      response.write(htmlContent);
    }
    else if(urlData.pathname.length > 1){
      let number = urlData.pathname.replace("/", "");
      let isPersonNr = (personnummer.validate(number) ? number+' is valid' : number+' is NOT valid')
      response.write(isPersonNr);
    }else{
      response.write('<h2>Hello guest</h2>');
      response.write('<h3>' + txtContent + '</h3>');
    }
    response.end();
  }
});

server.listen(port, () => {
  console.log('Server is listening at port: ' + port);
});

function readFile(){
  fs.readFile('information.txt', (err, data) => {
    if(err){
      throw err;
    }
    txtContent = data;
  });
}

function readFileHtml(){
  fs.readFile('index.html', (err, data) => {
    if(err) {
      throw err;
    }
    htmlContent = data;
  });
}