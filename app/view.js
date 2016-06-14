import { h } from '@cycle/dom';
import groupby from './groupBy';

export default function view(state$) {
    return state$.map(({products, cart}) => {
        const lastItem = cart.slice(cart.length-1)[0] || {name:''};
        const totalItems = cart.length;
        const total = cart.map(item => item.price ).reduce((prev , sig)=> prev + sig, 0);
        const totalRound = Math.round(total* 100) / 100; //Total price
        const grouped = groupby(cart);
        return h('div', [
                 h('header.row',[
                    h('div.container.content', [
                      h('span.header', ['CS:GO SKINS']),
                      h('div.cartInfo', [
                        h('div', [
                            h('img.cartImg', {src: "images/cart.png"}),
                            h('p',`Total items: ${totalItems}`),
                          ]),
                          (grouped.length > 0) ?
                          h('div.cart',[
                            grouped.map(i =>
                               h('div', [
                                 h('span',`${i.name} || Quantity: ${i.quantity} `)
                               ]),
                            ),
                            h('hr'),
                            h('p.total', `Total Price ${totalRound}€`),
                          ]) : null,
                        ]),
                      ]),
                   ]),
                   h('div.catalog.container',[
                      h('h3',['Catalog']),
                      h('div.col-lg-12.col-md-12.col-xs-12',
                          products.map(product => {
                              let { name, price, image, description } = product
                              let props = { name, price, image, description }
                              return h(`product`, props )
                       }))
                  ]),
                  h('footer.row.footer',[
                    h('div.container',[
                      h('div.row',[
                        h('div.footer1',[]),
                        h('div.footer2.pull-right',[]),
                      ]),
                      h('div.row',[
                        h('small','CS:GO SKINS © 2016 by David Perez. Powered by Steam.'),
                      ]),
                    ]),
                  ]),
               ])
    })
}
