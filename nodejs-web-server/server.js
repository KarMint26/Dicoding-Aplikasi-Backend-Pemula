const http = require('http');
const port = 7000;
const host = "localhost";

const requestListener = (request, response) => {
    const { method, url } = request;
    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Powered-By", "NodeJS");

    switch(url){
        case "/":
            switch(method){
                case "GET":
                    response.statusCode = 200;
                    response.end(JSON.stringify({
                        message: "Ini adalah homepage",
                    }));
                    break;
                case "POST":
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        message: `Halaman tidak dapat diakses dengan ${method} request`,
                    }));
                    break;
                case "PUT":
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        message: `Halaman tidak dapat diakses dengan ${method} request`,
                    }));
                    break;
                case "DELETE":
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        message: `Halaman tidak dapat diakses dengan ${method} request`,
                    }));
                    break;
                default:
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        message: "Request Method Invalid",
                    }));
                    break;
            }
            break;
        case "/about":
            switch(method){
                case "GET":
                    response.statusCode = 200;
                    response.end(JSON.stringify({
                        message: "Halo! ini adalah halaman about",
                    }));
                    break;
                case "POST":
                    let body = [];

                    request.on('data', (chunk) => {
                        body.push(chunk);
                    });

                    request.on('end', () => {
                        body = JSON.parse(Buffer.concat(body).toString());
                        const { name } = body;
                        response.end(JSON.stringify({
                            message: `Halo, ${name}! ini adalah halaman about`,
                        }));
                    });
                    response.statusCode = 200;
                    break;
                case "PUT":
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        message: `Halaman tidak dapat diakses dengan ${method} request`,
                    }));
                    break;
                case "DELETE":
                    response.statusCode = 400;
                    response.end(JSON.stringify({
                        message: `Halaman tidak dapat diakses dengan ${method} request`,
                    }));
                    break;
                default:
                    response.statusCode = 400
                    response.end(JSON.stringify({
                        message: "Request Method Invalid",
                    }));
                    break;
            }
            break;
        default:
            response.statusCode = 404;
            response.end(JSON.stringify({
                message: "Halaman tidak ditemukan!",
            }));
            break;
    }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Your Server is Running on http://${host}:${port}`);
});