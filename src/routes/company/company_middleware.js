import express from 'express';
import { CMAuth } from '../../entityManagers/company/cmAuth.js';
import { HashingService } from '../../entityManagers/company/cmBCHashingService.js';
export const company_middleware = express.Router();
const ns = `/company`;
company_middleware.all(`${ns}/*`, async function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`in ${ns}/*`, req.path);
  console.log(`res:: incoming`, ip);
  req.body.querier = { ip };

  //DO NOT REMOVE , this is for testing
  if (req.path.startsWith(`/company/public`) || req.path.endsWith(`/test`))
    return next();

  // console.log('req.headers', req.headers);
  req.body.querier.appId = req.headers.appid;
  req.body.querier.sid = req.headers.sid;
  // req.body.querier.appId = req.headers.appId; //use this dynamic header for aapidSK
  // req.body.querier.sid = req.headers.sid;

  //syd
  try {
    if (!req.headers.appid || !req.headers.sid)
      throw Error('Invalid appid or sid');

    const appDetails = await CMAuth.getAppDetails(req.body.querier); //pass appId , sid
    // console.log('appDetails', appDetails);

    if (!appDetails.ok) {
      //point 1
      return res.status(400).json({ error: 'appDetails is not Ok' });
    }
    const { whiteListedIps, appSecretKeys } = appDetails.detail;
    const originIP = ip; //point 2
    console.log('originIp', ip);
    const sKey = appSecretKeys.find((el) => {
      if (el.sid == req.body.querier.sid) return el;
    });
    if (!sKey || !sKey.key) throw Error('ERRORKEY404');
    const appKey = sKey.key;
    const dataHashKey = await HashingService.generateHash(
      req.body.querier,
      req.body.data,
      appKey
    );
    console.log(dataHashKey);
    const lastPathSegment = req.path.split('/').pop(); //point 4
    // if (!whiteListedIps.some((ipDetail) => ipDetail.ip === originIP)) {
    //   return res.status(403).json({ error: 'Invalid IP' });
    // }
    console.log(
      'compare',
      dataHashKey !== req.body.hashkey,
      dataHashKey,
      req.body.hashkey
    );
    if (dataHashKey !== req.body.hashkey) {
      return res.status(401).json({ error: 'Invalid hashkey1' });
    }
    // if (
    //   !appSecretKeys.some((key) =>
    //     key.appSecretKeyRights.some((right) => right.right === lastPathSegment)
    //   )
    // ) {
    //   return res.status(403).json({ error: 'Unauthorized Access' });
    // }
    console.log('hola');
    req.body.querier.appDetails = appDetails;
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: err.message });
  }
  //1. App if appDetails.ok
  //2. Verify Ip
  //3. Verify hashkey
  //4. verify rights
  //syd

  req.querier = req.body.querier;
  console.log('middle ware end');
  // ApiLogManager.log(req.body.querier, req.path);
  next(); // pass control to the next handler
});
