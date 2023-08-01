const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Homepage";
    },
  },
  {
    method: "*",
    path: "/",
    handler: (request, h) => {
      return "Halaman tidak dapat diakses dengan method tersebut.";
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "About page";
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (request, h) => {
      return "Halaman tidak dapat diakses dengan method tersebut.";
    },
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return "Halaman tidak ditemukan";
    },
  },
  {
    method: "GET",
    path: "/hello/{name?}",
    handler: (request, h) => {
      const { name = "stranger" } = request.params;

      const { lang } = request.query;

      if (lang === "id") {
        return `Hai, ${name}!`;
      } else if (lang === "it") {
        return `CIAO, ${name}!`;
      } else if (lang === "ru") {
        return `Privyet, ${name}!`;
      }

      return `Hello, ${name}!`;
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: (request, h) => {
      const { username, password } = request.payload;
      return `Welcome ${username}!\nyour password is ${password}\n`;
    },
  },
  {
    method: "GET",
    path: "/random",
    handler: (request, h) => {
        return h.response('success')
            .type('text/plain')
            .header('X-User-ID', 'ID234');
    },
  }
];

module.exports = routes;
