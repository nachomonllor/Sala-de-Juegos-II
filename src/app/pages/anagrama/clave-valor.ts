//https://stackoverflow.com/questions/36467469/is-key-value-pair-available-in-typescript
export class ClaveValor<T1, T2> {
    private key: T1;
    private value: T2;

    constructor(key: T1, value: T2) {
        this.key = key;
        this.value = value;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }
}