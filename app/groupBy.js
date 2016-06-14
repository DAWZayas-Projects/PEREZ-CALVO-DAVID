export default function groupby(cart){
  var aux = [];
  var test = false;
  for(var i = 0; i < cart.length; i++){
    test = false;
    if(aux.length === 0){
      aux.push({name: cart[i].name, quantity: 1})
    }else{
      for(var j = 0; j < aux.length; j++){
        if(!test){
          (aux[j].name === cart[i].name) ? test=true : test = false;
          (test) ? aux[j].quantity++ : null;
        }
      }
      (!test) ? aux.push({name: cart[i].name, quantity: 1}) : null;
    }
  }
  return aux;
}
