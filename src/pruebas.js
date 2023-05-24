var traverseDomAndCollectElements = function(matchFunctionMaker, startEl = document.body) {
    var resultSet = [];
  
    // if (typeof startEl === "undefined") {
    //   startEl = document.body;
    // }
  
    // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
    // usa matchFunc para identificar elementos que matchien
  
    // TU CÓDIGO AQUÍ
    if (matchFunctionMaker(startEl)) resultSet.push(startEl);
  
    for (let i = 0; i < startEl.children.length; i++) {
      let aux = traverseDomAndCollectElements(matchFunctionMaker, startEl.children[i]);
      resultSet = [... resultSet, ...aux];
    }
    return resultSet;
}