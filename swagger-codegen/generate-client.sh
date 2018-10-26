#!/bin/bash
# author: oemel09@github.com

# set some constants
scripDir="swagger-codegen";
swaggerGenerator="swagger-codegen-cli.jar";
swaggerJson="swagger.json";
swaggerConfig="config.json";
generatedCodeDir="generated_swagger_client";

helpPage() {
    echo "Generates the client code for bpm-people-api";
    echo "Usage: without any arguments if will use swagger.json and config.json from this directory";
    echo "       $(pwd)/${scripDir}";
    echo "";
    echo "Options:";
    echo " -h | --help              show this help page";
    echo " -v | --version           show the version";
    echo " -s | --swagger-json      set another location for swagger.json";
    echo "                          can be a URL to a swagger.json file";
    echo " -c | --config-json       set another location for config.json";
    echo " -o | --output            specify another output folder";
}

# read arguments
while [ "$1" != "" ]; do
    case $1 in
        -s | --swagger-json )
            shift;
            swaggerJson=$1;
            ;;
        -c | --config-json )
            shift;
            swaggerConfig=$1;
            ;;
        -o | --output )
            shift;
            generatedCodeDir=$1;
            ;;
        -h | --help )
            helpPage;
            exit;
            ;;
        -v | --version )
            echo "version 0.0.1";
            exit;
            ;;
        * )
            helpPage;
            exit 1;
            ;;
    esac
    shift
done

# step into directory where the relevant files are located
cd ./${scripDir};
# check if codegen jar exists
if [ ! -f ${swaggerGenerator} ]; then
    echo ">>> generator not found, will download it...";
    wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.3.1/swagger-codegen-cli-2.3.1.jar -O ${swaggerGenerator};
fi;

echo ">>> generating swagger client code";
if [ -d ${generatedCodeDir} ]; then rm -rf ${generatedCodeDir}; fi
java -jar ${swaggerGenerator} generate -i ${swaggerJson} -l javascript -o ../${generatedCodeDir} -c ${swaggerConfig};

# go into the generated code folder, install dependencies and link the project
cd ../${generatedCodeDir};
echo ">>> installing dependencies for generated code";
npm install;
echo ">>> linking generated code to make it accessible in other projects";
npm link;

# move into the project directory and link the generated code to the project
generatedCodeDir=$(pwd);
cd ..;
echo ">>> linking the generated code into our project";
npm link ${generatedCodeDir};

# done!
echo ">>>";
echo ">>> your project is set up!";
