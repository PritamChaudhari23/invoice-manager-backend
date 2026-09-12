const mongoose = require("mongoose");
const Invoice = require("../../models/mongoose/invoice");
const AppError = require("../../utils/AppError");

function assertValidId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid invoice ID", 400);
  }
}

class InvoiceRepository {
  async create(data) {
    return Invoice.create(data);
  }

  async findAll(filter = {}) {
    return Invoice.find(filter);
  }

  async findById(id) {
    assertValidId(id);
    return Invoice.findById(id);
  }

  async updateById(id, data) {
    assertValidId(id);
    return Invoice.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    assertValidId(id);
    return Invoice.findByIdAndDelete(id);
  }
}

module.exports = new InvoiceRepository();
