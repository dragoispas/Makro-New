import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation, useRegisterMutation } from "../app/api";

const AuthPaper = styled(Paper)<{ side: string }>`
  margin: 30px auto;
  height: 700px;
  width: 500px;
  display: flex;
  justify-content: center;
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.85s;
  position: relative;

  ${(props) =>
    props.side === "signUp" ? "transform: rotateY(180deg);" : "transform: rotateY(0eg);"}
`;

const PaperSide = styled(Stack, {
  shouldForwardProp: (prop: string) => !["isActive", "opacity", "isFlipped"].includes(prop),
})<{ isActive: boolean; opacity: number; isFlipped?: boolean }>`
  width: 300px;
  gap: 20px;
  padding-top: 70px;
  height: 700px;

  opacity: ${(props) => props.opacity};
  position: absolute;
  ${(props) => (props.isFlipped ? "transform: rotateY(-180deg);" : "")}
  ${(props) => (props.isActive ? "" : "pointer-events: none;")}
`;

export function LoginPage() {
  const [side, setSide] = useState<string>("logIn");
  const [logInOpacity, setLogInOpacity] = useState<number>(1);
  const [signUpOpacity, setSignUnOpacity] = useState<number>(0);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const onLoginClick = async () => {
    login({ email, password });
  };

  const onCreateAccountClick = async () => {
    register({ email, password, name });
  };

  const resetPassword = () => {
    // todo: throttle on entire function
    if (email === "" || email.includes(" ") || !(email.includes("@") && email.includes("."))) {
      setEmailError("Invalid email!");
    } else {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
  };

  const showAlert = () => {
    if (isAlertVisible) {
      return (
        <Alert
          sx={{
            position: "absolute",
            background: "inherit",
            height: "40px",
            transform: "translate(20px,  365px)",
            boxShadow: "none",
          }}
          severity="success"
        >
          Sent you a password reset!
        </Alert>
      );
    }
    return null;
  };

  return (
    <AuthPaper side={side}>
      <PaperSide isActive={side === "logIn"} opacity={logInOpacity}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", textAlign: "center" }}>
          Welcome to Makro!
        </Typography>
        <Button variant="outlined" sx={{ margin: "20px 0" }}>
          Sign in with Google
        </Button>

        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ opacity: "70%" }}>
          <Box sx={{ height: "1px", background: "lightGrey", width: "140px" }} />
          <Typography
            sx={{
              textAlign: "center",
              width: "20px",
              transform: "translate(0px, -3px)",
            }}
          >
            or
          </Typography>
          <Box sx={{ height: "1px", background: "lightGrey", width: "140px" }} />
        </Stack>
        <FormControl sx={{ height: "70px" }} error={emailError !== ""} variant="standard">
          <InputLabel htmlFor="component-error">Email</InputLabel>
          <Input
            id="component-error"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">{emailError}</FormHelperText>
        </FormControl>
        <FormControl sx={{ height: "70px" }} error={passwordError !== ""} variant="standard">
          <InputLabel htmlFor="component-error">Password</InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            id="component-error"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            aria-describedby="component-error-text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="component-error-text">{passwordError}</FormHelperText>
        </FormControl>
        <Typography
          onClick={() => resetPassword()}
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            textAlign: "right",
            fontSize: "14px",
            fontWeight: "bold",
            transform: "translate(0px, -20px)",
          }}
        >
          Forgot password
        </Typography>
        {showAlert()}
        <Button
          onClick={onLoginClick}
          color="secondary"
          variant="contained"
          sx={{ margin: "20px 0", width: "100%" }}
        >
          Log in
        </Button>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Typography
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            {"Don't have an account?"}
          </Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            color="primary"
            onClick={() => {
              setSide("signUp");
              setTimeout(() => {
                setLogInOpacity(0);
                setSignUnOpacity(1);
                setShowPassword(false);
              }, 250);
              setEmail("");
              setPassword("");
              setName("");
              setEmailError("");
            }}
          >
            Sign up for free!
          </Typography>
        </Stack>
      </PaperSide>
      <PaperSide isActive={side === "signUp"} opacity={signUpOpacity} isFlipped>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", textAlign: "center" }}>
          Create an account!
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Typography
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            Already have one?
          </Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            color="primary"
            onClick={() => {
              setSide("logIn");
              setTimeout(() => {
                setLogInOpacity(1);
                setSignUnOpacity(0);
                setShowPassword(false);
              }, 250);
              setEmail("");
              setPassword("");
              setName("");
              setEmailError("");
            }}
          >
            Log in!
          </Typography>
        </Stack>

        <FormControl sx={{ height: "70px" }} error={nameError !== ""} variant="standard">
          <InputLabel htmlFor="component-error">Name</InputLabel>
          <Input
            id="component-error"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">{emailError}</FormHelperText>
        </FormControl>
        <FormControl sx={{ height: "70px" }} error={emailError !== ""} variant="standard">
          <InputLabel htmlFor="component-error">Email</InputLabel>
          <Input
            id="component-error"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">{emailError}</FormHelperText>
        </FormControl>
        <FormControl sx={{ height: "70px" }} error={passwordError !== ""} variant="standard">
          <InputLabel htmlFor="component-error">Password</InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            id="component-error"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            aria-describedby="component-error-text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="component-error-text">{passwordError}</FormHelperText>
        </FormControl>
        {showAlert()}
        <Button
          onClick={onCreateAccountClick}
          color="secondary"
          variant="contained"
          sx={{ margin: "20px 0", width: "100%" }}
        >
          Create account
        </Button>
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ opacity: "70%" }}>
          <Box sx={{ height: "1px", background: "lightGrey", width: "140px" }} />
          <Typography
            sx={{
              textAlign: "center",
              width: "20px",
              transform: "translate(0px, -3px)",
            }}
          >
            or
          </Typography>
          <Box sx={{ height: "1px", background: "lightGrey", width: "140px" }} />
        </Stack>
        <Button variant="outlined" sx={{ margin: "20px 0" }}>
          Sign in with Google
        </Button>
      </PaperSide>
    </AuthPaper>
  );
}
