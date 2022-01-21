import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import {DB_USERNAME, DB_PASSWORD} from './Consts.js';
import db from './dbConfig.js';
import Utilizator from './entities/Utilizator.js';
import Produs from './entities/Produs.js';
import Prietenie from './entities/Prietenie.js';
import Prieten from './entities/Prieten.js';
import Sequelize from 'sequelize';
//import {Egal, MaiMicSauEgal} from './Operators.js';

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

let conn;

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then(connection => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS BDProduse")
})
.then(() => {
    return conn.end();
})
.catch(err => {
    console.warn(err.stack)
})

Utilizator.hasMany(Produs, {as : "Produse", foreignKey: "UtilizatorId"});
Produs.belongsTo(Utilizator, {foreignKey: "UtilizatorId"});

Utilizator.belongsToMany(Prieten, {through: "Prietenie", as: "Prietenii", foreignKey: "UtilizatorId"});
Prieten.belongsToMany(Utilizator, {through: "Prietenie", as: "prietenii", foreignKey: "PrietenId"});

// Utilizator.hasMany(Prietenie, {as : "Prietenii", foreignKey: "UtilizatorId"});
// Prietenie.belongsTo(Utilizator, {foreignKey: "UtilizatorId"});

// Utilizator.hasMany(Prietenie, {as : "prietenii", foreignKey: "UserName"});
// Prietenie.belongsTo(Utilizator, {foreignKey: "UserName"});

db.sync();

async function createProdus(produs){
    return await Produs.create(produs)
}

async function createUtilizator(utilizator){
    return await Utilizator.create(utilizator)
}

async function createPrietenie(prietenie){
    return await Prietenie.create(prietenie)
}

async function createPrieten(id, name){
    return await Prieten.create({PrietenId:id,PrietenName:name});
}

async function getProdus(){
    return await Produs.findAll();
}
async function getProduseUtilizator(id){
    return await Produs.findAll({where: {UtilizatorId:
        {[Sequelize.Op.eq]:id}}});
}
async function getProduseAproapeDeExpirareUtilizator(id){
    const azi= new Date();
    const avertizare=new Date();
    avertizare.setDate(azi.getDate()+3);
    return await Produs.findAll({
        where: {
            ProdusDataExpirare: {[Sequelize.Op.lte]: avertizare},
            UtilizatorId: {[Sequelize.Op.eq]:id}
        }
        });
}

async function getProdusePrieteni(id){
    const prieteni= await Prietenie.findAll({where: {PrietenId:{[Sequelize.Op.eq]:id}},
    attributes: ["PrietenId", "UtilizatorId"]});
    let produse=[];
    for(let prieten of prieteni){
        let produs=await Produs.findAll({where: {
            Disponibil:{[Sequelize.Op.eq]:true}, 
            UtilizatorId:{[Sequelize.Op.eq]:prieten.UtilizatorId}},
            attributes: ["ProdusId", "ProdusNume", "ProdusCategorie", "ProdusDataExpirare","UtilizatorId", "Claim", "Disponibil"]
        });
        for(let p of produs)
            produse.push(p);
    }
    return produse;
}

async function getPrieteni(id){
    return await Prietenie.findAll({where: {PrietenId:{[Sequelize.Op.eq]:id}}});
}

async function getPrieteniUtilizator(id){
    return await Prietenie.findAll({where: {UtilizatorId:{[Sequelize.Op.eq]:id}}});
}



async function getProdusById(id){
    return await Produs.findByPk(id);
}

async function updateProdus(id, produs){
    if (parseInt(id) !== produs.ProdusId){
        console.log("Entity id diff");
        return;
    }

    let updateEntity = await getProdusById(id);

    if (!updateEntity){
        console.log("There isn't a product with this id");
        return;
    }

    return await updateEntity.update(produs);
}

async function updateToDisponibil(id){
    let updateEntity = await getProdusById(id);
    if (!updateEntity ){
        console.log("There isn't a product with this id");
        return;
    }
    if (updateEntity.Disponibil==true){
        console.log("Produsul este deja disponibil");
        return;
    }
    Produs.update({Disponibil:true},
        {where: {ProdusId:id}});
       return;
}

async function updateClaimProdus(idProdus, idPrieten){
    let updateEntity = await getProdusById(idProdus);
    if (!updateEntity){
        console.log("There isn't a product with this id");
        return;
    }
    if (updateEntity.Disponibil==false){
        console.log("Produsul nu este disponibil.");
        return;
    }
    Produs.update({UtilizatorId:idPrieten, Claim:true},
        {where: {ProdusId:idProdus}});
       return;
}

router.route('/claim/:idProdus/:idPrieten').put(async(req, res) => {
    try{
        return res.json(await updateClaimProdus(req.params.idProdus, req.params.idPrieten));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/create').get(async(req, res) => {
    try{
        await db.sync();
        res.status(201).json({message: "created"})
    } catch( err){
        console.warn(err.stack)
        res.status(500).json({message: "Internal server error"})
    }
})

router.route('/produse').post(async(req, res) => {
    try{
        return res.json(await createProdus(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/produs').post(async(req, res) => {
    try{
        return res.json(await createProdus(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/utilizator').post(async(req, res) => {
    try{
        await createPrieten(req.body.UtilizatorId,req.body.UtilizatorName);
        return res.json(await createUtilizator(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

async function getUtilizatorByName(name){
    return await Utilizator.findAll({where: {UtilizatorName:{[Sequelize.Op.eq]:name}}});
}

async function getUtilizatori(){
    return await Utilizator.findAll();
}

router.route('/utilizatorP').get(async(req, res) => {
    try{
        return res.json(await getUtilizatori());
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/utilizator/:name').get(async(req, res) => {
    try{
        return res.json(await getUtilizatorByName(req.params.name));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/produse/:id').get(async(req,res)=>
{
    try {
        return res.json(await getProduseUtilizator(req.params.id));
        }
    catch(e){
        console.log(e);
    }
})

router.route('/produseAproapeExpirate/:id').get(async(req,res)=>
{
    try {
        return res.json(await getProduseAproapeDeExpirareUtilizator(req.params.id));
        }
    catch(e){
        console.log(e);
    }
})

router.route('/prietenie').post(async(req, res) => {
    try{  if(parseInt(req.body.PrietenId)==parseInt(req.body.UtilizatorId)) 
        {
        console.log("Nu se poate crea o prietenie cu aceeasi persoana.");
            return ;
        }
        return res.json(await createPrietenie(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/prietenieAdauga').post(async(req, res) => {
    try{  if(parseInt(req.body.PrietenId)==parseInt(req.body.UtilizatorId)) 
        {
        console.log("Nu se poate crea o prietenie cu aceeasi persoana.");
            return ;
        }
        return res.json(await createPrietenie(req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/produs/:id').get(async(req, res) => {
    try{
        return res.json(await getProdusById(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/produs').get(async(req, res) => {
    try{
        return res.json(await getProdus());
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/produs/:id').put(async(req, res) => {
    try{
        return res.json(await updateProdus(req.params.id, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/prieteni/:id').get(async(req, res) => {
    try{
        return res.json(await getPrieteni(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/prieteniUtilizator/:id').get(async(req, res) => {
    try{
        return res.json(await getPrieteniUtilizator(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/produsePrieteni/:id').get(async(req, res) => {
    try{
        return res.json(await getProdusePrieteni(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

router.route('/updateToDisponibil/:id').put(async(req, res) => {
    try{
        return res.json(await updateToDisponibil(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);