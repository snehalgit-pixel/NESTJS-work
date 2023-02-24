class KeyValuePair<T, V> {
    constructor(public key: T, public value: V) {}
}
let pair1 = new KeyValuePair<string, string>('1', 'Akshay');

function wrapInArray<T>(value: T): T[] {
    return [value];
}
let num = wrapInArray(1);

// functions inside of a class
class ArrayUtils<T> {
    wrapArray(value: T) {
        return [value]
    }
}

// Generics in interface
interface Result<T> {
    data: null | T;
    error: string | null;
}

function fetch<T>(url: string): Result<T> {
    return { data: null, error: null };
}

interface User {
    username: string;
}

interface Product {
    title: string;
}

interface NewProduct {
    name: string;
    price: number;
}

class Store<T> {
    protected object: T[] = [];
}