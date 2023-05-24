var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  //
  /* $(startEl).forEach(element => {
    resultSet.push(element)
  }); */
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  let firstChar = selector.charAt(0);
  if(firstChar === "#") return "id";
  if(firstChar === ".") return "class";
  else if(selector.includes(".")) return "tag.class";
  else return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (element) => `#${element.id}` === selector;
    /* matchFunction = function(element){//matchFunction = (element) => `#${element.id}` === selector;
      let selectorContent = selector.slice(1)//price
      if(element.id === selectorContent){
        return true
      }
      return false
    } */
  } else if (selectorType === "class") {
    matchFunction = function(element){
      let selectorContent = selector.slice(1)
      let clases = element.className.split(" ")
      if(clases.includes(selectorContent)){
        return true
      } 
      return false
    }
  } else if (selectorType === "tag.class") {
    matchFunction = function(element){
      let selectorArray = selector.split(".") //[etiqueta, clase]
      let tagMayus = selectorArray[0].toUpperCase()
      let clases = element.className.split(" ")
      if(element.tagName === tagMayus && clases.includes(selectorArray[1])){
        return true
      }
      return false
    }
  } else if (selectorType === "tag") {
    matchFunction = function(element){
      let selectorMayus = selector.toUpperCase()
      if(element.tagName === selectorMayus){
        return true
      }
      return false
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

console.log(document);