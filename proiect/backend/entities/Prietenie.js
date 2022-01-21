import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Prietenie = db.define('Prietenie', {
    UtilizatorId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    PrietenId:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },  
    PrietenName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CategoriePrietenie:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Prietenie;
