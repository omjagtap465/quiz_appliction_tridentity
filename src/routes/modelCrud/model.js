import express from 'express';
import {MODELS} from '../../sequelize.js'
export const modelRoutes = express.Router();

const ns = `/model`;
modelRoutes.post(`${ns}/create`, async (req, res)  => {
  
  const {modelName,brandId} = req.body;
  const {Models}= MODELS;
  const models =await Models.create({modelName:modelName,brandId:brandId});
  
  
  res.status(200).json({data:models});
});
modelRoutes.put(`${ns}/getModel/:modelId` ,async(req,res) => {
  const {modelId} = req.params;
  const {modelName} = req.body;
  const {Models}= MODELS;
  const modelDetails = await Models.findByPk(modelId);
  if(!modelDetails)
    {
      return res.status(400).json({data: "Invalid Model Id"})
    }  
    modelDetails.modelName = modelName;
    await modelDetails.save();
    return res.status(200).json({data:modelDetails});
})
modelRoutes.get(`${ns}/getModel/:modelId` ,async(req,res) => {
  const {modelId} = req.params;
  const {Models}= MODELS;
  const modelDetails = await Models.findByPk(modelId);
  if(!modelDetails)
    {
      return res.status(400).json({data: "Invalid Model Id"})
    }  

    return res.status(200).json({data:modelDetails});
})
modelRoutes.delete(`${ns}/deleteModel/:modelId` ,async(req,res) => {
  const {modelId} = req.params;
  const {Models}= MODELS;
  const modelDetails = await Models.destroy(
    {
      where:{
        id:modelId
      },
      returning: true,
    }
  );
  if(!modelDetails)
    {
      return res.status(400).json({data: "Invalid Model Id"})
    }  

    return res.status(200).json({data:modelDetails});
})