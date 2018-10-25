#!/bin/bash
# author: oemel09@github.com

# get the swagger.json url
echo "please enter the url to the swagger.json file";
read swaggerUrl;

# set some constants
projectDir=$(pwd);
filename="./javascript-client-generated.zip";
myDirName="swagger-codegen-bpm-people-api";
theirDirName="javascript-client";

# install dependencies for project from package.json
echo ">>> running npm install";
npm install;

# invoke swagger-codegen online
echo ">>> generating swagger code online";
response=$(curl -H "Content-type: application/json" -X POST -d '{"options": {"projectName": "swagger_bpm_people_api", "useES6": true, "usePromises": true}
,"swaggerUrl": '"\"${swaggerUrl}\""'}' https://generator.swagger.io/api/gen/clients/javascript);
# get the link to the zip
link=$(expr ${response} : ".*link\":\"\(.*\)\"}");

# move out of the project directory, download and unzip the file, then remove the zip and rename the folder
echo ">>> downloading generated swagger code";
cd ..;
wget -O ${filename} ${link};
echo ">>> unzipping generated swagger code";
unzip ${filename};
rm ${filename};
if [ ! -d ${myDirName} ]; then rm -rf ${myDirName}; fi;
mv ${theirDirName} ${myDirName};

# go into the generated code folder, install dependencies and link the project
echo ">>> installing dependencies for generated code";
cd ${myDirName};
npm install;
echo ">>> linking generated code to make it accessible in other projects";
npm link;

# move into the project directory and link the generated code to the project
generatedCodeDir=$(pwd);
cd ${projectDir};
echo ">>> linking the generated code into our project";
npm link ${generatedCodeDir};

# done!
echo ">>>";
echo ">>> your project is set up!";
