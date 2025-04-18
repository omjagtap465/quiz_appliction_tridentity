import express from 'express';
export const connector_middleware = express.Router();
const ns = `/connector`;
connector_middleware.all(`${ns}/*`, async function (req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  console.log(`in ${ns}/*`, req.path);
  console.log(`res:: incoming`, ip);
  req.body.querier = { ip };
  function normalizeIp(ip) {
    // Remove the `::ffff:` prefix if it's an IPv6-mapped IPv4 address
    return ip.startsWith('::ffff:') ? ip.substring(7) : ip;
  }

  const originIP = normalizeIp(ip);
  const whiteListedIps = ['127.0.0.1', '192.168.16.2', '192.168.16.3'];

  //DO NOT REMOVE , this is for testing
  if (req.path.startsWith(`/connector/public`) || req.path.endsWith(`/test`))
    return next();

  // if (!whiteListedIps.some((ipDetail) => ipDetail === originIP)) {
  //   return res.status(403).json({ error: 'Invalid IP' });
  // }

  if ('jhded3i23023jfni392400jf4ffjfrjfrfjrnfjrnfrffr' !== req.body.hashkey) {
    return res.status(401).json({ error: 'Invalid hashkey' });
  }

  req.querier = req.body.querier;
  // ApiLogManager.log(req.body.querier, req.path);
  next(); // pass control to the next handler
});
