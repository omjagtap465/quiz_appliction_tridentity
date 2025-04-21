import express from 'express';
import { CMAuth } from '../../entityManagers/company/cmAuth.js';
import { HashingService } from '../../entityManagers/company/cmBCHashingService.js';
export const company_middleware = express.Router();
const ns = `/company`;
company_middleware.all(`${ns}/*`, async function (req, res, next) {

  //DO NOT REMOVE , this is for testing
  if (req.path.startsWith(`/company/public`) || req.path.endsWith(`/test`))
    return next();

  try {

    
    if (!sKey || !sKey.key) throw Error('ERRORKEY404');
    
    const lastPathSegment = req.path.split('/').pop(); 
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: err.message });
  }
  
  // req.querier = req.body.querier;
  // console.log('middle ware end');
  next(); // pass control to the next handler
});
