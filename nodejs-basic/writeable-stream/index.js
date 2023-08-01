    /**
     * TODO:
     * Buatlah program untuk membaca teks input.txt dan menuliskannya ulang pada berkas output.txt
     * menggunakan teknik readable stream dan writable stream.
     */

const fs = require('fs');

const readableStream = fs.createReadStream(`${__dirname}/input.txt`, {
    highWaterMark: 15
});

const writeableStream = fs.createWriteStream(`${__dirname}/output.txt`);

readableStream.on('readable', () => {
    try {
        writeableStream.write(`${readableStream.read()}\n`);
    } catch (error) {
        console.log(error);
    }
});