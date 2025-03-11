const pool = require('../db');

const Config = {
      async getDbVersion() {
        const query = 'SELECT db_version FROM config';
        const rows = await pool.query(query);
        return rows;
    }
};

module.exports = Config;