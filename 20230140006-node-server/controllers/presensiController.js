// Controller Presensi FINAL STEP (tanpa kolom nama)
const { Presensi, User } = require("../models");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";


// CHECK-IN
exports.CheckIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const namaUser = req.user.nama;
    const waktuSekarang = new Date();
    const {latitude, longitude} = req.body;

    // Cek apakah sudah check-in sebelumnya
    const existingRecord = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Anda sudah melakukan check-in dan belum check-out.",
      });
    }

    // Buat presensi baru (tanpa kolom 'nama')
    const newRecord = await Presensi.create({
      userId: userId,
      checkIn: waktuSekarang,
      latitude: latitude,
      longitude: longitude,
    });

    return res.status(201).json({
      message: `Halo ${namaUser}, check-in berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: {
        id: newRecord.id,
        userId: newRecord.userId,
        checkIn: newRecord.checkIn,
        checkOut: null,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};


// CHECK-OUT
exports.CheckOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const namaUser = req.user.nama;
    const waktuSekarang = new Date();

    // Ambil presensi yang belum check-out
    const record = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (!record) {
      return res.status(404).json({
        message: "Anda belum melakukan check-in atau sudah check-out.",
      });
    }

    // Update check-out
    record.checkOut = waktuSekarang;
    await record.save();

    return res.json({
      message: `Selamat jalan ${namaUser}, check-out berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: {
        id: record.id,
        userId: record.userId,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};


// DELETE PRESENSI
exports.deletePresensi = async (req, res) => {
  try {
    const userId = req.user.id;
    const presensiId = req.params.id;

    const record = await Presensi.findByPk(presensiId);

    if (!record) {
      return res.status(200).json({ message: "Data tidak ditemukan atau sudah dihapus" });
    }

    if (record.userId !== userId) {
      return res.status(403).json({
        message: "Akses ditolak; Anda bukan pemilik catatan ini.",
      });
    }

    await record.destroy();
    return res.status(200).json({ message: "Data berhasil dihapus" });

  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};



exports.updatePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    const { checkIn, checkOut } = req.body;

    if (checkIn === undefined && checkOut === undefined) {
      return res.status(400).json({
        message: "Tidak ada data valid (checkIn/checkOut) untuk diperbarui.",
      });
    }

    const record = await Presensi.findByPk(presensiId);
    if (!record) {
      return res.status(404).json({
        message: "Catatan presensi tidak ditemukan.",
      });
    }

    record.checkIn = checkIn || record.checkIn;
    record.checkOut = checkOut || record.checkOut;
    await record.save();

    return res.json({
      message: "Data presensi berhasil diperbarui.",
      data: record,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
