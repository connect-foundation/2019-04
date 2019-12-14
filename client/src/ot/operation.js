const diff = require('diff');

class Operation {
    constructor(oldStr, newStr) {
        this.operations = [];
        this.offset = 0;
        this.init(oldStr, newStr);
        return this.getOperations();
    }

    init(oldStr, newStr) {
        const diffResult = diff.diffChars(oldStr, newStr);

        diffResult.forEach(({ count, added, removed, value }) => {
            if (!added && !removed) this.retain(count);
            else if (added) this.insert(value);
            else if (removed) this.delete(count);
        });
    }

    retain(length) {
        this.operations.push({
            state: 'retain',
            value: length
        });
    }

    insert(str) {
        this.offset += str.length;
        this.operations.push({
            state: 'insert',
            value: str
        });
    }

    delete(length) {
        this.offset += length;
        this.operations.push({
            state: 'delete',
            value: length
        });
    }

    getOperations() {
        if (this.operations[0].state !== 'retain')
            this.operations.unshift({ state: 'retain', value: 0 });
        if (this.operations[this.operations.length - 1].state !== 'retain')
            this.operations.push({ state: 'retain', value: 0 });

        this.operations.push({
            state: 'timestamp',
            value: Date()
        });

        return this.operations;
    }
}

module.exports = { Operation };
