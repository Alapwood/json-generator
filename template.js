var StringTemplates = require('./helpers/stringTemplates');

var repeatTemplateRegex = /{{repeat ([\d]*)}}/g;
const regex = /{{(.*?)(?!}}})}}/g;

function generateFromTemplate(template, defaults={}) {
    switch (typeof template) {
        case 'object':
            if (Array.isArray(template)) {
                return generateFromArray(template, defaults);
            }

            return generateFromObject(template, defaults);
        case 'string':
            return generateFromString(template, defaults);
        default:
            return template;
    }
}

function generateFromObject(template, defaults) {
    const myDefaults = JSON.parse(JSON.stringify(defaults));

    let result = {};
    Object.keys(template).forEach(key => {
        result[key] = generateFromTemplate(template[key], myDefaults);
    });
    return result;
}

function generateFromArray(template, defaults) {
    const myDefaults = JSON.parse(JSON.stringify(defaults));
    
    let newArray = [];
    let repeat = 1;
    template.forEach((item) => {
        const match = repeatTemplateRegex.exec(item);

        if (match) {
            repeat = parseInt(match[1]);
        } else {
            for (let i = 0; i < repeat; i += 1) {
                newArray.push(generateFromTemplate(item, myDefaults));
            }
            
            repeat = 1;
        }
    });

    return newArray;
}

function generateFromString(template, defaults) {
    const result = template.replace(regex, (match, templateString) => {
        const templateFunction = templateString.split(' ')[0];
        const templateArguments = templateString.split(' ').slice(1);

        if (StringTemplates.hasOwnProperty(templateFunction)) {
            return defaults[templateFunction] = StringTemplates[templateFunction](defaults, ...templateArguments);
        }

        return match;
    });

    try {
        JSON.parse(result);
    } catch (e) {
        return result;
    }
    
    return JSON.parse(result);
}

module.exports = generateFromTemplate;