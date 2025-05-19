/**
 * VEYA Platform - Express Server
 * 
 * This Express server allows you to access the VEYA platform
 * and marketing dashboard through a single interface.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Create public directory if it doesn't exist
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Serve static files
app.use(express.static('public'));
app.use('/valuation', express.static(path.join(__dirname, 'valuation-panel-ui/ui')));
app.use('/valuation/assets', express.static(path.join(__dirname, 'valuation-panel-ui/assets')));

// Home route - redirect to valuation panel for now
app.get('/', (req, res) => {
  res.redirect('/valuation');
});

// Valuation route
app.get('/valuation', (req, res) => {
  res.sendFile(path.join(__dirname, 'valuation-panel-ui/ui', 'index.html'));
});

// VEYA OS Comprehensive Valuation report in markdown
app.get('/valuation/report', (req, res) => {
  res.sendFile(path.join(__dirname, 'VEYA_OS_Comprehensive_Valuation.md'));
});

// VEYA OS Valuation presentation in markdown
app.get('/valuation/presentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'VEYA_OS_Valuation_Presentation.md'));
});

// VEYA OS Component Value Analysis in markdown
app.get('/valuation/components', (req, res) => {
  res.sendFile(path.join(__dirname, 'VEYA_OS_Component_Value_Analysis.md'));
});

// VEYA OS Revenue Models Analysis in markdown
app.get('/valuation/revenue', (req, res) => {
  res.sendFile(path.join(__dirname, 'VEYA_OS_Revenue_Models_Analysis.md'));
});

// API route to get the total valuation ranges
app.get('/api/valuation', (req, res) => {
  res.json({
    cad: {
      low: 165000000,
      mid: 206250000,
      high: 247500000
    },
    usd: {
      low: 120000000,
      mid: 150000000,
      high: 180000000
    },
    components: {
      sovereign_aenode: { low: 30000000, high: 45000000 },
      creator_economy: { low: 25000000, high: 37500000 },
      core_protocol: { low: 20000000, high: 30000000 },
      clone_identity: { low: 15000000, high: 22500000 },
      banking_bridge: { low: 15000000, high: 22500000 },
      ritual_vault: { low: 18000000, high: 27000000 },
      ai_test_fleet: { low: 12000000, high: 18000000 },
      user_experience: { low: 10000000, high: 15000000 }
    },
    tokens: {
      xuve: { supply: 80000000, low: 40000000, mid: 60000000, high: 80000000 },
      vae: { supply: 1000000000, low: 50000000, mid: 75000000, high: 100000000 },
      aeth: { supply: 88000000, low: 22000000, mid: 33000000, high: 44000000 },
      lytx: { supply: 1000000000, low: 25000000, mid: 37500000, high: 50000000 },
      noxis: { supply: 120000000, low: 18000000, mid: 27000000, high: 36000000 }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`VEYA Platform server running on port ${port}`);
});