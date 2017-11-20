const randexp = require('randexp').randexp;
var Chance = require('chance');
chance = new Chance();

Object.keys(chance.__proto__).forEach(key => {
    exports[key] = (...arguments) => chance[key](getOptions(arguments));
});

// Basics
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
exports.firstName = exports.first;
exports.lastName = exports.last;
exports.birthday = (...arguments) => chance.birthday(getOptions(arguments)).toISOString();
exports.company = () => chance.company().replace(',', '');
exports.email = (...arguments) => {
    const defaults = arguments.pop();
    return getEmailFromDefaults(defaults);
}
exports.prefix = (...arguments) => {
    const defaults = arguments.pop();
    let options = getOptions(arguments);
    options[gender] = options[gender] || defaults['gender'] || chance.gender();
    return chance.prefix(options);
}

// Extras
exports.regexp = (...arguments) => {
    const regexp = arguments.slice(0, -1).join(' ');
    return randexp(regexp);
}

function getOptions(arguments) {
    let options = {};
    arguments.forEach(item => {
        if (typeof item !== 'string') {
            return;
        }

        const [ key, value ] = item.split('=');
        try {
            options[key] = JSON.parse(value);
        } catch (e) {
            options[key] = value;
        }
    });
    return options;
}

function getEmailFromDefaults(defaults) {
    const company = (defaults['company'] || chance.company()).split(/[\s\.,]+/)[0];
    
    const firstName = defaults['firstName'] || defaults['lastName'] || chance.first();
    
    const lastName = defaults['firstName'] && defaults['lastName']
    ? `.${defaults['lastName']}`
    : '';
    
    const email = `${firstName}${lastName}@${company}.com`;
    return email.toLowerCase();
}