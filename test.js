"use strict";

var fs = require('fs');
var lineReader = require('line-reader');          // подгружаю модуль для прочтения строки за строкой
var c2o = require("colors-to-less-operations");   // подгружаю модуль для получения строки с необходимыми less функциями для цвета
var color1, color2, lessString;

// read all lines:
lineReader.eachLine('src/less/variables.less', function(line) {
  if(line.indexOf("cless") != -1) {         // узнаю есть ли в строке функ cless
    var arr = line.split(/(?:,\s*)|[()]/);
    color1 = arr[1];
    color2 = arr[2];
    console.log(color1, color2);
    if(color1.indexOf("@") != -1) {         // если color1 обозначен не hex цветом, а переменной less
      lineReader.eachLine('src/less/variables.less', function(line2, last) {
        if (line2.indexOf(color1 + ":") != -1) {    // ищу значение этой less переменной
          var arr = line2.split(/(?::\s*|;)/);
          var colorName = arr[0];                   // сохраняю имя базовой переменной цвета
          color1 = arr[1];

          lessString = c2o.transformToLessOperations(color1, color2);  // получаю необходимую less строку
          lessString = lessString.replace(color1, colorName);          // заменяю цвет на имя переменной

          var arr2 = line.split(' ');
          var newString = arr2[0] + " " + lessString;                 // подготавливаю строку для замены в Less файле

          replaceInSingleFile('src/less/variables.less', line, newString, function() {});    // заменяю строки

          return false; // stop reading
        }
      });
    }
    else {
      lessString = c2o.transformToLessOperations(color1, color2);  // получаю необходимую less строку
      var arr2 = line.split(' ');
      var newString = arr2[0] + " " + lessString;                 // подготавливаю строку для замены в Less файле
      replaceInSingleFile('src/less/variables.less', line, newString, function() {});    // заменяю строки
    }
  }
}).then(function () {
  console.log("I'm done!!!");
});

/**
 * Helper to replace in a single file
 */
function replaceInSingleFile(filePath, replaceThis, withThat, cb) {
  fs.readFile(filePath, 'utf8', function(error, contents) {
    if (error) {
      return cb(error);
    }

    //Replace contents and check if anything changed
    var newContents = contents.replace(replaceThis, withThat);
    if (newContents === contents) {
      console.log(newContents);
      return cb(null, false);
    }

    //Write to file
    fs.writeFile(filePath, newContents, 'utf8', function(error) {
      if (error) {
        return cb(error);
      }
      cb(null, true);
    });
  });
}


// var c2o = require("colors-to-less-operations");

// var base      = "#206683";
// var dependent = "#30a6d9";

// // will become "saturate(#ff8000, 20%); // #bf8040"
// var dependentAsOperations = c2o.transformToLessOperations(base, dependent);

// console.log(dependentAsOperations);