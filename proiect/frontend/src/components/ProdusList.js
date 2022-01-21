import {useState, useEffect} from 'react';
import {get,put, remove} from '../Calls';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import {produsRoute, getExpirare, putDisponibil, getProdusePrieteni} from '../ApiRoutes';
import { useNavigate } from 'react-router-dom';

export default function ProdusList(){

    const [rows, setRows] = useState([]);
    const [rowsExpirare, setRowsExpirare] = useState([]);
    const [rowsPrieteni, setRowsPrieteni] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate();
    const [variabila, setVariabila] = useState(false)
    let user;
    let idUt;
    useEffect(async() => {
        let id=window.location.search;
        let idText=id.replace("?","");
        idUt=parseInt(idText);
        let data = await get(produsRoute+"/"+idUt);
        setRows(data);
        data=await get(getExpirare+"/"+idUt);
        setRowsExpirare(data);
        data= await get(getProdusePrieteni+"/"+idUt);
        setRowsPrieteni(data);
    }, [needUpdate]);
    return (
        <div>
            <div>
                <Button
                    variant='contained'
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={() => {
                        let id=window.location.search;
                        let idText=id.replace("?","");
                        idUt=parseInt(idText);
                        navigate("ProdusEdit"+"?"+idUt);}}
                >
                Adauga produs
                </Button>
            </div>

            <div>
                <Button
                    variant='contained'
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={() => {
                        let id=window.location.search;
                        let idText=id.replace("?","");
                        idUt=parseInt(idText);
                        navigate("Prieten"+"/"+idUt);}}
                >
                Adauga prieten
                </Button>
            </div>

            <br/>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor: "salmon"}}>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Nume</TableCell>
                            <TableCell align="right">Categorie</TableCell>
                            <TableCell align="right">Data expirare</TableCell>
                            <TableCell align="right">Id proprietar</TableCell>
                            <TableCell align="right">Claim</TableCell>
                            <TableCell align="right">Disponibil</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsExpirare.map((row, index) => (
                            <TableRow key={row.ProdusId}>
                                <TableCell component="th" scope ="row">
                                    {row.ProdusId}
                                </TableCell>
                                <TableCell align="right">{row.ProdusNume}</TableCell>
                                <TableCell align="right">{row.ProdusCategorie}</TableCell>
                                <TableCell align="right">{row.ProdusDataExpirare}</TableCell>
                                <TableCell align="right">{row.UtilizatorId}</TableCell>
                                <TableCell align="right">{row.Claim?"da":"nu"}</TableCell>
                                <TableCell align="right">{row.Disponibil?"da":"nu"}</TableCell>
                                <TableCell align="right">
                                <IconButton onClick={() => {
                                     let id=window.location.search;
                                     let idText=id.replace("?","");
                                     idUt=parseInt(idText);
                                    navigate(`/ProdusEdit/${row.ProdusId}?${idUt}`);
                             }}>
                                       <EditIcon color="primary"/>
                                   </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor: "coral"}}>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Nume</TableCell>
                            <TableCell align="right">Categorie</TableCell>
                            <TableCell align="right">Data expirare</TableCell>
                            <TableCell align="right">Id proprietar</TableCell>
                            <TableCell align="right">Claim</TableCell>
                            <TableCell align="right">Disponibil</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ProdusId}>
                                <TableCell component="th" scope ="row">
                                    {row.ProdusId}
                                </TableCell>
                                <TableCell align="right">{row.ProdusNume}</TableCell>
                                <TableCell align="right">{row.ProdusCategorie}</TableCell>
                                <TableCell align="right">{row.ProdusDataExpirare}</TableCell>
                                <TableCell align="right">{row.UtilizatorId}</TableCell>
                                <TableCell align="right">{row.Claim?"da":"nu"}</TableCell>
                                <TableCell align="right">{row.Disponibil?"da":"nu"}</TableCell>
                                <TableCell align="right">
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor: "pink"}}>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right" >Nume</TableCell>
                            <TableCell align="right" >Categorie</TableCell>
                            <TableCell align="right" >Data expirare</TableCell>
                            <TableCell align="right" >Id proprietar</TableCell>
                            <TableCell align="right" >Claim</TableCell>
                            <TableCell align="right" >Disponibil</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsPrieteni.map((row, index) => (
                            <TableRow key={row.ProdusId}>
                                <TableCell component="th" scope ="row">
                                    {row.ProdusId}
                                </TableCell>
                                <TableCell align="right">{row.ProdusNume}</TableCell>
                                <TableCell align="right">{row.ProdusCategorie}</TableCell>
                                <TableCell align="right">{row.ProdusDataExpirare}</TableCell>
                                <TableCell align="right">{row.UtilizatorId}</TableCell>
                                <TableCell align="right">{row.Claim?"da":"nu"}</TableCell>
                                <TableCell align="right">{row.Disponibil?"da":"nu"}</TableCell>
                                <TableCell align="right">
                                <TableCell align="right">
                                <IconButton onClick={() => {
                                     let id=window.location.search;
                                     let idText=id.replace("?","");
                                     idUt=parseInt(idText);
                                    navigate(`/ProdusClaim/${row.ProdusId}/${idUt}`);
                             }}>
                                       <EditIcon color="primary"/>
                                      Claim!
                                   </IconButton>
                                </TableCell>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )

}