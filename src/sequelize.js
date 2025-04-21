import Sequelize from 'sequelize';

// import { envConfig } from "./config2/config.js";
import dbConfig from "./config/config.js";
// Brand Model
// import envConfig from './config/server_config.js';
// import ModelLogModel from './models/ModelLog.js';
// import ApiAccessLogModel from './models/ApiAccessLog.js';
// import AccountModel from './models/Account.js';
// import UserProfileModel from './models/UserProfile.js';
// import JwtModel from './models/Jwt.js';
// import AccessRoleModel from './models/AccessRole.js';
// import AccessRoleRightModel from './models/AccessRoleRight.js';
// import AdminProfileModel from './models/AdminProfile.js';
// import BrandModel from './models/Brands.js';
// import ModelsModel from './models/Models.js'
import CustomersModel from './models/Customer.js'
import CouponsModel from './models/coupons.js'
import QuizQuestionsModel from './models/QuizQuestions.js'
import LeaderBoardModel from './models/LeaderBoard.js'
import QuizSelectedByUserModel from './models/QuizSelectedByUser.js'
import QuizQuestionOptionsModel from './models/QuizQuestionOptions.js'
import JwtModel from './models/Jwt.js'
// import AppModel from './models/appSecret/App.js';
// import AppSecretKeyModel from './models/appSecret/AppSecretKey.js';
// import AppSecretKeyRightModel from './models/appSecret/AppSecretKeyRight.js';
// import WhiteListedIpModel from './models/appSecret/WhiteListedIp.js';
// import YearSecretKeyModel from './models/yearSecret/yearSecretKey.js';

// import UsersModel from './models/Users.js';
// import ContractsModel from './models/Contracts.js';

// CREATE SCHEMA `drc_gateway` DEFAULT CHARACTER SET utf8mb4 ;

