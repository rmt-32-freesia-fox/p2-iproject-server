const express = require('express');
const DotaController = require('../controller/DotaController');
const routerDota = express.Router();

routerDota.get('/api/dota2', DotaController.getAllProPlayers);

routerDota.get('/api/dota2Team', DotaController.getAllTeams);

routerDota.get('/api/dota2/:team_id', DotaController.getTeamById);

routerDota.post('/generate-midtrans-token', DotaController.midtrans);

module.exports = routerDota;
