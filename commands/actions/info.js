const information = require("../../path/paths.json");

const getInfo = (keyword) => {
  if (!keyword) {
    //   ORDER THE COMPONENTS
    let ordered = Object.keys(information)
      .sort()
      .reduce((obj, key) => {
        obj[key] = information[key];
        return obj;
      }, {});
    for (key in ordered) {
      console.log(key + ":" + "\t" + ordered[key]["description"]);
    }
  } else {
    let found;
    for (key in information) {
      if (key.startsWith(keyword)) {
        console.log(key + ":" + "\t" + information[key]["description"]);
        found = true;
      }
    }
    if (!found) {
      console.log("No component starts with " + keyword);
    }
  }
};

module.exports = getInfo;