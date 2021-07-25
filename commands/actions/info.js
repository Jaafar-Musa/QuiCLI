const information = require("../../path/paths.json")

const getInfo = (framework) =>{
    if(information[framework]){
        for(key in information[framework]){
            if(information[framework][key]["description"]){
                console.log(key +": " +information[framework][key]["description"] )
            }
        }
    }
    // details for a specific component!
}

module.exports = getInfo