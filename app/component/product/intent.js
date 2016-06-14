export default function intent(DOM, props){
    return {
        selected$: DOM.get('.product', 'click')
                            .combineLatest(props.getAll().first(),( _,item)=> {
                                let { name, price } = item
                                return { name, price };
                            })
    }
}
