console.log("Hello world!");
let age: number = 20;
function convert(age: number) {
    if (age < 3) {
        console.log("kid");
    }
    else {
        console.log("not kid");
    }
}

let ages: number[] = [1,2,3,4,5];

enum Size {
    small,
    medium,
    large
}

enum Size1 {
    small,
    medium = 5,
    large
}

enum Size2 {
    small = 'a',
    medium = 'b',
    large = 'c'
}

let sSize: Size1 = Size1.medium;

// Union types
function kgToLbs(weight: number | string): number {
    switch (typeof(weight)) {
        case 'number':
            return weight * 2.2;
            break;
        case 'string':
            return parseInt(weight) * 2.2;
            break;
    }
}

// intersection types
type Draggable = {
    drag: () => void;
}

type Resizable = {
    resize: () => void;
}

type UIWidget = Draggable & Resizable;
let clock: UIWidget = { drag: () => {}, resize: () => {} };

// Type assertion: When you know more about the obj than ts
let phone = document.getElementById("phone") as HTMLInputElement;
phone.value;
let phone2 = <HTMLInputElement>document.getElementById("phone");

// Never type
function infiniteLoop(): never {
    while(true) {}
}
infiniteLoop();
console.log("Work");