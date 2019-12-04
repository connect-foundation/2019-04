const fs = require("fs");
const path = require("path");

const babel = require("@babel/core");
const presetEnv = require("@babel/preset-env");
const presetReact = require("@babel/preset-react");

const child_process = require("child_process");
const dirName = `modules`;
const moduleName = process.argv[2];
const moduleVersion = process.argv[3];

const requireRegexp = /require[(]{1}['"]{1}[a-zA-Z-/.0-9]*['"]{1}[)]{1}/g;
const pathRegexp = /['"]{1}[a-zA-Z0-9./_-]+['"]{1}/;
const maskQuotationRegexp = /['"]{1}/g;

const PATH_PREFIX = path.resolve(`${dirName}/node_modules`);
const PATH_STACK = [PATH_PREFIX];
const Bundle = {};

const pakage = `{
    "name": "dependency",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT"
  }
  `;
const command = `
    mkdir ${dirName} && cd ${dirName} && echo '${pakage}' >> package.json && yarn add ${moduleName}${
  moduleVersion ? "@" + moduleVersion : ""
}
`;

child_process.exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  bundle();
  console.log(Object.keys(Bundle));
  child_process.exec(`rm -rf ${dirName}`),
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    };
});

function bundle() {
  let entries = [];
  try {
    fs.statSync(pathParser(moduleName));
    entry.push(moduleName);
  } catch (error) {
    const file = fs.readFileSync(pathParser(`${moduleName}/package.json`), {
      encoding: "utf-8"
    });
    JSON.parse(file)["main"]
      ? entries.push(
          path.resolve(PATH_PREFIX, moduleName, JSON.parse(file)["main"])
        )
      : "";
    JSON.parse(file)["module"]
      ? entries.push(
          path.resolve(PATH_PREFIX, moduleName, JSON.parse(file)["module"])
        )
      : "";
  }
  entries.forEach(entry => {
    core(entry);
  });
  fs.writeFileSync(
    `./dist/${moduleName.replace(/[/]{1}/g, "_")}.json`,
    JSON.stringify(Bundle)
  );
}

function core(path) {
  const parsedPath = pathParser(path);
  const key = pathKeyParser(parsedPath);
  if (Bundle[key]) return;
  try {
    const file = fs.readFileSync(parsedPath, { encoding: "utf-8" });
    const transpiledCode = transpileCode(file);
    Bundle[key] = transpiledCode;
    PATH_STACK.push(getParentName(parsedPath));
    const child = requirePathParser(transpiledCode);
    if (child.length) {
      child.forEach(val => core(val));
    }
    PATH_STACK.pop();
  } catch (error) {}
}

function requirePathParser(code) {
  const requires = code.match(requireRegexp);
  if (requires) {
    return requires.reduce((acc, current) => {
      acc.push(pathRegexp.exec(current)[0].replace(maskQuotationRegexp, ""));
      return acc;
    }, []);
  }
  return [];
}

function pathParser(param) {
  return extensionParser(indexParser(nodeModuleParser(param)));
}

function extensionParser(path) {
  const FILE_EXTENSION = ["js", "css", "jsx", "json"];
  const splitedPath = path.split(".");
  const extension = splitedPath[splitedPath.length - 1];

  if (!FILE_EXTENSION.some(ex => ex === extension)) {
    return `${path}.js`;
  } else {
    return `${path}`;
  }
}

function nodeModuleParser(param) {
  if (isNodeModule(param)) {
    return path.resolve(PATH_PREFIX, param);
  }
  return path.resolve(getLastElementPathStack(), param);
}

function indexParser(path) {
  if (isDir(path)) {
    return `${path}/index.js`;
  }
  return path;
}

function isNodeModule(path) {
  if (path[0] === "." || path[0] === "/") return false;
  return true;
}

function isDir(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    try {
      return fs.statSync(`${path}.js`).isDirectory();
    } catch (error) {
      return false;
    }
  }
}

function getLastElementOfArray(array) {
  return array[array.length - 1];
}

function getLastElementPathStack() {
  return getLastElementOfArray(PATH_STACK);
}

function getParentName(path) {
  const splitedPath = path.split("/");
  splitedPath.pop();
  return splitedPath.reduce((acc, current) => {
    if (current === "") return acc;
    return (acc += `/${current}`);
  }, "");
}

function transpileCode(code) {
  return babel.transform(code, {
    presets: [presetEnv, presetReact]
  }).code;
}

function pathKeyParser(path) {
  const NODE_MODULE_PATH = "/node_modules/";
  const temp = path.split(NODE_MODULE_PATH);
  return `${NODE_MODULE_PATH}${temp[1]}`;
}
