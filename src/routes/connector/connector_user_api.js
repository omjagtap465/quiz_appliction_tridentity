import express from 'express';
import { Q_listoptions, Q_where } from '../helper/queryHelper.js';
import { seqVError } from '../../entityManagers/seqErrorHelper.js';
import { CNUsers } from '../../entityManagers/connector/cnUsers.js';

export const connector_user_api = express.Router();

const ns = `/connector/user`;
connector_user_api.get(`${ns}/:uid/getByUid`, async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) return res.status(500).json({ error: 'Invalid uid' });

    const det = await CNUsers.getByUid(uid);
    if (det.ok) {
      res.send(det);
    } else {
      return res.json({ ok: false, error: det.error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

connector_user_api.post(`${ns}/:uid/updateByUid`, async (req, res) => {
  try {
    const { uid } = req.params;
    const { data } = req.body;
    if (!uid) return res.status(500).json({ error: 'Invalid uid' });

    const det = await CNUsers.updateByUid(uid, data);
    if (det.ok) {
      res.send(det);
    } else {
      return res.json({ ok: false, error: det.error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

connector_user_api.post(`${ns}/:uid/add`, async (req, res) => {
  try {
    const { uid } = req.params;
    const { data } = req.body;
    const det = await CNUsers.add(uid, data);
    if (det.ok) {
      res.send(det);
    } else {
      return res.json({ ok: false, error: det.error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
