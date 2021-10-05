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
  const language = conf.get("language");
  // GET THE REQUIRED COMPONENTS FOR THIS COMPONENT TO BE ABLE TO WORK
  if (pathing[component]) {
    if (pathing[component]["requiredComponents"]) {
      for (i = 0; i < pathing[component]["requiredComponents"].length; i++) {
        await componentExists(pathing[component]["requiredComponents"][i]);
      }
    }
    //GET THE EXTENSION USED FOR THE FILE
    let compatibleExtension;
    pathing[component]["extensions"].forEach((ex) => {
      if (ex.includes(language)) {
        compatibleExtension = ex;
      }
    });

    let path_to_component = path.join(
      componentsLocation,
      "react",
      language,
      pathing[component].folder,
      component + "." + compatibleExtension
    );
    try {
      // MAKE SURE THE PATH EXISTS
      if (fs.existsSync(path_to_component)) {
        await cloneComponent(
          path_to_component,
          pathing[component].folder,
          component + "." + compatibleExtension
        );
        if (pathing[component]["scss"]) {
          // CLONE THE SCSS FILE TOO IF IT EXISTS
          await cloneComponent(
            path.join(
              componentsLocation,
              "scss",
              pathing[component].folder,
              "_" + component + "." + "scss"
            ),
            pathing[component].folder,
            "_" + component + "." + "scss"
          );
        }
      } else {
        console.log("Error creating " + component);
      }
    } catch (e) {
      console.log("Error", e);
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

// new option -r rename
