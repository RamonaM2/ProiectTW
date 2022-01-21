import {useState, useEffect} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Grid, TextField, Button} from '@material-ui/core';
import {post, put, get} from '../Calls';
import {postProdusRoute,produsRoute, putDisponibil, putClaim, postPrietenie,loginRoute, getUtilizatoriP, getPrieteni} from '../ApiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import {Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from '@material-ui/core';

export default function AddPrieten(){

    const [prietenie, setPrietenie] = useState
    ({
        UtilizatorId: 1,
        PrietenId: 2,
        CategoriePrietenie:"",
        PrietenName:""
    });

    const navigate = useNavigate();
    const routerParams = useParams();
    const idR = routerParams.id;

    const [rowsPrieteni, setRowsPrieteni] = useState([]);
    const [rowsUtilizatori, setRowsUtilizatori] = useState([]);

    useEffect(async () => {
        if (!idR){
          return;
        }
        else{
            prietenie.UtilizatorId=idR;
        } 
        let data=await get(getUtilizatoriP);
        setRowsUtilizatori(data);
        data=await get(getPrieteni,idR);
        setRowsPrieteni(data);
        console.log(data);
    }, [])

    const onChangePrietenie = e => {
        setPrietenie({...prietenie, [e.target.name]: e.target.value});
    }

    const savePrietenie = async () => {
        let idPrietenie=await get(loginRoute+"/"+prietenie.PrietenName);
        prietenie.PrietenId=idPrietenie[0].UtilizatorId;
        await post(postPrietenie, prietenie);  
        navigate("/ProdusList?"+idR);   
    }
    const gata = async () => {
        navigate("/ProdusList?"+idR); 
    }
    return (
        <div>

            <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="PrietenName"
                        name="PrietenName"
                        label="PrietenName"
                        fullWidth
                        value={prietenie.PrietenName}
                        onChange={e => onChangePrietenie(e)}
                        />
                </Grid>

                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="CategoriePrietenie"
                        name="CategoriePrietenie"
                        label="CategoriePrietenie"
                        fullWidth
                        value={prietenie.CategoriePrietenie}
                        onChange={e => onChangePrietenie(e)}
                        />
                </Grid>
            </Grid>

            <Button color="primary" variant='outlined' startIcon={<CancelIcon />}
                onClick={gata}
            >
                Gata
            </Button>  

             <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={savePrietenie}
            >
                Adauga
            </Button>  
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead  style={{backgroundColor: "salmon"}}>
                        <TableRow>
                            <TableCell align="center">Categorie</TableCell>
                            <TableCell align="center">Nume</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsPrieteni.map((row, index) => (
                            <TableRow key={row.UtilizatorId}>
                                <TableCell component="th" scope ="row">
                                    {row.CategoriePrietenie}
                                </TableCell>
                                <TableCell  align="center">{row.PrietenName}</TableCell>
                                <TableCell  align="center">
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead  style={{backgroundColor: "coral"}}>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Nume</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsUtilizatori.map((row, index) => (
                            <TableRow key={row.UtilizatorId}>
                                <TableCell component="th" scope ="row">
                                    {row.UtilizatorId}
                                </TableCell>
                                <TableCell align="right">{row.UtilizatorName}</TableCell>
                                <TableCell align="right">
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    )
}