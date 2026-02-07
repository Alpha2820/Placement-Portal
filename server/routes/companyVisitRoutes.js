const express = require('express');
const router = express.Router();
const companyVisitController = require('../controllers/companyVisitController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/company-visits - Get all company visits (public)
router.get('/', companyVisitController.getAllCompanyVisits);

// POST /api/company-visits - Add new company visit (admin only)
router.post('/', verifyToken, isAdmin, companyVisitController.addCompanyVisit);

// PUT /api/company-visits/:id - Update company visit (admin only)
router.put('/:id', verifyToken, isAdmin, companyVisitController.updateCompanyVisit);

// DELETE /api/company-visits/:id - Delete company visit (admin only)
router.delete('/:id', verifyToken, isAdmin, companyVisitController.deleteCompanyVisit);

// PUT /api/company-visits/:id/archive - Archive company visit (admin only)
router.put('/:id/archive', verifyToken, isAdmin, companyVisitController.archiveCompanyVisit);

module.exports = router;