const { Command } = require("commander");
const program = new Command();
const { selectLanguage, newComp, info, init} = require("../actions");

function main() {
  program
    .command("language [lang]")
    .description("select a language")
    .action(selectLanguage);

  program
    .command("info [keyword]")
    .description("Get the components available the the framework")
    .action(info);

  program
    .command("init")
    .description("Set up a folder structure in your cwd")
    .action(init);

  program
    .command("new <components...>")
    .description("Clone components")
    .action(newComp);

  program.parse();
}

module.exports = main;
