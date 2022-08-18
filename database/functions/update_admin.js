module.exports = async function update_admin(pool, user_auth, is_admin, is_super_admin) {

  if (is_admin !== undefined) {
    const adminValue = is_admin === true ? "TRUE" : "FALSE";
    const adminUpdateQuery = `
      UPDATE
        users
      SET
        is_admin = $1
      WHERE
        user_auth = $2
    `
    await pool.query(adminUpdateQuery, [adminValue, user_auth]);
  }

  if (is_super_admin !== undefined) {
    const superAdminValue = is_super_admin === true ? "TRUE" : "FALSE";
    const superAdminUpdateQuery = `
      UPDATE
        users
      SET
        is_super_admin = $1
      WHERE
        user_auth = $2
    `
    await pool.query(superAdminUpdateQuery, [superAdminValue, user_auth]);
  }
}
