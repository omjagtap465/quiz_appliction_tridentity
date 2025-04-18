import express from 'express';
import { CMBlockChain } from '../../entityManagers/company/cmBlockChain.js';
import axios from 'axios';

export const company_blockchain_api = express.Router();

const ns = `/company/bcdrcgw`;

// Test CMBlockChain
company_blockchain_api.get(`${ns}/test`, function (req, res) {
  res.send(`${ns} OK`);
});

company_blockchain_api.post(`${ns}/getKeyByAppIdAndSid`, async (req, res) => {
  try {
    const appId = req.headers['appid'];
    const sid = req.headers['sid'];
    const { querier, data, hashkey } = req.body;
    if (!appId || !sid) {
      return res.status(400).json({
        ok: false,
        error: 'appId and sid are required',
      });
    }
    const result = await CMBlockChain.getKeyByAppIdAndSid(querier, appId, sid);
    res.send(result);
  } catch (error) {
    console.error('Error in getKeyByAppIdAndSid:', error);
    return res.status(500).json({ error: error.message });
  }
});

// CRUD for YearSecretKey
company_blockchain_api.post(`${ns}/getAllYearKeys`, async (req, res) => {
  try {
    const { querier } = req.body;
    const result = await CMBlockChain.getAllYearKeys(querier);
    res.send(result);
  } catch (error) {
    console.error('Error in getAllYearKeys:', error);
    return res.status(500).json({ error: error.message });
  }
});

company_blockchain_api.post(`${ns}/getYearKey`, async (req, res) => {
  try {
    const { querier, year } = req.body;
    const result = await CMBlockChain.getYearKey(querier, year);
    res.send(result);
  } catch (error) {
    console.error('Error in getYearKey:', error);
    return res.status(500).json({ error: error.message });
  }
});

company_blockchain_api.post(`${ns}/updateYearKey`, async (req, res) => {
  try {
    const { querier, year, newSecretKey } = req.body;
    const result = await CMBlockChain.updateYearKey(
      querier,
      year,
      newSecretKey
    );
    res.send(result);
  } catch (error) {
    console.error('Error in updateYearKey:', error);
    return res.status(500).json({ error: error.message });
  }
});

company_blockchain_api.post(`${ns}/createYearKey`, async (req, res) => {
  try {
    const { querier, year } = req.body;
    const result = await CMBlockChain.createYearKey(querier, year);
    res.send(result);
  } catch (error) {
    console.error('Error in createYearKey:', error);
    return res.status(500).json({ error: error.message });
  }
});

company_blockchain_api.post(`${ns}/deleteYearKey`, async (req, res) => {
  try {
    const { querier, year } = req.body;
    const result = await CMBlockChain.deleteYearKey(querier, year);
    res.send(result);
  } catch (error) {
    console.error('Error in deleteYearKey:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Invoke , Query, newUser of Connector
company_blockchain_api.post(`${ns}/evokeEvm`, async (req, res) => {
  try {
    const { querier, data } = req.body;
    const requestBody = { data };
    const result = await CMBlockChain.evokeEvm(querier, requestBody);
    res.send(result);
  } catch (error) {
    console.error('Error in evokeEvm:', error);
    return res.status(500).json({ error: error.message });
  }
});

company_blockchain_api.post(`${ns}/queryEvm`, async (req, res) => {
  try {
    const { querier, data } = req.body;
    const requestBody = { data };
    const result = await CMBlockChain.queryEvm(querier, requestBody);
    res.send(result);
  } catch (error) {
    console.error('Error in queryEvm:', error);
    return res.status(500).json({ error: error.message });
  }
});

company_blockchain_api.post(`${ns}/newUser`, async (req, res) => {
  try {
    console.log('in');
    // const url =  "http://localhost:9010/bc/554629/newUser";
    // const response = await axios.get(url);
    // console.log("Response Data:", response.data);
    // const result = await response.data;
    const { querier, data, walletNumber } = req.body;
    const requestBody = { data, walletNumber };
    const result = await CMBlockChain.newUser(querier, requestBody);
    res.send(result);
  } catch (error) {
    console.error('Error in queryEvm:', error);
    return res.status(500).json({ error: error.message });
  }
});
