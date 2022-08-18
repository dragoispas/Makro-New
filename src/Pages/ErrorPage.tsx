import { Stack, Typography } from "@mui/material"

export const ErrorPage:React.FC = () => {
    return(
        <Stack sx={{justifyContent:"center", alignItems:"center", height:"100vh", width:"100vw"}}>
            <Typography variant="h1" sx={{fontWeight:"bold"}}>404</Typography>
            <Typography variant="h2">Oops, Something went wrong!</Typography>
        </Stack>
    )
}