class People {
    constructor(
        public userId: number,
        public name: string,
        private _balance: number,
        private _tickets?: Ticket[]
        ) {}
    get balance(): number {
        return this._balance;
    }
    get tickets(): Ticket[] {
        return this._tickets ? this._tickets : [];
    }
    public payFeesForTickets(): void {
        this._balance = this._balance - (this._tickets ? this._tickets.length : 0) * Ticket.priceOfTicket;
    }
}

class Ticket {
    public static priceOfTicket: number = 100;
    public static countOfSoldTickets: number = 0;
    constructor(
        public ticketId: number
    ) {}
}

class Seat {
    [seatNo: string]: string;
}

const people: People[] = [
    new People(1, "Abhay", 1245, [{ticketId: ++Ticket.countOfSoldTickets}, {ticketId: ++Ticket.countOfSoldTickets}]),
    new People(2, "Ani", 5249, [{ticketId: ++Ticket.countOfSoldTickets}])
];
let seat = new Seat();
type BalanceAndSeatNo = { balance: number; seat: string | null };

function operations() {
    allocateSeatAndChargeFees();
    const balanceAndSeatOfPerson: BalanceAndSeatNo = getBalanceAndSeatOfPersonById(1);
    console.log("Balance = "+ balanceAndSeatOfPerson.balance + ", Seat number = "+balanceAndSeatOfPerson.seat);
}

function allocateSeatAndChargeFees() {
    seat.A1 = people[0].name;
    seat.A2 = people[0].name;
    people[0].payFeesForTickets();
    seat.A3 = people[1].name;
    people[1].payFeesForTickets();

    // people.forEach((person: People) => {
    //     person.tickets.forEach(() => {
    //         let seatNumber: string = "A" + Ticket.countOfSoldTickets;
    //         seat[seatNumber] = person.name;
    //         person.payFeesForTickets();
    //     });
    // });
}

function getBalanceAndSeatOfPersonById(userId: number) {
    let balanceAndSeat: BalanceAndSeatNo = { balance: 0, seat: null };
    let indexOfPerson: number = -1;
    people.forEach((person: People, index: number) => {
        if (person?.userId === userId) {
            indexOfPerson = index;
        }
    });
    if (indexOfPerson != -1) {
        balanceAndSeat.balance = people[indexOfPerson].balance;
        for (let key of Object.keys(seat))
        {
            if (seat[key] === people[indexOfPerson].name) {
                balanceAndSeat.seat = key;
            }
        }
    }
    return balanceAndSeat;
}

operations();