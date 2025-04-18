import { company_access_api } from './company_access_api.js';
import { company_blockchain_api } from './company_blockchain_api.js';
import { company_drcgateway_api } from './company_drcgateway_api.js';
import { company_middleware } from './company_middleware.js';
import { company_public_api } from './company_public_api.js';
// import { company_yearSecretKey_api } from "./company_yearsk_api.js";

export const companyApis = [
  company_middleware,
  company_blockchain_api,
  company_access_api,
  company_public_api,
  company_drcgateway_api,
];
