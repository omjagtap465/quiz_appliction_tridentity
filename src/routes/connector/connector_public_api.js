import express from 'express';
import { Q_listoptions, Q_where } from '../helper/queryHelper.js';
import { seqVError } from '../../entityManagers/seqErrorHelper.js';

export const connector_public_api = express.Router();

const ns = `/connector/public`;
connector_public_api.get(`${ns}/test`, function (req, res) {
  res.send(`${ns} OK`);
});
