const { Command } = require("commander");
const program = new Command()
const {selectLanguage , newComp, selectFramework} = require("../actions")

function main(){
    program.command('language [lang]')
        .description('select a language')
        .action(selectLanguage)

    program.command('framework [framework]')
        .description('select a framework/library')
        .action(selectFramework)

    program.command('new <components...>')
            .description("Clone components")
            .action(newComp)

    // todo add -e for vim control?
    // todo components command to log all components with a xmall description
    
    program.parse()
}

module.exports = main
