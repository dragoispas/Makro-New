import { FormControl, FormHelperText, Input, InputLabel, Paper, Stack, Button, Typography, Box, Alert } from "@mui/material"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

    const navigate = useNavigate();
    const handleLogin= useCallback(() => navigate('/diary', {replace: true}), [navigate]);


    const login = () => {
        if((username===""|| username.includes(" ") || !(username.includes("@") && username.includes("."))) || password===""){
            if(username===""|| username.includes(" ") || !(username.includes("@") && username.includes("."))){
                setUsernameError("Invalid email!")
            }
            if(password===""){
                setPasswordError("Invalid password!")
            }
        }else{
            handleLogin();
        }
    }

    const resetPassword = () => {
        if(username===""|| username.includes(" ") || !(username.includes("@") && username.includes("."))){
            setUsernameError("Invalid email!");
        }else{
            setIsAlertVisible(true);
        }
    }

    const showAlert = () => {
        // setIsAlertVisible(true);
        if(isAlertVisible){
            return <Alert sx={{position:"absolute", background:"inherit" ,height:"30px", transform:"translate(20px,  365px)"}} severity="success">Sent you a password reset!</Alert>;
        }
        return <></>
    }

    setTimeout(() => { // Y IS THIS NOT WORKING AS INTENDED
        setIsAlertVisible(false);
    }, 3000);

    return(
        <Paper sx={{margin:"60px auto", height:"700px", width:"500px", display:"flex", flexAlign:"column", justifyContent:"center"}}>
            <Stack sx={{width:"300px", gap:"20px", paddingTop:"100px"}}>

                <Typography sx={{fontWeight:"bold", fontSize:"20px", textAlign:"center"}}>Welcoeme to Makro!</Typography>
                <Button onClick={() => console.log("login with google")} variant="outlined" sx={{margin: "20px 0"}}>Sign in with Google</Button>

                <Stack direction="row" justifyContent="center" alignItems={"center"} sx={{opacity:"70%"}}>
                    <Box sx={{height:"1px", background:"lightGrey", width:"140px"}}></Box>
                    <Typography sx={{textAlign:"center", width:"20px", transform:"translate(0px, -3px)"}}>or</Typography>
                    <Box sx={{height:"1px", background:"lightGrey", width:"140px"}}></Box>
                </Stack>
                <FormControl sx={{height:"70px"}} error={usernameError!==""} variant="standard">
                        <InputLabel htmlFor="component-error">Email</InputLabel>
                        <Input
                        id="component-error"
                        value={username}
                        onChange={e => {setUsername(e.target.value); setUsernameError("");}}
                        aria-describedby="component-error-text"
                        />
                        <FormHelperText id="component-error-text">{usernameError}</FormHelperText>
                    </FormControl>
                    <FormControl sx={{height:"70px"}} error={passwordError!==""} variant="standard">
                        <InputLabel htmlFor="component-error">Password</InputLabel>
                        <Input
                        type="password"
                        id="component-error"
                        value={password}
                        onChange={e => {setPassword(e.target.value); setPasswordError("");}}
                        aria-describedby="component-error-text"
                        />
                        <FormHelperText id="component-error-text">{passwordError}</FormHelperText>
                    </FormControl>
                <Typography onClick={()=>resetPassword()} sx={{cursor:"pointer", textDecoration:"underline", textAlign:"right", fontSize:"14px", fontWeight:"bold", transform:"translate(0px, -20px)"}}>Forgot password</Typography>
                {showAlert()}
                <Button onClick={() => login()} color="secondary" variant="contained" sx={{margin: "20px 0", width:"100%"}}>Log in</Button>
                <Typography sx={{textAlign:"center"}}>Don't have an account? <Link style={{ textDecoration: "none" }} to={"/create-account"}>Sign up!</Link></Typography>
            </Stack>
          
        </Paper>
    ) 
}