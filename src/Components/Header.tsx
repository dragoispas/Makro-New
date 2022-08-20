import styled from "@emotion/styled";
import { ButtonBase, Container, Typography, Box, Button, Switch } from "@mui/material";
import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuButton = styled(Typography)<{isActive?:boolean}>`
    width: 70px;
    text-align: center;
    cursor: pointer;
    // font-weight: bold;
    // font-size: 18px;
    // color: #a56b65;


    ${({ isActive }) => (isActive ? 'opacity: 90%; font-weight: bold;' : 'opacity: 60%;')}

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

    const navigate = useNavigate();
    const goToDiary= useCallback(() => navigate('/diary', {replace: true}), [navigate]);
    const goToTrends= useCallback(() => navigate('/trends', {replace: true}), [navigate]);
    const goToSettings= useCallback(() => navigate('/settings', {replace: true}), [navigate]);
    const logout= useCallback(() => navigate('/login', {replace: true}), [navigate]);

    return(
        <Stack direction="row" justifyContent={"space-between"} sx={{width:"90vw"}} gap={"40px"}>
            <Stack direction="row" gap="60px">
                <Typography>MAKRO</Typography>
                <MenuButton onClick={()=>goToDiary()} isActive={activePage.includes("diary")}>DIARY</MenuButton>
                <MenuButton onClick={()=>goToTrends()} isActive={activePage.includes("trends")}>TRENDS</MenuButton>
                <MenuButton onClick={()=>goToSettings()} isActive={activePage.includes("settings")}>SETTINGS</MenuButton>
    
            </Stack>
            <MenuButton onClick={()=>logout()} isActive={false} sx={{margin: "0 20px;"}}>LOGOUT</MenuButton>
        </Stack>
    )
}