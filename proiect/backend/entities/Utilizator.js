import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Utilizator = db.define('Utilizator', {
    UtilizatorId:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    UtilizatorName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Parola:{
        type: Sequelize.STRING,
        allowNull: false
    }   
})

export default Utilizator;
