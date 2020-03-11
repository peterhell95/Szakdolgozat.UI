import { Book } from './book';

export class Order {
    public id: number;
    public comment: string;
    public delivery: string;
    public price: number;
    public book: Book[];
    constructor(id: number, comment: string, delivery: string, price: number, book: Book[]) {

        this.id = id;
        this.comment = comment;
        this.delivery = delivery;
        this.price = price;
        this.book = book;
    }
}
