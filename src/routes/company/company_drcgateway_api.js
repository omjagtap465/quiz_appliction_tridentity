import express from "express";

export const company_drcgateway_api = express.Router();

const ns = `/company/drcgateway`;
company_drcgateway_api.get(`${ns}/test`, function (req, res) {
  res.send("COMPANY DRC GAETWAY API OK");
});
