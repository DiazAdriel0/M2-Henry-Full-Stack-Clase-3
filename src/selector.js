var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];
  if (typeof startEl === "undefined") startEl = document.body;
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) resultSet.push(startEl);
  for (let i = 0; i < startEl.children.length; i++) {
    let aux = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...aux];
  }
  return resultSet;
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
  if (selectorType === "id") matchFunction = element => `#${element.id}` === selector;
  else if (selectorType === "class") {
    matchFunction = element => {
      let selectorContent = selector.slice(1)
      let clases = element.className.split(" ")
      return (clases.includes(selectorContent))
    }
  }else if (selectorType === "tag.class") {
    matchFunction = element => {
      let selectorArray = selector.split(".") 
      let tagMayus = selectorArray[0].toUpperCase()
      let clases = element.className.split(" ")
      return (element.tagName === tagMayus && clases.includes(selectorArray[1]))
    }
  }else if (selectorType === "tag") {
    matchFunction = element => (element.tagName === selector.toUpperCase())
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