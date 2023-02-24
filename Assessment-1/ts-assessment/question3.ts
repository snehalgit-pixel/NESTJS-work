function append<T>(list1: T[], list2: T[]): T[] {
    list2.forEach((item: T) => {
        list1.push(item);
    });
    return list1;
}

function concatenate<T>(list1: T[], list2: T[]): T[] {
    const list3: T[] = [...list1, ...list2];
    return list3;
}

function filter<T>(list: T[], targetItem: T): T[] {
    const filteredRes: T[] = [];
    list.forEach((item: T) => {
        if (item == targetItem) {
            filteredRes.push(item);
        }
    });
    return filteredRes;
}

function lengthOfList<T>(list: T[]): number {
    let count = 0;
    list.forEach((item: T) => {
        count = count + 1;
    });
    return count;
}

function reverse<T>(list: T[]): T[] {
    const rev: T[] = [];
    for (let i=lengthOfList(list) -1; i>=0; i--) {
        rev.push(list[i]);
    }
    return rev;
}