const randexp = require('randexp').randexp;
var Chance = require('chance');
chance = new Chance();

// Basics
exports.bool = () => chance.bool();
exports.capital = () => chance.letter({casing: 'upper'});
exports.character = () => chance.character();
exports.integer = (n1, n2) => {
    const min = Math.min(n1, n2) || 0;
    const max = Math.max(n1, n2) || n1;
    return chance.integer({min, max});
};
exports.floating = (n1, n2) => {
    const min = Math.min(n1, n2) || 0;
    const max = Math.max(n1, n2) || n1;
    return chance.floating({min, max});
};
exports.letter = () => chance.letter({casing: 'lower'});
exports.string = (length) => chance.string({length});

// Text
exports.paragraph = (sentences) => chance.paragraph({sentences});
exports.sentence = (words) => chance.sentence({words});
exports.syllable = () => chance.syllable();
exports.word = (length) => chance.word({length});

// Person
exports.age = (type) => chance.age({type});
exports.birthday = (type) => chance.birthday({type}).toISOString();
exports.company = () => chance.company().replace(',', '');
exports.email = (defaults) => {
    const company = (defaults['company'] || chance.company()).split(/[\s\.,]+/)[0];
    
    const firstName = defaults['firstName'] || defaults['lastName'] || chance.first();
    
    const lastName = defaults['firstName'] && defaults['lastName']
    ? `.${defaults['lastName']}`
    : '';
    
    const email = `${firstName}${lastName}@${company}.com`;
    return email.toLowerCase();
}

exports.firstName = () => chance.first();
exports.gender = () => chance.gender();
exports.lastName = () => chance.last();
exports.prefix = (full, defaults) => {
    const gender = defaults['gender'] || chance.gender();
    return chance.prefix({full: full.toLower() === 'full'}, gender);
}
exports.profession = () => chance.profession({rank: true});
exports.suffix = (full) => chance.suffix({full});

// Extras
exports.regexp = (...arguments) => {
    const regexp = arguments.slice(0, -1).join(' ');
    return randexp(regexp);
}