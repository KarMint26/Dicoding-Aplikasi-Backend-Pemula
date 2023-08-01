const fs = require('fs');

const callbackReadFile = (error, data) => {
    if(error){
        console.log("Gagal membaca data");
        return;
    }

    console.log(data);
}

fs.readFile(`${__dirname}/notes.txt`, "utf-8", callbackReadFile); // berjalan secara asynchronous

// fs.readFileSync(`${__dirname}/notes.txt`, "utf-8");
// console.log(data);