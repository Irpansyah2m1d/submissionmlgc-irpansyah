const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getAllData = require('../services/getAllData');

 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  // Store data ke Firestore
  await storeData(id, data);


  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully.',
    data
  })
  response.code(201);
  return response;
}




async function getAllDataHistories(request, h) {

  try {
    const data = await getAllData();
      return h.response({
        status: 'success',
        data,
      }).code(200);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data from Firestore');
  }
}

// Contoh pemanggilan fungsi
// getAllData()
//   .then(data => console.log('Data fetched:', data))
//   .catch(err => console.error(err));

 
module.exports = {postPredictHandler, getAllDataHistories };