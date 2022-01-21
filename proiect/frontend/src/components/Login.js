import React, { useState } from "react";
import "./Login.css";
import {post, put, get} from '../Calls';
import { useNavigate, useParams } from 'react-router-dom';
import {Grid, TextField, Button} from '@material-ui/core';
import {loginRoute} from '../ApiRoutes';

export default function Login() {

  const navigate = useNavigate();
  const routerParams = useParams();
  const id = routerParams.id;

  function validate() {
    return utilizator.Parola.length > 0 && utilizator.UtilizatorName.length>0;
  }

  const saveUtilizator = async () => {
    await post(loginRoute, utilizator);   
    let utilizatorNou=await get(loginRoute, utilizator.UtilizatorName);
    navigate("/ProdusList?"+utilizatorNou[0].UtilizatorId);
    //navigate("/ProdusList/"); 
}

const loginUtilizator = async () => {
    const date=await get(loginRoute, utilizator.UtilizatorName);
    console.log(date);
    if(date[0].Parola === utilizator.Parola){    
        navigate("/ProdusList?"+date[0].UtilizatorId);    
        //navigate("/ProdusList/"); 
    }
    else
        alert("Datele introduse nu se regasesc in baza de date! Schimbati utilizatorul si/sau parola!")
}

  function handleSubmit(event) {
    event.preventDefault();
  }

  const [utilizator, setUtilizator] = useState
    ({
        UtilizatorName: "",
        Parola: "",
    });

  const onChangeUtilizator = e => {
    setUtilizator({...utilizator, [e.target.name]: e.target.value});
}

  return (
    <div className="Login">
                    <Grid container spacing={3} justifyContent="center">
                <Grid item xs={6} sm={6} align="center">
                    <TextField
                        align="center"
                        autoFocus
                        margin="dense"
                        id="UtilizatorName"
                        name="UtilizatorName"
                        label="UtilizatorName"
                        fullWidth
                        value={utilizator.UtilizatorName}
                        onChange={e => onChangeUtilizator(e)}
                        />
                </Grid>
                <br/>
                <Grid item xs={6} sm={6} align="center">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Parola"
                        name="Parola"
                        label="Parola"
                        fullWidth
                        value={utilizator.Parola}
                        onChange={e => onChangeUtilizator(e)}
                        />
                </Grid>
            </Grid>
            <br/>
        <Button color="primary" variant='outlined' size="medium"
                onClick={loginUtilizator}
                disabled={!validate()}
            >
                Login
            </Button>  
<br/>
             <Button color="primary" variant='outlined' size="medium"
                onClick={saveUtilizator}
                disabled={!validate()}
            >
                Utilizator nou
            </Button>  
    </div>
  );
}