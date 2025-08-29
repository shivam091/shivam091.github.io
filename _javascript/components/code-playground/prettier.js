import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserPostcss from "prettier/parser-postcss";

export async function formatCode(code, type) {
  let parser, plugins;

  switch(type) {
    case "html":
      parser = "html";
      plugins = [parserHtml];
      break;
    case "css":
      parser = "css";
      plugins = [parserPostcss];
      break;
    case "js":
      parser = "babel";
      plugins = [parserBabel];
      break;
    default:
      parser = "babel";
      plugins = [parserBabel];
  }

  return prettier.format(code, {
    parser,
    plugins,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    bracketSpacing: true,
    arrowParens: "always",
  });
}
