enum Designation {
    Student,
    Teacher,
    Parent
}

type PersonG = {
    name: string;
    account: number;
    designation: Designation;
};
type Parent = PersonG & { students: string[] }
type Population = PersonG | Parent;

function generatePerson(name: string, account: number, desig: Designation, students?: string[]): Population {
    if (students?.length) {
        return { name: name, account: account, designation: Designation.Parent, students: students };
    }
    return { name: name, account: account, designation: desig };
}

const arrayOfPersons: Population[] = [];

function increase(population: Population[]): Population[] {
    population.forEach((personElement: Population) => {
        switch(personElement.designation) {
            case Designation.Parent:
                personElement.account *= 4;
                break;
            case Designation.Student:
                personElement.account *= 1.2;
                break;
            case Designation.Teacher:
                personElement.account *= 3.5;
                break;
        }
    });
    return population;
}