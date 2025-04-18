import { MODELS } from '../../sequelize.js';
import Sequelize from 'sequelize';
import { ModelLogManager } from '../ModelLogHelper.js';
import { filterAvail } from '../../helper/entityhelper.js';

const className = 'Contracts';
const Op = Sequelize.Op;
const PropName = ['contractAddress', 'contractName', 'abi', 'bin'];

export class CNContracts {
  static async getAll() {
    return new Promise(async (res, rej) => {
      try {
        const { Contracts } = MODELS;
        const list = await Contracts.findAll();
        return res({ ok: true, list });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async getById(id) {
    return new Promise(async (res, rej) => {
      try {
        const { Contracts } = MODELS;
        const contractE = await Contracts.findByPk(id);
        if (!contractE) throw Error('ERRORCF404');

        const detail = await contractE.get({ plain: true });

        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async getByContractAddress(contractAddress) {
    return new Promise(async (res, rej) => {
      try {
        const { Contracts } = MODELS;
        const contractE = await Contracts.findOne({
          where: {
            contractAddress,
          },
        });
        if (!contractE) throw Error('ERRORCAD404');

        const detail = await contractE.get({ plain: true });

        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async updateByUid(id, data) {
    return new Promise(async (res, rej) => {
      try {
        const { Contracts } = MODELS;
        const contractE = await Contracts.findByPk(id);
        if (!contractE) throw Error('ERRORCU404');

        const updateData = filterAvail(PropName, data);
        await contractE.update(updateData);
        const detail = await contractE.get({ plain: true });
        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async updateByContractAddress(contractAddress, updatedFields) {
    return new Promise(async (res, rej) => {
      try {
        const { Contracts } = MODELS;
        const contractE = await Contracts.findOne({
          where: {
            contractAddress,
          },
        });
        if (!contractE) throw Error('ERRORCUA404');

        const updateData = filterAvail(PropName, updatedFields);
        await contractE.update(updateData);
        const detail = await contractE.get({ plain: true });
        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }

  static async add(contractAddress, data) {
    return new Promise(async (res, rej) => {
      try {
        const { Contracts } = MODELS;
        const contractE = await Contracts.findOne({
          where: {
            contractAddress,
          },
        });

        //check if already user is there
        if (contractE) throw Error('ERRORCA404');

        const updateData = filterAvail(PropName, data);
        console.log('updateData', updateData);
        const newE = await Contracts.create(updateData);
        const detail = await newE.get({ plain: true });
        return res({ ok: true, detail });
      } catch (error) {
        console.log(`error??`, error);
        return res({ ok: false, error });
      }
    });
  }
}
