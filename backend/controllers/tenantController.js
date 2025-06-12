import Customer from "../models/Tenant.model.js";
export const createTenant = async (req, res) => {
  const {
    fullname,
    birthday,
    CIDNumber,
    sex,
    phone1,
    phone2,
    email,
    birthPlace,
    CIDIssuedDate,
    CIDIssuedPlace,
    province,
    vehicleNumber,
    permanentAddress,
    note,
  } = req.body;

  if (!fullname || !birthday || !CIDNumber || !sex || !phone1 || !email) {
    return res.status(400).json({
      success: false,
      error: "Please fill in all required fields.",
    });
  }

  try {
    const tenant = new Customer(req.body);
    const savedTenant = await tenant.save();
    res.status(201).json({ success: true, tenant: savedTenant });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
// Get all tenants
export const getAllTenants = async (req, res) => {
  try {
    const tenants = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(tenants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get tenant by ID
export const getTenantById = async (req, res) => {
  try {
    const tenant = await Customer.findById(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.status(200).json(tenant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update tenant
export const updateTenant = async (req, res) => {
  try {
    const updatedTenant = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTenant)
      return res.status(404).json({ message: "Tenant not found" });
    res.status(200).json(updatedTenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Delete tenant
export const deleteTenant = async (req, res) => {
  try {
    const deletedTenant = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedTenant)
      return res.status(404).json({ message: "Tenant not found" });
    res.status(200).json({ message: "Tenant deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
