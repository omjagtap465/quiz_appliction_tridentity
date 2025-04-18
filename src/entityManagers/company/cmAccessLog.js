import { MODELS } from "../../sequelize.js";

const className = "ApiAccessLog";

export class CMAccessLog {
  static async list(querier, where, options = {}) {
    const { claims, companyId } = querier;
    const { ApiAccessLog, UserProfile } = MODELS;
    where.companyProfileId = companyId;
    console.log(`[${className}] Fetching access logs...`);
    console.log(`Query Options:`, options);
    try {
      const list = await ApiAccessLog.findAll({
        where,
        ...options,
        attributes: ["id", "ip", "profileId", "profileType", "path", "createdAt"],
        raw: true,
      });
      for (const row of list) {
        const { profileId, profileType } = row;
        if (profileType === "userProfile") {
          try {
            const profile = await UserProfile.findByPk(profileId, {
              raw: true,
            });
            row.profile = profile;
          } catch (profileError) {
            console.error(
              `[${className}] Error fetching user profile:`,
              profileError.message
            );
            row.profile = null; // Ensure missing profiles don't break the response
          }
        }
      }
      console.log(`[${className}] Access logs retrieved successfully.`);
      return {
        ok: true,
        list,
      };
    } catch (error) {
      console.error(
        `[${className}] Error fetching access logs:`,
        error.message
      );
      return {
        ok: false,
        error: error.message, // Return only the error message for cleaner response
      };
    }
  }
}
