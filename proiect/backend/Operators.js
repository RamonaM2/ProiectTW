import Sequelize from 'sequelize';

const Egal=Sequelize.Op.eq;
const MaiMicSauEgal=Sequelize.Op.lte;

export default {Egal, MaiMicSauEgal};