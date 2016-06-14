import { h } from '@cycle/dom';

export default function view(state$){
    return state$.map(product => {
    	const desc = (product.description.length > 15 ) ? product.description.substring(0,15)+'...' : product.description;
        return h('div.product.col-lg-2.col-md-4.col-xs-12',[
                    h('img.imgProduct', { src: `/images/${product.image}.png` }),
                    h('div', [
	                    h('p.name', [product.name || 'No Name']),
	                    h('p', [ desc || 'No description']),
	                    h('p', [`${product.price || 0}€`]),
	          	      ]),
                ]);
    });
}
