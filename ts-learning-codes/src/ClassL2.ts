// class Account {
//     id: number;
//     owner: string;
//     balance: number;

//     constructor(id: number, owner: string, balance: number) {
//         this.id = id;
//         this.owner = owner;
//         this.balance = balance;
//     }

//     deposit(amount: number) {
//         this.balance += amount;
//     }
// }

// Shorter way--->
class Account {
    adminAccount?: boolean;
    
    constructor(public readonly id: number, private _owner: string, private _balance: number, access?: boolean) {
        this.adminAccount = access;
    }

    deposit(amount: number) {
        this._balance += amount;
    }

    get balance(): number {
        return this._balance;
    }

    get owner(): string {
        return this._owner
    }
}

class Person1 {
    constructor(public fName: string, public lName: string) {}

    get fullName(): string {
        return `${this.fName} ${this.lName}`;
    }

    walk() {
        console.log("Walking");
    }
}

// overriding
class Teacher extends Person1 {
    constructor(fName: string, lName: string) {
        super(fName, lName);
    }
    override get fullName(): string {
        return `Prof. ${super.fullName}`;
    }
}
class Student extends Person1 {
    constructor(fName: string, lName: string) {
        super(fName, lName);
    }
}
let stu1 = new Teacher("Akshay", "Singh");
console.log(stu1.fullName);

// polymorphism
function printNames(people: Person1[]) {
    for (let person of people) {
        console.log(person.fullName)
    }
}
printNames([
    new Student("Abhi", "Jain"),
    new Teacher("Ak", "Singh"),
    new Person1("A", "B")
]);

// Note that child can access parent's protected fields but not private fields
// Open Closed principle
abstract class Shape {
    constructor(public color: string) {}
    abstract render(): void
}

class Circle extends Shape {
    constructor(public radius: number, color: string) {
        super(color);
    }
    override render(): void {
        console.log("Rendering circle")
    }
}