const acorn = require("acorn");

const syntaxPlugins = {
  literal: require("./plugin/literal"),
  guangKeyword: require("./plugin/guangKeyword"),
};

const defaultOptions = {
  plugins: [],
};

function parse(sourceCode, options) {
  const resolveOptions = Object.assign({}, defaultOptions, options);
  const newParser = resolveOptions.plugins.reduce((Parser, pluginName) => {
    let plugin = syntaxPlugins[pluginName];
    return plugin ? Parser.extend(plugin) : Parser;
  }, acorn.Parser);
  return newParser.parse(sourceCode, { locations: true });
}

module.exports = { parse };
