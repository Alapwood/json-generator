const randexp = require('randexp').randexp;
var Chance = require('chance');
chance = new Chance();

// Basics
exports.bool = () => chance.bool();
exports.capital = () => chance.letter({casing: 'upper'});
exports.character = () => chance.character();
exports.integer = (defaults, n1, n2) => {
    const min = Math.min(n1, n2) || 0;
    const max = Math.max(n1, n2) || n1;
    return chance.integer({min, max});
};
exports.floating = (defaults, n1, n2) => {
    const min = Math.min(n1, n2) || 0;
    const max = Math.max(n1, n2) || n1;
    return chance.floating({min, max});
};
exports.letter = () => chance.letter({casing: 'lower'});
exports.string = (defaults, length) => chance.string({length});

// Text
exports.paragraph = (defaults, sentences) => chance.paragraph({sentences});
exports.sentence = (defaults, words) => chance.sentence({words});
exports.syllable = () => chance.syllable();
exports.word = (defaults, length) => chance.word({length});

// People
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
exports.lastName = () => chance.last();
exports.profession = () => chance.profession({rank: true});

// Extras
exports.regexp = (defaults, ...arguments) => {
    const regexp = arguments.join(' ');
    return randexp(regexp);
}