export let sequelize;
export const MODELS = {};
export const startConnection = async () => {
  const db = dbConfig.development;
  console.log(`sequelize db??`, db);
  sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    port: db.port,
    dialect: 'mysql',
    pool: {
      max: 5000,
      port: db.port,
      min: 0,
      acquire: 30000,
      idle: 10000,
      charset: 'utf8mb4',
    },
    // dialectOptions: {
    //   useUTC: false, // for reading from database
    // },
    timezone: '+08:00', // for writing to database
    logging: false,
  });

  const mandatory = {
    foreignKey: {
      allowNull: false,
    },
  };

  // MODELS.AdminProfile = AdminProfileModel(sequelize, Sequelize);

  // MODELS.ModelLog = ModelLogModel(sequelize, Sequelize);
  // MODELS.ApiAccessLog = ApiAccessLogModel(sequelize, Sequelize);
  // MODELS.Account = AccountModel(sequelize, Sequelize); 
  MODELS.Customers = CustomersModel(sequelize, Sequelize); 
  MODELS.Coupons = CouponsModel(sequelize, Sequelize); 
  MODELS.LeaderBoard = LeaderBoardModel(sequelize, Sequelize); 
  MODELS.QuizQuestions = QuizQuestionsModel(sequelize, Sequelize); 
  MODELS.QuizQuestionOptions = QuizQuestionOptionsModel(sequelize, Sequelize); 
  MODELS.QuizSelectedByUser = QuizSelectedByUserModel(sequelize, Sequelize); 

  MODELS.Customers.hasMany(MODELS.QuizSelectedByUser);
  MODELS.QuizSelectedByUser.belongsTo(MODELS.Customers);

  MODELS.Customers.hasOne(MODELS.LeaderBoard);
  MODELS.LeaderBoard.belongsTo(MODELS.Customers);  

 MODELS.Customers.hasMany(MODELS.Coupons);
 MODELS.Coupons.belongsTo(MODELS.Customers);  

 MODELS.QuizQuestions.hasMany(MODELS.QuizSelectedByUser);
 MODELS.QuizSelectedByUser.belongsTo(MODELS.QuizQuestions);

 MODELS.QuizQuestions.hasMany(MODELS.QuizQuestionOptions);
 MODELS.QuizQuestionOptions.belongsTo(MODELS.QuizQuestions);

 MODELS.QuizQuestionOptions.hasMany(MODELS.QuizSelectedByUser);
 MODELS.QuizSelectedByUser.belongsTo(MODELS.QuizQuestionOptions);

  // MODELS.UserProfile = UserProfileModel(sequelize, Sequelize);
  // MODELS.Account.hasOne(MODELS.UserProfile);
  // MODELS.UserProfile.belongsTo(MODELS.Account);
  // MODELS.Account.hasOne(MODELS.AdminProfile);
  // MODELS.AdminProfile.belongsTo(MODELS.Account);

  MODELS.Jwt = JwtModel(sequelize, Sequelize);
  MODELS.Customers.hasMany(MODELS.Jwt);
  MODELS.Jwt.belongsTo(MODELS.Customers);
  // MODELS.AdminProfile.hasMany(MODELS.Jwt);
  // MODELS.Jwt.belongsTo(MODELS.AdminProfile);

  // MODELS.AccessRole = AccessRoleModel(sequelize, Sequelize);
  // MODELS.AccessRole.hasOne(MODELS.UserProfile);
  // MODELS.UserProfile.belongsTo(MODELS.AccessRole);

  // MODELS.AccessRoleRight = AccessRoleRightModel(sequelize, Sequelize);
  // MODELS.AccessRole.hasMany(MODELS.AccessRoleRight, { ...mandatory });
  // MODELS.AccessRoleRight.belongsTo(MODELS.AccessRole);

  // MODELS.Brands = BrandModel(sequelize,Sequelize);
  
  // MODELS.Models = ModelsModel(sequelize,Sequelize);
  // MODELS.Brands.hasMany(MODELS.Models);
  // MODELS.Models.belongsTo(MODELS.Brands);
  
  // MODELS.App = AppModel(sequelize, Sequelize);
  // MODELS.AppSecretKey = AppSecretKeyModel(sequelize, Sequelize);
  // MODELS.App.hasMany(MODELS.AppSecretKey);
  // MODELS.AppSecretKey.belongsTo(MODELS.App);

  // MODELS.AppSecretKeyRight = AppSecretKeyRightModel(sequelize, Sequelize);
  // MODELS.AppSecretKey.hasMany(MODELS.AppSecretKeyRight);
  // MODELS.AppSecretKeyRight.belongsTo(MODELS.AppSecretKey);

  // MODELS.WhiteListedIp = WhiteListedIpModel(sequelize, Sequelize);
  // MODELS.App.hasMany(MODELS.WhiteListedIp);
  // MODELS.WhiteListedIp.belongsTo(MODELS.App);

  // MODELS.YearSecretKey = YearSecretKeyModel(sequelize, Sequelize);

  // MODELS.Users = UsersModel(sequelize, Sequelize);

  // MODELS.Contracts = ContractsModel(sequelize, Sequelize);

  // if (db.syncForce || db.syncAlter) await syncDB();
  // if (db.seekAccount) await syncSeekAccount();
};
// function makeid(length) {
//   var result = '';
//   var characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }
// const syncSeekAccount = async () => {
//   console.log(`syncSeekAccount - triggering`);
//   const db = envConfig.db;
//   const seek = db.seek;
//   const seek_ = await MODELS.Account.findOne({
//     where: {
//       username: seek.username,
//     },
//   });
//   if (!seek_) {
//     const seekAccount = await MODELS.Account.create({
//       username: seek.username,
//       password: seek.password,
//     });

//     const userProfile = await MODELS.UserProfile.create({
//       firstName: seek.firstName,
//       lastName: seek.lastName,
//       email: seek.username,
//       role: seek.role,
//     });
//     await seekAccount.setUserProfile(userProfile);

//     console.log(`syncSeekAccount - seek account created`);
//   }

//   console.log(`syncSeekAccount - Done`);
//   return;
// };

// export const syncDB = async () => {
//   const db = envConfig.db;
//   console.log(`syncDB??`, db);
//   const ok = await sequelize.sync({ force: db.syncForce, alter: db.syncAlter });
//   if (ok) console.log(`Database & tables synced!`, db.syncForce, db.syncAlter);
// };
// let connectionReleased = 0;
// export const getNewConnection = async () => {
//   if (connectionReleased < 50) {
//     connectionReleased++;
//     return await sequelize.transaction();
//   }
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return getNewConnection();
// };
// setInterval(() => {
//   if (connectionReleased > 0) {
//     connectionReleased--;
//   }
// }, 10000);
// export const releaseConnection = () => {
//   connectionReleased--;
// };
