function merge(op, str) {
    let index = 0;
    let str1, str2;
    op.forEach(o => {
        switch (o.state) {
            case 'retain':
                index += o.value;
                break;
            case 'insert':
                str1 = str.slice(0, index);
                str2 = str.slice(index);
                str = `${str1}${o.value}${str2}`;
                index += o.value.length;
                break;
            case 'delete':
                str1 = str.slice(0, index);
                str2 = str.slice(index + o.value);
                str = `${str1}${str2}`;
                break;
            default:
                break;
        }
    });

    return str;
}

module.exports = { merge };
