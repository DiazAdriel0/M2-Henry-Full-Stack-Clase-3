let traverseDomAndCollectElements = function (matchFunc, startEl) {
  let resultSet = [];
  if (typeof startEl === "undefined") startEl = document.body;
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  let elementos = startEl.children
  if(matchFunc(startEl)) resultSet.push(startEl)
  for(let i = 0; i < elementos.length; i++){
    let result = traverseDomAndCollectElements(matchFunc,elementos[i]);
    resultSet = [...resultSet,...result]
  }
  return resultSet
  /* if (matchFunc(startEl)) resultSet.push(startEl);
  for (let i = 0; i < startEl.children.length; i++) {
    let aux = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...aux];
  }
  return resultSet; */
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

let selectorTypeMatcher = function (selector) {
  // tu código aquí
  //let firstChar = selector.charAt(0);
  if(selector[0] === "#") return "id";
  if(selector[0] === ".") return "class";
  else if(selector.includes(".")) return "tag.class";
  else return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

let matchFunctionMaker = function (selector) {
  let selectorType = selectorTypeMatcher(selector);
  let matchFunction = element => {
    if (selectorType === "id") return `#${element.id}` === selector;
    else if (selectorType === "class") {
      let selectorContent = selector.slice(1)
      let clases = element.className.split(" ")
      return (clases.includes(selectorContent))
    }
    else if (selectorType === "tag.class") {
      let [tag,className] = selector.split(".")
      return (matchFunctionMaker(tag)(element) && matchFunctionMaker(`.${className}`)(element))
      /*let selectorArray = selector.split(".") 
      let tagMayus = tag.toUpperCase()
      let clases = element.className.split(" ")
      return (element.tagName === tag.toUpperCase() && clases.includes(className)) */
    }else if (selectorType === "tag") {
      return (element.tagName === selector.toUpperCase())
    }
    return false
  }
  /* if (selectorType === "id") matchFunction = element => `#${element.id}` === selector;
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
  } */
  return matchFunction;
};

let $ = function (selector) {
  let elements;
  let selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

console.log(document);