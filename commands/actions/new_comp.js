const conf = new (require("conf"))();
const path = require("path");
const fs = require("fs");
//files json
const pathing = require("../../path/paths.json");
// path to search for the files
const componentsLocation = require("../../path/location");

const createComponent = (components) => {
  // loop through the array of components
  for (let i = 0; i < components.length; i++) {
    // pass them to a function
    componentExists(components[i]);
  }
  console.log("Done");
};
async function componentExists(component) {
  // get stored variables
  const framework = conf.get("framework");
  const language = conf.get("language");
  let paths = pathing[framework];
  if (paths[component]) {
      if(paths[component]["requiredComponents"]){
          for(i = 0; i < paths[component]["requiredComponents"].length; i++){
              await componentExists(paths[component]["requiredComponents"][i]);
          }
      }
    let compatibleExtension;
    // get the extension used for the file
    paths[component]["extensions"].forEach((ex) => {
      if (ex.includes(language)) {
        compatibleExtension = ex;
      }
    });
    let path_to_component = path.join(
      componentsLocation,
      framework,
      language,
      paths[component].folder,
      component + "." + compatibleExtension
    );
    try {
      if (fs.existsSync(path_to_component)) {
        await cloneComponent(
          path_to_component,
          paths[component].folder,
          component + "." + compatibleExtension
        );
        if (paths[component]["scss"]) {
          // Adding the scss
          await cloneComponent(
            path.join(
              componentsLocation,
              "scss",
              paths[component].folder,
              "_" + component + "." + "scss"
            ),
            paths[component].folder,
            "_" + component + "." + "scss"
          );
        }
      } else {
        console.log("Error creating " + component);
      }
    } catch (e) {
      console.log("ERROORRR", e);
    }
  } else {
    console.log(component + " Doesn't Exist");
  }
}

async function cloneComponent(componentPath, folderName, file) {
  let newLocation = process.cwd();
  // check if the folder exists
  if (fs.existsSync(path.join(newLocation, folderName))) {
    // check if the file exists in the folder
    if (!fs.existsSync(path.join(newLocation, folderName, file))) {
      // if it doesnt, create the file
      try {
        await fs.copyFile(
          componentPath,
          path.join(newLocation, folderName, file),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      } catch (e) {
        console.log("Error copying " + file);
      }
    }
  } else {
    // create the folder and the file
    try {
      await fs.mkdir(folderName, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      await fs.copyFile(
        componentPath,
        path.join(newLocation, folderName, file),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } catch (e) {
      console.log(e);
      console.log("Error creating " + file);
    }
  }
  // if the folder exists but not the file, clone the file else create bioth
}

module.exports = createComponent;

// TODO file exists but not scss/ vice versa
