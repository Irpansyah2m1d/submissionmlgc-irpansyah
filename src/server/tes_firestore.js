const {Firestore} = require("@google-cloud/firestore");
const db = new Firestore();

async function store_data() {
    // Membuat Collection root-level
    const doctorsCollections = db.collection('db-serta-mulia');
    // console.log("Collections 'dokter' berhasil dibuat.");
 
    // Membuat dokumen: Dokter Eros
    const erosDoc = await doctorsCollections.doc("Dokter Janu");
    console.log("Dokumen atas nama Dokter Janu berhasil dibuat.");
 
    // Menambahkan data pribadi Dokter Eros
    const profileEros = {
        nama: "dr. Janu",
        keahlian: "Dokter Kulit",
        almamater: "Universitas B"
    }
    await erosDoc.set(profileEros);
    console.log("Data berhasil ditambahkan ke dokumen Janu");
 
    // Membuat subcollection: Konsultasi
    const erosSubcollections = erosDoc.collection("Konsultasi");
    console.log("Subcollection Konsultasi berhasil dibuat.");
 
    // Menambahkan data ke 
    const historyConsultations = {
        nama_pasien: {
            depan: "Antony",
            belakang: "Gunawan",
        },
        waktu_konsultasi: Date.now().toString()
    }
    await erosSubcollections.doc("Antony").set(historyConsultations);
    console.log("Data berhasil ditambahkan.");
}

store_data().catch(console.error);