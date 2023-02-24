const schoolRecord: Map<number, string[]> = new Map();
function initializeSchool() {
    schoolRecord.set(1, ['Anna', 'Barb', 'Charlie']);
    schoolRecord.set(2, ['Alex', 'Peter', 'Zoe']);
    schoolRecord.set(3, ['Mohan']);
    schoolRecord.set(4, ['Pooja', 'Pranav', 'Palki'])
    schoolRecord.set(5, []);
    schoolRecord.set(6, []);
    schoolRecord.set(7, []);
    schoolRecord.set(8, []);
    schoolRecord.set(9, []);
    schoolRecord.set(10, []);
    schoolRecord.set(11, []);
    schoolRecord.set(12, ['Zoya', 'Srishti', 'Aman']);
}

function enrollNewStudent(newStudent: string, grade: number) {
    if (grade < 1 || grade > 12) {
        console.log("Invalid input parameters");
    }
    else {
        const existingStudents: string[] | undefined = schoolRecord.get(grade);
        if (!existingStudents) {
            console.log("Failed to enroll new student.");
        }
        else {
            existingStudents.push(newStudent);
            // Reference is being created here. No need to set the map.
            console.log("New student enrolled successfully!");
        }
        console.log(`After enrolment, students in grade ${grade} = `+schoolRecord.get(grade));
    }
}

function getStudentsByGrade(grade: number) {
    if (grade < 1 || grade > 12) {
        console.log("Invalid input parameters");
    }
    else {
        const existingStudents: string[] | undefined = schoolRecord.get(grade);
        if (!existingStudents) {
            console.log("Failed to fetch records.");
        }
        else {
            if (existingStudents.length == 1) {
                console.log(`We've only got ${existingStudents[0]} just now.`);
            }
            else {
                console.log(`Students in grade ${grade} = `+ existingStudents);
            }
        }
    }
}

function sortStudentsAndDisplayByGrade(sortOrder: number) {
    // 1 for ascending and -1 for descending order
    const grades: number[] = [...schoolRecord.keys()];
    if (sortOrder === -1) {
        grades.sort(function(a, b) {
            return (b-a);
        });
    }
    else if (sortOrder === 1) {
        grades.sort(function(a, b) {
            return (a-b);
        });
    }
    grades.forEach((grade: number) => {
        const existingStudents: string[] | undefined = schoolRecord.get(grade);
        const studentsForSort = existingStudents;
        if (sortOrder === -1) {
            studentsForSort?.sort(function(a, b) {
                if (a > b) {
                    return -1;
                }
                else if (b > a) {
                    return 1;
                }
                return 0;
            })
        }
        else if (sortOrder === 1) {
            studentsForSort?.sort(function(a, b) {
                if (a > b) {
                    return 1;
                }
                else if (b > a) {
                    return -1;
                }
                return 0;
            })
        }

        if (studentsForSort?.length) {
            console.log(`Students in grade ${grade} = `+ studentsForSort);
        }
    });
}

initializeSchool();
getStudentsByGrade(3);
sortStudentsAndDisplayByGrade(-1);
enrollNewStudent("Jim", 2);