require("babel-register");

const router = require("./Routers").default;
const Sitemap = require("../").default;

(
new Sitemap(router)
  .build("http://localhost:3000/#/accueil")
  .save("./sitemap.xml")
);