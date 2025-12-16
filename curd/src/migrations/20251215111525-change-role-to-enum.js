'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Create ENUM type in PostgreSQL
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_Users_role" AS ENUM('user', 'admin', 'super admin');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 2️⃣ Add temporary column using the correct ENUM type
    await queryInterface.sequelize.query(`
      ALTER TABLE "Users"
      ADD COLUMN role_temp "enum_Users_role";
    `);

    // 3️⃣ Copy existing data from string column
    await queryInterface.sequelize.query(`
      UPDATE "Users" SET role_temp = role::text::"enum_Users_role";
    `);

    // 4️⃣ Drop old column
    await queryInterface.removeColumn('Users', 'role');

    // 5️⃣ Rename temp column
    await queryInterface.renameColumn('Users', 'role_temp', 'role');

    // 6️⃣ Set NOT NULL and default
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('user', 'admin', 'super admin'),
      allowNull: false,
      defaultValue: 'user',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Drop ENUM type
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Users_role";
    `);
  }
};
