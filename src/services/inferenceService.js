const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        // Proses gambar untuk input model (resize dan normalisasi)
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        // Menggunakan model untuk memprediksi klasifikasi
        const prediction = model.predict(tensor);
        const score = await prediction.data();

        // Menentukan label berdasarkan nilai prediksi
        const probability = score[0]; // karena hanya ada 1 output untuk binary classification
        let label, suggestion;

        if (probability > 0.5) {
            label = 'Cancer';
            suggestion = "Segera periksa ke dokter!";
        } else {
            label = 'Non-cancer';
            suggestion = "Penyakit kanker tidak terdeteksi.";
        }

        // Mengembalikan hasil prediksi dan saran
        return { label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`);
    }
}

module.exports = predictClassification;
