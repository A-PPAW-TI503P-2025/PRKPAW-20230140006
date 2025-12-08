const { Presensi, User } = require("../models");
const { Op } = require("sequelize");

const { format } = require("date-fns-tz");

exports.getDailyReport = async (req, res) => {
  try {
    const reports = await Presensi.findAll({
      include: [{ model: User, as: 'user' }]
    });

    const mapped = reports.map(r => ({
      id: r.id,
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      latitude: r.latitude,
      longitude: r.longitude,
      user: r.user,
      photoUrl: r.buktiFoto ? `http://localhost:3001/${r.buktiFoto}` : null
    }));

    res.json({ data: mapped });
  } catch (err) {
    console.error('Error in getDailyReport:', err);
    res.status(500).json({ message: "Gagal mengambil report", error: err.message });
  }
};
