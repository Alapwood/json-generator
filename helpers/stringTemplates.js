const Chance = require("chance");
const randexp = require("randexp").randexp;
const getChanceOptions = require("./getChanceOptions");

chance = new Chance();

Object.keys(chance.__proto__).forEach(key => {
  exports[key] = (...arguments) => chance[key](getChanceOptions(arguments));
});

// Basics
exports.first = (defaults, ...arguments) => {
  let options = getChanceOptions(arguments);
  defaults.gender = options.gender =
    options.gender || defaults.gender || chance.gender();
  return chance.first(options);
};
exports.firstName = exports.first;
exports.lastName = exports.last;
exports.birthday = (defaults, ...arguments) =>
  chance.birthday(getChanceOptions(arguments)).toISOString();
exports.company = () => chance.company().replace(",", "");
exports.email = (defaults, ...arguments) => {
  const company = (defaults.company || chance.company()).split(/[\s\.,]+/)[0];
  const firstName = defaults.firstName || defaults.lastName || chance.first();
  const lastName =
    defaults.firstName && defaults.lastName ? `.${defaults.lastName}` : "";
  const email = `${firstName}${lastName}@${company}.com`;
  return email.toLowerCase();
};
exports.gender = (defaults, ...arguments) => {
  return defaults.gender || chance.gender(getChanceOptions(arguments));
};
exports.prefix = (defaults, ...arguments) => {
  let options = getChanceOptions(arguments);
  defaults.gender = options.gender =
    options.gender || defaults.gender || chance.gender();
  return chance.prefix(options);
};

// Extras
exports.regexp = (defaults, ...arguments) => {
  const regexp = arguments.join(" ");
  return randexp(regexp);
};
