import { employees } from './data/employeeData';
import { Employee } from './types/i-employee';
const allEmployees: Employee[] = employees;

separateRetiredEmployees(allEmployees);

function separateRetiredEmployees(arrayOfEmployees: Employee[]) {
    const retiredEmployees: Employee[] = [];
    const nonRetiredEmployees: Employee[] = [];
    arrayOfEmployees.forEach((employee: Employee) => {
        if (employee?.age && employee.age > 60) {
            retiredEmployees.push(employee);
        }
        else {
            nonRetiredEmployees.push(employee);
        }
    });
    displayEmployees(retiredEmployees, true);
    displayEmployees(nonRetiredEmployees);
}

function displayEmployees(employees: Employee[], retired?: boolean) {
    if (retired) {
        console.log("Retired employees--->");
    }
    else {
        console.log("Non-retired employees--->");
    }
    employees.forEach((employee: Employee) => {
        console.log("Name: "+employee.name + "; ID: " +employee.empId + "; Age: "+getAgeValue(employee));
    });
}

function getAgeValue(employee: Employee) {
    if (employee?.age) {
        return employee.age;
    }
    return "N/A";
}

// Solution 2 - type aliasing

// type Employee = { empId: number, name: string, age: number };
// type EmpResp = [Employee[], Employee[]];

// function genEmp(id: number, age: number) {
//     return { id: id, age: age };
// }
