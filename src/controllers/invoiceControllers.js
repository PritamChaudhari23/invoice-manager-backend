const invoiceService = require("../services/invoiceService");

async function addInvoice(req, res) {
  const invoice = await invoiceService.addInvoice(req.body);
  res.status(201).json(invoice);
}

async function getAllInvoices(req, res) {
  const invoices = await invoiceService.getAllInvoices();
  res.status(200).json(invoices);
}

async function getInvoiceById(req, res) {
  const invoice = await invoiceService.getInvoiceById(req.params.id);
  res.status(200).json(invoice);
}

async function updateInvoice(req, res) {
  const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
  res.status(200).json(invoice);
}

async function deleteInvoice(req, res) {
  await invoiceService.deleteInvoice(req.params.id);
  res.status(200).json({ message: "Invoice deleted successfully" });
}

module.exports = {
  addInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
