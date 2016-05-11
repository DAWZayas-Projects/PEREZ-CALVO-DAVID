const {Observable} = Rx;
const {div, p, img, span, h2, input, makeDOMDriver} = CycleDOM;

function renderHeader() {
  return Observable.of(
      div('.header', [
       div('.container',[
         div('.title-conainer .row',[
           img('.logo',{src:'http://cycle.js.org/img/cyclejs_logo.svg', alt:'Cycle.js'}),
           span('.title','Cycle.js'),
         ]),
         h2('A functional and reactive JavaScript framework for cleaner code'),
       ]),
      ])
  );
}

function renderFooter(obj) {
  return Observable.of(
      div('.footer', [
       div('.container',[
          renderBox(obj)
       ]),
      ])
  );
}

function renderBox(obj){
   return Object.keys(obj).map( key => 
      div('.col-lg-6 .col-md-6 .col-xs-12',[
        renderParagraf(obj[key]),
      ])
    );
}

function renderParagraf(obj){
  return Object.keys(obj).map( key => p(obj[key]));
}

function main(sources) {
  
  const footer = {'0':{'0':'Lalalala', '1': 'lala'}, '1':{'0': 'Lelelele', '1': 'lele'} };
  
  const vtree$ = Observable.of(
      div([
        renderHeader(),
        renderFooter(footer),
      ])
    );
 
  
  return {
    DOM: vtree$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
