const Template = require('./template');

var template = {
    company: '{{company}}',
    people: [
        '{{repeat 3}}',
        {
            profession: '{{profession}}',
            name: '{{firstName}} {{lastName}}',
            email: '{{email}}',
        },
        '{{floating 10}}',
    ],
};

console.log(JSON.stringify(Template(template), null, 2));