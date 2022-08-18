import { FormControl, FormHelperText, Input, InputLabel, Paper, Stack, Button, Typography, Box, Alert, styled } from "@mui/material"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const AuthPaper = styled(Paper)<{side:String}>`
    margin: 60px auto;
    height: 700px;
    width: 500px;
    display: flex;
    justify-content: center;
    transition: color 0.2s ease, background-color 0.2s ease, transform 0.85s;
    position: relative;

    // perspective: 1000px;
    // transform-style: preserve-3d;

    ${props => props.side === "signUp" ? "transform: rotateY(180deg);" : "transform: rotateY(0eg);"}
`;

const PaperSide = styled(Stack)<{isActive:boolean, opacity:number, isFlipped?:boolean}>`
    width: 300px;
    gap: 20px;
    padding-top: 70px;
    height: 700px;

    // transform-style: preserve-3d;

    opacity: ${props => props.opacity};
    position: absolute;
    ${props => props.isFlipped? "transform: rotateY(-180deg);" : ""}
    ${props => props.isActive ? "" : "pointer-events: none;"}
`;


export const LoginPage = () => {
    const [side, setSide] = useState<string>("logIn")
    const [logInOpacity, setLogInOpacity] = useState<number>(1);
    const [signUpOpacity, setSignUnOpacity] = useState<number>(0);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");

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

    const resetPassword = () => {    // todo: throttle on entire function
        if(username===""|| username.includes(" ") || !(username.includes("@") && username.includes("."))){
            setUsernameError("Invalid email!");
        }else{
            setIsAlertVisible(true); 
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);
        }
    }

    const showAlert = () => {
        // setIsAlertVisible(true);
        if(isAlertVisible){
            return <Alert sx={{position:"absolute", background:"inherit" ,height:"30px", transform:"translate(20px,  365px)", boxShadow:"none"}} severity="success">Sent you a password reset!</Alert>;
        }
        return <></>
    }

    

    return(
        <AuthPaper side={side}>
            <PaperSide isActive = {side==="logIn"} opacity={logInOpacity}>
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
                    <Typography sx={{textAlign:"center", display:"flex", justifyContent:"center", gap:"5px"}}>Don't have an account? <Typography sx={{cursor:"pointer"}} color={"primary"} onClick={()=> {setSide("signUp"); setTimeout(() => {setLogInOpacity(0);setSignUnOpacity(1);}, 250);}}>Sign up!</Typography></Typography>
            </PaperSide>
            <PaperSide isActive = {side==="signUp"} opacity={signUpOpacity} isFlipped={true}>
                <Typography sx={{fontWeight:"bold", fontSize:"20px", textAlign:"center"}}>Create an account!</Typography>
                <Typography sx={{textAlign:"center", display:"flex", justifyContent:"center", gap:"5px"}}>Already have one? <Typography sx={{cursor:"pointer"}} color={"primary"} onClick={()=> {setSide("logIn"); setTimeout(() => {setLogInOpacity(1);setSignUnOpacity(0);}, 250);}}>Log in!</Typography></Typography>

                    <FormControl sx={{height:"70px"}} error={nameError!==""} variant="standard">
                        <InputLabel htmlFor="component-error">Name</InputLabel>
                        <Input
                        id="component-error"
                        value={name}
                        onChange={e => {setName(e.target.value); setNameError("");}}
                        aria-describedby="component-error-text"
                        />
                        <FormHelperText id="component-error-text">{usernameError}</FormHelperText>
                    </FormControl>
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
                {showAlert()}
                <Button color="secondary" variant="contained" sx={{margin: "20px 0", width:"100%"}}>Create account</Button>
                <Stack direction="row" justifyContent="center" alignItems={"center"} sx={{opacity:"70%"}}>
                    <Box sx={{height:"1px", background:"lightGrey", width:"140px"}}></Box>
                    <Typography sx={{textAlign:"center", width:"20px", transform:"translate(0px, -3px)"}}>or</Typography>
                    <Box sx={{height:"1px", background:"lightGrey", width:"140px"}}></Box>
                </Stack>
                <Button onClick={() => console.log("login with google")} variant="outlined" sx={{margin: "20px 0"}}>Sign in with Google</Button>

            </PaperSide>
          
        </AuthPaper>
    ) 
}