var StringTemplates = require("./helpers/stringTemplates");

var repeatTemplateRegex = /{{repeat ([\d]*)}}/g;
const regex = /{{(.*?)(?!}}})}}/g;

function generateFromTemplate(template, defaults = {}) {
  switch (typeof template) {
    case "object":
      if (Array.isArray(template)) {
        return generateFromArray(template, defaults);
      }

      return generateFromObject(template, defaults);
    case "string":
      return generateFromString(template, defaults);
    default:
      return template;
  }
}

function generateFromObject(template, defaults) {
  const myDefaults = JSON.parse(JSON.stringify(defaults));

  return Object.keys(template).reduce((acc, key) => {
    acc[key] = generateFromTemplate(template[key], myDefaults);
    return acc;
  }, {});
}

function generateFromArray(template, defaults) {
  const myDefaults = JSON.parse(JSON.stringify(defaults));

  return template.reduce(
    (acc, item) => {
      let { newArray, repeat } = acc;
      const match = repeatTemplateRegex.exec(item);

      if (match) {
        repeat = parseInt(match[1]);
      } else {
        while (repeat > 0) {
          newArray.push(generateFromTemplate(item, myDefaults));
          repeat -= 1;
        }
        repeat = 1;
      }
      return { newArray, repeat };
    },
    { newArray: [], repeat: 1 }
  );

  return newArray;
}

function generateFromString(template, defaults) {
  const result = template.replace(regex, (match, templateString) => {
    const [templateFunction, ...templateArguments] = templateString.split(" ");

    if (StringTemplates.hasOwnProperty(templateFunction)) {
      return (defaults[templateFunction] = StringTemplates[templateFunction](
        defaults,
        ...templateArguments
      ));
    }

    return match;
  });

  try {
    return JSON.parse(result);
  } catch (e) {
    return result;
  }
}

module.exports = generateFromTemplate;
