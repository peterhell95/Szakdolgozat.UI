
export class Rate {
    public id: number;
    public orderid: number;
    public bookid: number;
    public rate: number;
    public rated: boolean;
    constructor(orderid: number, bookid: number) {
        this.orderid = orderid;
        this.bookid = bookid;
    }
}
