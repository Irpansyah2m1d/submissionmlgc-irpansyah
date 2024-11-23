const { Firestore } = require('@google-cloud/firestore');

async function getAllData() {
  const db = new Firestore();
  const predictionsCollection = db.collection('predictions');

  try {
    const snapshot = await predictionsCollection.get();

    if (snapshot.empty) {
      console.log('No prediction histories found.');
      return [];
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        history: {
          result: data.result || null,
          createdAt: data.createdAt || null,
          suggestion: data.suggestion || null,
          id: doc.id, // Menggunakan ID dokumen sebagai bagian dari history
        },
      };
    });
  } catch (error) {
    console.error('Error fetching prediction histories:', error);
    throw new Error('Failed to fetch prediction histories from Firestore');
  }
}


module.exports = getAllData;