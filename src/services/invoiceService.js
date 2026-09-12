const { invoiceRepository } = require("../repositories/index");
const AppError = require("../utils/AppError");

function canBeDeleted(invoice) {
  return !invoice.isPaid;
}

class InvoiceService {
  addInvoice(data) {
    return invoiceRepository.create(data);
  }

  getAllInvoices(filter = {}) {
    return invoiceRepository.findAll(filter);
  }

  async getInvoiceById(id) {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) throw new AppError("Invoice not found", 404);
    return invoice;
  }

  async updateInvoice(id, data) {
    if (!data || Object.keys(data).length === 0) {
      throw new AppError("No update data provided", 400);
    }
    const updated = await invoiceRepository.updateById(id, data);
    if (!updated) throw new AppError("Invoice not found", 404);
    return updated;
  }

  async deleteInvoice(id) {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) throw new AppError("Invoice not found", 404);
    if (!canBeDeleted(invoice)) {
      throw new AppError("Paid invoices cannot be deleted", 409);
    }
    return invoiceRepository.deleteById(id);
  }
}

module.exports = new InvoiceService();
