import styled from "@emotion/styled";
import { ButtonBase, Container, Typography, Box, Button, Switch } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MaterialUISwitch } from "../App";

const MenuButton = styled(Typography)<{isActive?:boolean}>`
    width: 70px;
    text-align: center;
    // font-weight: bold;
    // font-size: 18px;
    // color: #a56b65;


    ${({ isActive }) => (isActive ? 'opacity: 90%; font-weight: bold;' : 'opacity: 60%;')}
    // ${({ isActive }) => (isActive ? 'border-bottom: 1px solid;' : '')}

    &:hover{
        // border-bottom: 1px solid;
        // transform: translate(0px, 2px);
        opacity: 80%;
    }

    transition: 0.25s;
`;

interface Props{
    activePage: string
}

export const Header:React.FC<Props> = ({activePage}) => {
    return(
        <Stack direction="row" justifyContent={"space-between"} sx={{width:"100vw"}}>
            <Stack direction="row" gap="60px">
                <div style={{fontWeight:"bold", margin:"0 30px "}}>MAKRO</div>
                <Link to="/diary" style={{textDecoration:"none"}}><MenuButton isActive={activePage.includes("diary")}>DIARY</MenuButton></Link>
                <Link to="/trends" style={{textDecoration:"none"}}><MenuButton isActive={activePage.includes("trends")}>TRENDS</MenuButton></Link>
                <Link to="/settings" style={{textDecoration:"none"}}><MenuButton isActive={activePage.includes("settings")}>SETTINGS</MenuButton></Link>
    
            </Stack>
            <Link to="/login" style={{textDecoration:"none"}}><MenuButton isActive={false} style={{marginLeft: "75px", marginRight: "50px"}}><div>LOGOUT</div></MenuButton></Link>
        </Stack>
    )
}