export default function groupby(cart){
  var aux = [];
  var test = false;
  cart.map( i => {
    test = false;
    if(aux.length === 0){
      aux.push({name: i.name, quantity: 1});
    }else{
      aux.map( j => {
        if(!test){
          (j.name === i.name) ? test=true : test = false;
          (test) ? j.quantity++ : null;
        }
      });
    (!test) ? aux.push({name: i.name, quantity: 1}) : null;
  }
   });
  return aux;
}
