'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hapus kolom nama dari tabel Presensis
    await queryInterface.removeColumn('Presensis', 'nama');
  },

  async down(queryInterface, Sequelize) {
    // Kembalikan kolom nama jika di-rollback
    await queryInterface.addColumn('Presensis', 'nama', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};