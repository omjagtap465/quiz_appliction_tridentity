import express from 'express';
import { Q_listoptions, Q_where } from '../helper/queryHelper.js';
import { seqVError } from '../../entityManagers/seqErrorHelper.js';
import { CNContracts } from '../../entityManagers/connector/cnContracts.js';

export const connector_contracts_api = express.Router();

const ns = `/connector/contract`;
connector_contracts_api.get(`${ns}/:id/getById`, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(500).json({ error: 'Invalid id' });

    const det = await CNContracts.getById(id);
    if (det.ok) {
      res.send(det);
    } else {
      return res.json({ ok: false, error: det.error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

connector_contracts_api.post(`${ns}/getByContractAddress`, async (req, res) => {
  try {
    const { address } = req.body;
    console.log('req.body', req.body);
    if (!address) return res.status(500).json({ error: 'Invalid address' });

    const det = await CNContracts.getByContractAddress(address);
    console.log('det', det);
    if (det.ok) {
      res.send(det);
    } else {
      return res.json({ ok: false, error: det.error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

connector_contracts_api.post(
  `${ns}/updateByContractAddress`,
  async (req, res) => {
    try {
      const { data, address } = req.body;
      if (!address) return res.status(500).json({ error: 'Invalid address' });

      const det = await CNContracts.updateByContractAddress(address, data);
      if (det.ok) {
        res.send(det);
      } else {
        return res.json({ ok: false, error: det.error.message });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

connector_contracts_api.post(`${ns}/add`, async (req, res) => {
  try {
    const { data, address } = req.body;
    const det = await CNContracts.add(address, data);
    if (det.ok) {
      res.send(det);
    } else {
      return res.json({ ok: false, error: det.error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
