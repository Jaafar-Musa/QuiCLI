const conf = new(require('conf'))()

const selectFramework = (framework) => {

    if(framework){
        let fw = framework.toLowerCase();
        if(fw === "react"){
            conf.set("framework", "react")
            console.log("React is selected!")
        }else if(fw === " reactnative"){
            conf.set("framework", "reactnative")
            console.log("React native is selected")
        }else{
            console.log("compatible lib/fw are: React || ReactNative ")
        }
    }else{
        if(conf.get('framework') === undefined){
            conf.set("framework", "react")
            console.log("React is selected")
        }else{
            console.log(conf.get('framework') + "is selected")
        }
    }
}

module.exports = selectFramework