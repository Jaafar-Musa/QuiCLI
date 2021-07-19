const conf = new(require("conf"))()
const path = require('path')
const fs = require('fs')

const createComponent = (components) =>{
    // cwd
    const cwd = process.cwd()
    const language = conf.get('language');
    const framework = conf.get("framework")
    // loop through the array
    for(let i = 0; i < components.length; i++){
        if(language === "ts" || "js"){
            let extension = language + "x"
            let file_location = path.join(cwd,"path",framework,language,components[i] + "." + extension);
            let file_location2 = path.join(cwd,"path",framework,language,components[i] + "." + language);
            if(fs.existsSync(file_location)){
                console.log("file found")
            }else{
                let fL = fs.existsSync(file_location2);
                fL ? console.log("fileFound") : console.log("no file found ")
            }
        }
    }


    console.log(cwd , language , framework)
}
// clone component
function cloneComponent(component){

}
// copy the files
// clone them into a new folder


module.exports = createComponent

// process.cwd replace actions with poth