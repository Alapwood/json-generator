function getChanceOptions(arguments) {
  let options = {};
  arguments.forEach(item => {
    if (typeof item !== "string") {
      return;
    }

    const [key, value] = item.split("=");
    try {
      options[key] = JSON.parse(value);
    } catch (e) {
      options[key] = value;
    }
  });
  return options;
}

module.exports = getChanceOptions;
