const conf = new(require("conf"))()

const selectLanguage = (lang) => {
    if(lang){
        let lg = lang.toLowerCase();
        if(lg === "ts" || lg === "typescript"){
            conf.set("language", "ts")
            console.log("Language set to ts")
        }else if(lg === "js" || lg === "javascript"){
            conf.delete("language")
            conf.set("language", "js")
            console.log("Language set to js")
        }else{
            console.log("Accepted languages: javascript/js || typescript/ts")
        }
    }else{
        if(conf.get('language') === undefined){
            conf.set("language", "js")
            console.log("Language selected is js")
        }else{
            console.log("Language selected is " + conf.get('language'))
        }
    }
}

module.exports = selectLanguage