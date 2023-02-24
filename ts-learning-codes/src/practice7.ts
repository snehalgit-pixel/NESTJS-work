// Q2
class Person {
    constructor(public fName: string, public lName: string) {}
    get fullName() {
        return `${this.fName} ${this.lName}`;
    }
}

// Q3
class Employee extends Person {
    constructor(public fName: string, public lName: string, private salary?: number) {
        super(fName, lName);
        if (!this.salary) {
            this.salary = 0;
        }
    }
}