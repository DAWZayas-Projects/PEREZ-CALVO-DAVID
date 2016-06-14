import intent from './intent';
import model from './model';
import view from './view';

export default function Product({ props, DOM }){
    return {
        DOM : view(model(props)),
        events: {
            selected: intent(DOM, props).selected$
        }
    }
}
