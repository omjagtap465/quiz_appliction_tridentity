import { MODELS } from '../../sequelize.js';
import { getJson, postJson } from '../../helper/axio.js';
import { KmsService } from './cmKMS.js';

export class CMBlockChain {
  static async getKeyByAppIdAndSid(querier, appId, sid) {
    const { AppSecretKey } = MODELS;
    try {
      const keyEntity = await AppSecretKey.findOne({
        where: {
          appId,
          sid,
        },
      });
      if (!keyEntity) {
        return {
          ok: false,
          error: 'No key found for the provided appId and sid',
        };
      }
      const detail = keyEntity.get({ plain: true });
      return {
        ok: true,
        detail: {
          key: detail.key,
        },
      };
    } catch (error) {
      console.error('Error in getKeyByAppIdAndSid:', error);
      return {
        ok: false,
        error: error.message || 'An error occurred while retrieving the key',
      };
    }
  }

  // CRUD for YearSecretKey
  static async getAllYearKeys(querier) {
    const { YearSecretKey } = MODELS;
    try {
      const yearEntities = await YearSecretKey.findAll();
      const details = await Promise.all(
        yearEntities.map(async (entity) => {
          const plainEntity = entity.get({ plain: true });
          if (plainEntity.encryptedSecretKey) {
            const decryptedSecretKey = await KmsService.kmsDecrypt(
              plainEntity.encryptedSecretKey
            );
            return { ...plainEntity, decryptedSecretKey };
          }
          return plainEntity;
        })
      );
      return { ok: true, details };
    } catch (error) {
      console.error('Error in getAllYearKeys:', error);
      return {
        ok: false,
        error:
          error.message || 'An error occurred while retrieving all year keys.',
      };
    }
  }

  static async getYearKey(querier, year) {
    const { YearSecretKey } = MODELS;
    try {
      let yearEntity = await YearSecretKey.findOne({ where: { year } });
      if (!yearEntity) {
        const rawSecretKey = KmsService.generateRandomSecretKey();
        const encryptedSecretKey = await KmsService.kmsEncrypt(rawSecretKey);
        yearEntity = await YearSecretKey.create({
          year,
          encryptedSecretKey,
        });
      }
      const detail = yearEntity.get({ plain: true });
      const decryptedSecretKey = await KmsService.kmsDecrypt(
        detail.encryptedSecretKey
      );
      return { ok: true, detail: { ...detail, decryptedSecretKey } };
    } catch (error) {
      console.error('Error in getYearKey:', error);
      return {
        ok: false,
        error:
          error.message || 'An error occurred while retrieving the year key.',
      };
    }
  }

  static async createYearKey(querier, year) {
    const { YearSecretKey } = MODELS;
    try {
      let yearEntity = await YearSecretKey.findOne({ where: { year } });
      if (!yearEntity) {
        const rawSecretKey = KmsService.generateRandomSecretKey();
        const encryptedSecretKey = await KmsService.kmsEncrypt(rawSecretKey);
        yearEntity = await YearSecretKey.create({
          year,
          encryptedSecretKey,
        });
      }
      const detail = yearEntity.get({ plain: true });
      const decryptedSecretKey = await KmsService.kmsDecrypt(
        detail.encryptedSecretKey
      );
      return { ok: true, detail: { ...detail, decryptedSecretKey } };
    } catch (error) {
      console.error('Error in createYearKey:', error);
      return {
        ok: false,
        error:
          error.message || 'An error occurred while creating the year key.',
      };
    }
  }

  static async updateYearKey(querier, year, newSecretKey) {
    const { YearSecretKey } = MODELS;
    try {
      const yearEntity = await YearSecretKey.findOne({ where: { year } });
      if (yearEntity) {
        // Encrypt the plaintext newSecretKey before storing
        const encryptedSecretKey = await KmsService.kmsEncrypt(newSecretKey);
        await yearEntity.update({
          encryptedSecretKey: encryptedSecretKey, // Store the encrypted key
        });
        const detail = yearEntity.get({ plain: true });
        const decryptedSecretKey = await KmsService.kmsDecrypt(
          encryptedSecretKey
        ); // Decrypt for response
        return { ok: true, detail: { ...detail, decryptedSecretKey } };
      } else {
        throw new Error('YearSecretKey not found for the specified year.');
      }
    } catch (error) {
      console.error('Error in updateYearKey:', error);
      return {
        ok: false,
        error:
          error.message || 'An error occurred while updating the year key.',
      };
    }
  }

  static async deleteYearKey(querier, year) {
    const { YearSecretKey } = MODELS;
    try {
      const yearEntity = await YearSecretKey.findOne({ where: { year } });
      if (yearEntity) {
        await yearEntity.destroy();
        return { ok: true };
      } else {
        throw new Error('YearSecretKey not found for the specified year.');
      }
    } catch (error) {
      console.error('Error in deleteYearKey:', error);
      return {
        ok: false,
        error:
          error.message || 'An error occurred while deleting the year key.',
      };
    }
  }

  // Invoke and Query the EVM connector with the provided data
  static async evokeEvm(querier, requestBody) {
    try {
      const url = `${process.env.CONNECTOR_URL}/evokeEvm`;
      const payload = {
        data: requestBody.data,
      };
      const response = await postJson(url, payload, {});
      if (response.ok) {
        return response;
      } else {
        throw new Error('Failed to evoke EVM.');
      }
    } catch (error) {
      console.error('Error in evokeEvm:', error);
      return {
        ok: false,
        error: error.message || 'An error occurred while evoking the EVM.',
      };
    }
  }

  static async queryEvm(querier, requestBody) {
    try {
      const url = `${process.env.CONNECTOR_URL}/queryEvm`;
      const payload = {
        data: requestBody.data,
      };
      const response = await postJson(url, payload, {});
      console.log('response', response);
      if (response.ok) {
        return response;
      } else {
        throw new Error('Failed to query EVM.');
      }
    } catch (error) {
      console.error('Error in queryEvm:', error);
      return {
        ok: false,
        error: error.message || 'An error occurred while querying the EVM.',
      };
    }
  }

  //hi user
  static async newUser(querier, requestBody) {
    try {
      const payload = {
        data: requestBody.data,
      };
      console.log('hola');
      const url = `${process.env.CONNECTOR_URL}/${requestBody.walletNumber}/newUser`;
      const response = await getJson(url, payload, {});
      if (response) {
        return response;
      } else {
        throw new Error('Failed to newUser EVM.');
      }
    } catch (error) {
      console.error('Error in newUser:', error);
      return {
        ok: false,
        error: error.message || 'An error occurred while newUser the EVM.',
      };
    }
  }
}
