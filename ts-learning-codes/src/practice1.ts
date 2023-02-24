let inputArray: any[] = [1, "2", 3, "4"];
printStars(inputArray);

function printStars(arr: any[]) {
    arr.forEach((element: any) => {
        if (typeof(element) == 'number') {
            printNumberOfStars(element);
        }
        else {
            const numberElement: number = Number(element);
            printNumberOfStars(numberElement);
        }
        console.log("\n");
    });
}

function printNumberOfStars(numberOfStars: number) {
    for (let i=1; i <= numberOfStars; i++) {
        process.stdout.write("* ");
    }
}