import { MODELS } from '../../sequelize.js';
import Sequelize from 'sequelize';
import { filterAvail } from '../../helper/entityhelper.js';
import { KmsService } from '../company/cmKMS.js';
// import { kmsEncrypt, kmsDecrypt } from '../entityManagers/company/cmKMS.js';

const className = 'Users';
const Op = Sequelize.Op;
const PropName = [
  'evmAddress',
  'signCrt',
  'signCsr',
  'signKey',
  'tlsCsr',
  'tlsKey',
];

export class CNUsers {
  static async getAll() {
    return new Promise(async (res, rej) => {
      try {
        const { Users } = MODELS;
        const list = await Users.findAll();

        const decryptedList = await Promise.all(
          list.map(async (user) => {
            const detail = user.get({ plain: true });
            for (const key of PropName) {
              if (detail[key]) {
                detail[key] = await KmsService.kmsDecrypt(detail[key]);
              }
            }
            return detail;
          })
        );
        return res({ ok: true, list: decryptedList });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async getByUid(uid) {
    return new Promise(async (res, rej) => {
      try {
        const { Users } = MODELS;
        if (!uid) throw Error('ERRORIU404');
        const userE = await Users.findOne({ where: { uid: uid.toString() } });
        if (!userE) throw Error('ERRORF404');

        const detail = await userE.get({ plain: true });
        for (const key of PropName) {
          if (detail[key]) {
            detail[key] = await KmsService.kmsDecrypt(detail[key]);
          }
        }
        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async updateByUid(uid, data) {
    return new Promise(async (res, rej) => {
      try {
        const { Users } = MODELS;
        const userE = await Users.findOne({ where: { uid } });
        if (!userE) throw Error('ERRORU404');

        const updateData = filterAvail(PropName, data);
        for (const key of PropName) {
          if (updateData[key]) {
            updateData[key] = await KmsService.kmsEncrypt(updateData[key]);
          }
        }
        await userE.update(updateData);

        const detail = userE.get({ plain: true });
        for (const key of PropName) {
          if (detail[key]) {
            detail[key] = await KmsService.kmsDecrypt(detail[key]);
          }
        }
        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async add(uid, data) {
    return new Promise(async (res, rej) => {
      try {
        const { Users } = MODELS;
        const userE = await Users.findOne({ where: { uid } });
        if (userE) throw Error('ERRORA404');

        const updateData = filterAvail(PropName, data);
        updateData['uid'] = uid;

        for (const key of PropName) {
          if (updateData[key]) {
            updateData[key] = await KmsService.kmsEncrypt(updateData[key]);
          }
        }

        const newE = await Users.create(updateData);
        const detail = newE.get({ plain: true });

        for (const key of PropName) {
          if (detail[key]) {
            detail[key] = await kmsDecrypt(detail[key]);
          }
        }
        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }
}
