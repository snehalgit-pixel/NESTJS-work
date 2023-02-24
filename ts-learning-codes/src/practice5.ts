enum PayMode {
    UPI = "Upi",
    CASH = "Cash"
}
class Product {
    constructor(public productId: number, public price: number, public preferredPayMode?: string) {
        if ((this.preferredPayMode && (this.preferredPayMode == "Cash" || this.preferredPayMode == "CASH" || this.preferredPayMode == "C")) || !preferredPayMode) {
            this.preferredPayMode = PayMode.CASH
        }
        else if (this.preferredPayMode && (this.preferredPayMode == "upi" || this.preferredPayMode == "UPI" || this.preferredPayMode == "Upi")) {
            this.preferredPayMode = PayMode.UPI
        }
    }
    public paymentTransaction(paymentMode: string): void {
        switch(paymentMode) {
            case PayMode.UPI:
                console.log("Pay online with UPI");
                break;
            case PayMode.CASH:
                console.log("Pay with hard cash");
                break;
        }
    }
}

class Food extends Product {
    constructor(public productId: number, public price: number, private _description?: string) {
        super(productId, price);
    }
    get foodDescription(): string {
        return this._description ? this._description : "N/A";
    }
}

class Book extends Product {
    constructor(public productId: number, public price: number, private _isbn?: string) {
        super(productId, price);
    }
    get bookIsbn(): string {
        return this._isbn ? this._isbn : "N/A";
    }
}

class Utensil extends Product {
    constructor(public productId: number, public price: number, private size?: string) {
        super(productId, price);
    }
    get utensilSize(): string {
        return this.size ? this.size : "N/A";
    }
}