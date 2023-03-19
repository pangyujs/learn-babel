const acorn = require("acorn");

const Parser = acorn.Parser;
const TokenType = acorn.TokenType;

Parser.acorn.keywordTypes["meng"] = new TokenType("meng", { keyword: "meng" });

const mengKeyword = function (Parser) {
  return class extends Parser {
    parse(program) {
      let newKeywords =
        "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super";
      newKeywords += " meng";
      this.keywords = new RegExp(
        "^(?:" + newKeywords.replace(/ /g, "|") + ")$"
      );
      return super.parse(program);
    }

    parseStatement(context, topLevel, exports) {
      const startType = this.type;
      if (startType === Parser.acorn.keywordTypes["meng"]) {
        const node = this.startNode();
        return this.parseMengStatement(node);
      } else {
        return super.parseStatement(context, topLevel, exports);
      }
    }

    parseMengStatement(node) {
      this.next();
      return this.finishNode({ value: "meng" }, "MengStatement");
    }
  };
};

const newParser = Parser.extend(mengKeyword);

const program = `
  meng 
  const a = 1
`;

const ast = newParser.parse(program);
console.log(ast);
