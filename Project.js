const {Observable} = Rx;
const {div, p, img, span, h2, hr, button, iframe, input, makeDOMDriver} = CycleDOM;

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

function renderEx1(sources){
  
  const add$ = sources.DOM.select('.add').events('click');
  const addAction$ = add$.map(e => +1);
  
  const rest$ = sources.DOM.select('.rest').events('click');
  const restAction$ = rest$.map(e => -1);
  
  const count$ = Rx.Observable.of(0)
    .merge(addAction$).merge(restAction$)
    .scan((x,y) => x + y);
  
  return count$.map( count => 
      div('.cont',[
            h2('The counter is: '+String(count)),
            hr(),
            div('.btn-group',[
              button('.add .btn .btn-primary',[
                span('.glyphicon .glyphicon-plus')
              ]),
              button('.rest .btn .btn-danger',[
                span('.glyphicon .glyphicon-minus')
              ])
            ])
      ])
    );
  
  /*return Observable.of(
      div('.cont', [
       p('Hello it`s me'),
      ])
  );*/
}

function renderContent(sources) {
  return sources.DOM.select('.check1').events('change')
       .map(ev => ev.target.checked)
       .startWith(false)
       .map(toggled =>
         div('.content',[
           input('.check1',{type: 'checkbox'}), 'Show first example',
           p(toggled ? renderEx1(sources) : 'off')
         ])
       );
}

function main(sources) {
  
  const footer = {'0':{'0':'Lalalala', '1': 'lala'}, '1':{'0': 'Lelelele', '1': 'lele'} };
  
  const vtree$ = Observable.of(
      div([
        renderHeader(),
        renderContent(sources),
        renderFooter(footer),
      ])
    );
 
  
  return {
    DOM: vtree$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app')
},);
