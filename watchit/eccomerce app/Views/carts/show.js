const layout = require('../layout');

module.exports = ({ items }) => {
    const renderedItems = items.map(item => {
        return `
        <div>${item.product.title} - ${item.product.price}</div>
        
        `;
    }).join('');

    return layout({
        content: `
        <hi>Cart</h1>
        ${renderedItems}
        `
    })



}