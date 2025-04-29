const express = require('express');
const router = express.Router();

// Sample financial data
router.get('/data', (req, res) => {
  res.json({
    revenue: [12000, 19000, 15000, 18000, 19000, 22000],
    expenses: [8000, 11000, 9000, 10000, 12000, 11000],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    categories: ['Salaries', 'Marketing', 'Office', 'Technology', 'Travel', 'Utilities', 'Other'],
    categoryAmounts: [35000, 18000, 8000, 12000, 5000, 3000, 7000],
    transactions: [] // Actual transactions would come from database
  });
});

module.exports = router;
