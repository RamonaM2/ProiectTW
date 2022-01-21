import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Prieten = db.define('Prieten', {
    PrietenId:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    PrietenName:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

export default Prieten;
