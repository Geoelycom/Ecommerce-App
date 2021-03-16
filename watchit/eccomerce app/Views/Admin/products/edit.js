const { getError } = require('../../helpers');
const layout = require('../layout');

module.exports = ({ product, errors }) => {
    return layout({
        content: `
        <form method="POST">
        <input name="title" value="${product.title}" />
        ${getError(errors, 'title')}
        <input name="price" value="${product.price}" />
        <input name="image" type="file" />
        <button>submit </button>
        </form>
        `
    })
}