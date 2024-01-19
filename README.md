Documentation:

# Project -  Simple Calculator🖩 
## Task - Create Simple Calculator using pure JavaScript. 
## Functional requirements:
- [x] Implement division, multiplication, subtraction, addition, percentage, sign change
- [x] Project must be done using only pure JS (usage of libraries/frameworks is forbidden)
- [x] Eval, Mathjs are forbidden
- [x] Project should have configures ESLint and Prettier
- [x] Documentation is obligatory

## Links:
### [Design draft link](https://www.figma.com/community/file/1114581199758334463/calculator)
### [Project (deployed)](https://dibrugh.github.io/calculator-js/)
### [Repository](https://github.com/dibrugh/calculator-js)


# Available Scripts and Commands

## Install
>```npm i``` # install dependencies
## General
>```npm run start```  # run app in the development mode\
>```npm run deploy```  # create production build and deploy app on Github Pages\
>```npm run clear```  # delete build/dist folder
## Deploy (part of "deploy" script)
>```npm run build-dev```  # builds the app for production\
>```npm run build-prod```  # storybook build\
>```npm run build-gh-pages```  # deploy on Github Pages


## Folder structure
+ PROJECT
  + /dist (production build of the project)
  + /node_modules (dependencies)
  + /src (development version of the project)
    + /app (js files related to the View and Logic of the project)
    + /assets (images, fonts, etc.)
        + /img (svg, gif, png, ico, jpg, etc.)
    + /style (files related to project styling, like .css, .sass, etc.)
    + /utils (js utils or helpers that are not specific to this particular project)
    + index.html
    + index.js