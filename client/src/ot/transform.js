function transform(o1, o2) {
    const t1 = o1.pop();
    const t2 = o2.pop();

    if (o1[0].value < o2[0].value) return o1;
    else if (o1[0].value === o2[0].value && t1 < t2) return o1;

    let sum = 0,
        index = 0,
        offset = 0;

    while (o1[0].value >= sum) {
        let op = o2[index++];
        switch (op.state) {
            case 'retain':
                sum += op.value;
                break;
            case 'insert':
                sum += op.value.length;
                offset += op.value.length;
                break;
            case 'delete':
                sum += op.value;
                offset -= op.value;
                break;
            default:
                throw new Error('opertaion error');
        }
    }

    o1[0].value += offset;
    o1.push(t1);
    return [o1, offset];
}

module.exports = { transform };
