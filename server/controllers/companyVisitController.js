const CompanyVisit = require('../models/CompanyVisit');

// Add new company visit (Admin only)
exports.addCompanyVisit = async (req, res) => {
  try {
    const { companyName, rolesOffered, packageRange, eligibilityCriteria, jobDescription, batch } = req.body;
    const adminId = req.user.userId;

    const companyVisit = new CompanyVisit({
      companyName,
      rolesOffered,
      packageRange,
      eligibilityCriteria,
      jobDescription,
      batch,
      addedBy: adminId
    });

    await companyVisit.save();

    res.status(201).json({
      message: 'Company visit added successfully',
      companyVisit
    });

  } catch (error) {
    console.error('Error adding company visit:', error);
    res.status(500).json({ message: 'Error adding company visit' });
  }
};

// Get all active company visits (Public)
exports.getAllCompanyVisits = async (req, res) => {
  try {
    const companyVisits = await CompanyVisit.find({ status: 'active' })
      .populate('addedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ companyVisits });

  } catch (error) {
    console.error('Error fetching company visits:', error);
    res.status(500).json({ message: 'Error fetching company visits' });
  }
};

// Update company visit (Admin only)
exports.updateCompanyVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const companyVisit = await CompanyVisit.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!companyVisit) {
      return res.status(404).json({ message: 'Company visit not found' });
    }

    res.json({
      message: 'Company visit updated successfully',
      companyVisit
    });

  } catch (error) {
    console.error('Error updating company visit:', error);
    res.status(500).json({ message: 'Error updating company visit' });
  }
};

// Delete company visit (Admin only)
exports.deleteCompanyVisit = async (req, res) => {
  try {
    const { id } = req.params;

    const companyVisit = await CompanyVisit.findByIdAndDelete(id);

    if (!companyVisit) {
      return res.status(404).json({ message: 'Company visit not found' });
    }

    res.json({ message: 'Company visit deleted successfully' });

  } catch (error) {
    console.error('Error deleting company visit:', error);
    res.status(500).json({ message: 'Error deleting company visit' });
  }
};

// Archive company visit (Admin only)
exports.archiveCompanyVisit = async (req, res) => {
  try {
    const { id } = req.params;

    const companyVisit = await CompanyVisit.findByIdAndUpdate(
      id,
      { status: 'archived' },
      { new: true }
    );

    if (!companyVisit) {
      return res.status(404).json({ message: 'Company visit not found' });
    }

    res.json({
      message: 'Company visit archived successfully',
      companyVisit
    });

  } catch (error) {
    console.error('Error archiving company visit:', error);
    res.status(500).json({ message: 'Error archiving company visit' });
  }
};