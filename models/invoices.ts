import get from "./actions/get";
import post from "./actions/post"
import put from "./actions/put"
import storage from "./storage"
import Invoice from "../interfaces/invoice"
import Order from "../interfaces/order"

const invoices = {
    pickInvoice: async function pickInvoice(invoice: Partial<Invoice>, order: Partial<Order>) {
        const today = new Date();
        let day = today.getDate().toString()

        if (day.length == 1) {
            day = "0" + day
        }

        let month = (today.getMonth() + 1).toString()

        if (month.length == 1) {
            month = "0" + month
        }

        const date = month + '/' + day + '/' + today.getFullYear().toString().substring(2);
        let price = 0;

        order.order_items.forEach((obj) => {
            price += obj.price * obj.amount;
        });

        const newInvoice = {
            ...invoice,
            creation_date: date,
            total_price: price
        }

        await this.addInvoice(newInvoice)

        let ord = {
            id: order.id,
            name: order.name,
            status_id: 600
        }

        await put.putOrder(ord)
    },
    getInvoices: async function getInvoices() {
        const obj = await storage.readToken()

        const api = await get.getInvoices(obj.token);

        return api
    },
    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        const obj = await storage.readToken()

        await post.postInvoice(invoice, obj.token)
    }
};

export default invoices;