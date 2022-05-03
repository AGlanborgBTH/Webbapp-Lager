import get from "./actions/get";
import post from "./actions/post"
import storage from "./storage"

const invoices = {
    getInvoices: async function getInvoices() {
        const obj =  await storage.readToken()

        return await get.getInvoices(obj.token);
    },
    addInvoice: async function addInvoice(invoice) {
        const obj =  await storage.readToken()

        await post.postInvoice(invoice, obj.token)
    }
};

export default invoices;