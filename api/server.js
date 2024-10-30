const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit to 10 MB

// In-memory databases
let accounts = [];
let pods = [];

// ID counters
let accountIdCounter = 1; // Start account IDs from 1
let podIdCounter = 1;     // Start pod IDs from 1

// Accounts CRUD endpoints
app.post('/api/accounts', (req, res) => {
    const account = {
        id: accountIdCounter++, // Assign current ID and increment
        ...req.body
    };
    accounts.push(account);
    res.status(201).json(account);
});

app.get('/api/accounts', (req, res) => {
    res.json(accounts);
});

app.get('/api/accounts/:id', (req, res) => {
    const account = accounts.find(a => a.id == req.params.id);
    if (account) {
        res.json(account);
    } else {
        res.status(404).send('Account not found');
    }
});

app.put('/api/accounts/:id', (req, res) => {
    const index = accounts.findIndex(a => a.id == req.params.id);
    if (index !== -1) {
        accounts[index] = { ...accounts[index], ...req.body }; // Update account, preserving the ID
        res.json(accounts[index]);
    } else {
        res.status(404).send('Account not found');
    }
});

app.delete('/api/accounts/:id', (req, res) => {
    accounts = accounts.filter(a => a.id != req.params.id);
    res.status(204).send();
});

// Pods CRUD endpoints
app.post('/api/pods', (req, res) => {
    const pod = {
        id: podIdCounter++, // Assign current ID and increment
        ...req.body
    };
    pods.push(pod);
    res.status(201).json(pod);
});

app.get('/api/pods', (req, res) => {
    res.json(pods);
});

app.get('/api/pods/:id', (req, res) => {
    const pod = pods.find(p => p.id == req.params.id);
    if (pod) {
        res.json(pod);
    } else {
        res.status(404).send('Pod not found');
    }
});

app.put('/api/pods/:id', (req, res) => {
    const index = pods.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        pods[index] = { ...pods[index], ...req.body }; // Update pod, preserving the ID
        res.json(pods[index]);
    } else {
        res.status(404).send('Pod not found');
    }
});

app.delete('/api/pods/:id', (req, res) => {
    pods = pods.filter(p => p.id != req.params.id);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
