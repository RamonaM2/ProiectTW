import {useState, useEffect} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Grid, TextField, Button} from '@material-ui/core';
import {post, put, get} from '../Calls';
import {postProdusRoute,produsRoute, putDisponibil, putClaim} from '../ApiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddProdus(){

    const [produs, setProdus] = useState
    ({
        ProdusNume: "",
        ProdusCategorie: "",
        ProdusDataExpirare: "2022-01-16",
        UtilizatorId: 1,
        Claim: false,
        Disponibil: false
    });

    const navigate = useNavigate();
    const routerParams = useParams();
    const idR = routerParams.id;
    const idPri=routerParams.idPrieten;
    let idUt;

    const updateProdus = async () => {
        const up=await put(putDisponibil, idR, {});
        let idlink=window.location.search;
        let idText=idlink.replace("?","");
        idUt=parseInt(idText);  
        navigate("/ProdusList?"+idUt); 
    }

    const claim = async () => {
        const c=await put(putClaim+"/"+idR, idPri,{});
        navigate("/ProdusList?"+idPri); 
    }

    useEffect(async () => {
        console.log(idR, idPri);
        if(idR && idPri)
            claim();
        else
        if (idR){
            updateProdus();
        }
        else{
            let idlink=window.location.search;
            let idText=idlink.replace("?","");
            idUt=parseInt(idText);  
            produs.UtilizatorId=idUt;
            return;
        } 
    }, [])

    const onChangeProdus = e => {
        setProdus({...produs, [e.target.name]: e.target.value});
    }

    const saveProdus = async () => {
        await post(postProdusRoute, produs);  
        let idlink=window.location.search;
        let idText=idlink.replace("?","");
        idUt=parseInt(idText);  
        navigate("/ProdusList?"+idUt);    
    }

    return (
        <div>

            <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProdusNume"
                        name="ProdusNume"
                        label="ProdusNume"
                        fullWidth
                        value={produs.ProdusNume}
                        onChange={e => onChangeProdus(e)}
                        />
                </Grid>

                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProdusCategorie"
                        name="ProdusCategorie"
                        label="ProdusCategorie"
                        fullWidth
                        value={produs.ProdusCategorie}
                        onChange={e => onChangeProdus(e)}
                        />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ProdusDataExpirare"
                        name="ProdusDataExpirare"
                        label="ProdusDataExpirare"
                        fullWidth
                        value={produs.ProdusDataExpirare}
                        onChange={e => onChangeProdus(e)}
                        />
                </Grid>
                {/* <Grid item xs={6} sm={4}>
                <Checkbox
                    checked={produs.Disponibil?true:false}
                    value={produs.Disponibil?true:false}
                    color="primary"
                    onChange={e => onChangeProdus(e)}

                />
                </Grid> */}

            </Grid>

            <Button color="primary" variant='outlined' startIcon={<CancelIcon />}
                onClick={() => {let idlink=window.location.search;
                    let idText=idlink.replace("?","");
                    idUt=parseInt(idText);  
                    navigate("/ProdusList?"+idUt); }}
            >
                Cancel
            </Button>  

             <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveProdus}
            >
                Save
            </Button>  

        </div>
    )
}