import { Book } from './book';

export class Order {
    public id: number;
    public comment: string;
    public delivery: string;
    public price: number;
    public name: string;
    public address: string;
    public book: Book[];
    constructor(comment: string, delivery: string, price: number, name: string, address: string, book: Book[]) {

        this.comment = comment;
        this.delivery = delivery;
        this.price = price;
        this.name = name;
        this.address = address;
        this.book = book;
    }
}
