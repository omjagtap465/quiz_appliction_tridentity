import { MODELS } from "../../sequelize.js";

export class CMAuditLog {
  static async list(querier, where, options = {}) {
    const { claims } = querier;
    const include = `userProfile` === claims.profileType ? [{ model: MODELS.CompanyProfile, where: { id: querier.companyId } }] : [];
    const { ModelLog, UserProfile } = MODELS;
    console.log(`where?`, where);
    try {
      const list = await ModelLog.findAll({
        where,
        ...options,
        include,
        raw: true,
      });
      for (const row of list) {
        const { profileId, profileType } = row;
        switch (profileType) {
          case `userProfile`:
            try {
              const profile = await UserProfile.findByPk(profileId, {
                raw: true,
              });
              row.profile = profile;
            } catch (profileError) {
              console.error(
                `Error fetching profile for ID ${profileId}:`,
                profileError
              );
              row.profile = null;
            }
            break;
        }
      }
      return { ok: true, list };
    } catch (error) {
      console.error(`Error fetching ModelLog list:`, error);
      return Promise.resolve({ ok: false, error });
    }
  }
}
