import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Produs = db.define('Produs', {
    ProdusId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ProdusNume:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ProdusCategorie:{
        type: Sequelize.STRING,
        allowNull: false
    },    
    ProdusDataExpirare:{
        type: Sequelize.DATE,
        allowNull:false
    },
    UtilizatorId:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Claim:
    {
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
    Disponibil:
    {
        type: Sequelize.BOOLEAN,
        allowNull:false
    }
})

export default Produs;
