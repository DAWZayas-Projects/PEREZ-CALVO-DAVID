import { Rx } from '@cycle/core';
import example from '../example/example';
export default function model(actions){

    return Rx.Observable.just(example)
                    .combineLatest(actions.addToCart$.startWith(null),(state, newItem)=>{
                        state.cart = newItem ? state.cart.concat([newItem]) : state.cart;
                        return state
                    });
}
