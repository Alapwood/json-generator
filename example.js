const TemplateToJson = require("./index");

const express = require("express");
const app = express();

app.use("/", express.static("public"));

app.get("/contacts", (req, res) => {
  var template = {
    company: "{{company}}",
    employees: [
      "{{repeat 10}}",
      {
        name: "{{firstName}} {{lastName}}",
        age: "{{age}}",
        profession: "{{profession}}",
        favouriteNumber: "{{integer min=0 max=100}}"
      }
    ]
  };

  res.json(TemplateToJson(template), null, 2);
});

app.listen(3001, () => console.log("Mock API listening on port 3001!"));
