import express from "express";

export const company_quiz_api = express.Router();

const ns = `/company/quiz`;
company_quiz_api.get(`${ns}/question`, function (req, res) {
  res.send(`${ns} OK`);
});
company_quiz_api.get(`${ns}/question`, function (req, res) {
    res.send(`${ns} question OK`);
  });
// company_quiz_api.get(`${ns}/question`,function(req,res)  {
//     res.send(`${ns}/question By date Working `)
// })