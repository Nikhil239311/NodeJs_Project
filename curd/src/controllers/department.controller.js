const Department = require('../models/department.model');

exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });

    await department.update(req.body);
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Department not found' });

    await department.destroy();
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
