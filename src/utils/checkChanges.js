export default {
  checkIt(oldObj, newerObj) {
    //no valida arrays
    let Keys = Object.keys(oldObj).filter(key => {
      if (newerObj[key] === null) {
        //mejorar esta parte para validar arrays
        return false;
      } else {
        return newerObj[key].toString() !== oldObj[key].toString();
      }
    });
    let newDatos = {};
    Keys.forEach(key => (newDatos[key] = newerObj[key]));
    console.log(newDatos);
    return newDatos;
  }
};
