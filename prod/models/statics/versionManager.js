const old = require("./versions.json");

let Backend, Frontend;

try {
	Backend = require("../../backend/package.json");
} catch (e) {
	console.error(" no backend dir");
}

try {
	Frontend = require("../../frontend/package.json");
} catch (e) {
	console.error(" noe frontend dir");
}


const fs  = require("fs");
const path = require("path");

const version = {
	backend: Backend?.version || old.backend,
	frontend: Frontend?.version || old.frontend,
};

fs.writeFileSync(path.join(__dirname, "../statics", "versions.json"), JSON.stringify(version));
