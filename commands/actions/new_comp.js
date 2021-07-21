const conf = new(require("conf"))()
const path = require('path')
const fs = require('fs')
//files json
const pathing = require('../../path/paths.json')
// path to search for the files 
const componentsLocation = require('../../path/location')

const createComponent = (components) =>{
    // loop through the array of components
    for(let i = 0; i < components.length; i++){
        // pass them to a function
        componentExists(components[i])
        
        
        
        
        // extensions for the language
        // if(language === "ts" || "js"){
            //     let extension = language + "x"
            
            //? If it is a combined component like Layout, check a file!
            // Check combined components to see if multiple components are required!
            
            // else just copy the component into its folder
            
            
            
            
            // get the array of required components and loop through it | check if some of the components already exist
            
            // }
        }
        // console.log(cwd , language , framework)
    }
    function componentExists(component){
    // get stored variables
    const framework = conf.get("framework")
    const language = conf.get('language');
    let paths = pathing.files
    if(paths[component]){
        // component's location
        let path_to_component = path.join(componentsLocation,framework,language,paths[component].folder)
        console.log(path_to_component)


        // debug
        console.log('TRUE')
    }else{
        console.log(component + " Doesn't Exist");
    }
}




// clone component
function cloneComponent(component){
    // check if the folder and the file already exists

    // if the folder exists but not the file, clone the file else create bioth
}



module.exports = createComponent

// process.cwd replace actions with poth
// file path
// let file_location = path.join(cwd,"path",framework,language,components[i] + "." + extension);
// let file_location2 = path.join(cwd,"path",framework,language,components[i] + "." + language);
// searching for the file
// if(fs.existsSync(file_location)){
//     console.log("file found")
// }else{
//     let fL = fs.existsSync(file_location2);
//     console.log(file_location2)
//     console.log(fL)
//     fL ? console.log("fileFound") : console.log("no file found ")
// }