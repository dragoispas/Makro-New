import styled from "@emotion/styled"
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import DefaultFoodImage from "../Pgotos/DefaultFoodImage.png"
import useOutsideClick from "./useOutsideClick";
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Box, Button, ButtonBase, Divider, Input, InputBase, Paper, Tab,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { emptyProduct, Product, ProductMap } from "../Api/products/types";
import { Stack } from "@mui/system";
import { MiniChart } from "./MiniChart";
import ReplayIcon from '@mui/icons-material/Replay';
import { TabPanel } from "./TabPanel";
import ClearIcon from '@mui/icons-material/Clear';

const InputContainer = styled(Paper)<{isActive:boolean}>`
    position: absolute;
    z-index: 1000;
    width: 600px;
    min-height: 60px;
    max-height: 600px;
    // border: 1px solid;
    transition: scale 0.25s;
    border-radius: 5px;

    ${props => props.isActive ? `box-shadow: 0 0 50px rgba(0,0,0,0.5);` : `box-shadow: none;`}
    &:hover{
        // background: rgba(207,223,218,1);
        // box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        // border: 2px solid rgba(0,0,0,0.1);
    }
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;

const CustomInput = styled(Input)`
    width: 600px;
    height: 60px;
    border: none;
    background: rgba(0,0,0,0);
    font-size: 20px;
    padding-left: 50px;

`;

const ClearButton = styled(ClearIcon)<{inputText:string}>`
    border:none;
    outline:none;
    background:inherit;
    font-weight:bold;
    padding:4px;
    flex-shrink:0;
    margin:0 10px;
    text-decoration:underline;
    transition: 0.25s;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    &:hover{
        background: rgba(150,150,150,0.15);
    }

    ${props => props.inputText==="" ? `opacity:0%` : `opacity:100%; cursor:pointer;`}
`;

export const CategoryButton = styled(Typography)<{isActive?:boolean}>`
    border:none;
    outline:none;
    cursor:pointer;
    background:inherit;
    // color: black;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;

    ${({ isActive }) => (isActive ? 'opacity: 80%;' : 'opacity: 40%;')}
    // ${({ isActive }) => (isActive ? 'border-bottom: 2px solid;' : '')}

    &:hover{
        transition: 0.1s;
        ${({ isActive }) => (isActive ? 'opacity: 80%;' : 'opacity: 60%;')}
    }

    &:active{
        transition: 0.1s;
        opacity: 60%;
    }

    transition: 0.25s;
`;

const SearchContent = styled(Box)<{isActive:boolean}>`
    ${props => props.isActive ? "" : "pointer-events: none; opacity: 0;"}
    position: absolute;
    transition: 0.25s;
    width: 600px;

`;

export const SearchListItem = styled.button`
    display: flex;
    gap: 10px;
    height: 50px;
    align-items: center;
    background: inherit;
    border:none;
    // border-bottom: 1px solid rgba(0,0,0,0.2);
    cursor:pointer;
    padding: 0px 30px;
    outline:none;
    &:hover{
        transition: 0.25s;
        background:rgba(0,0,0,0.02)
    }
`;

const EditFormBox = styled(Box)<{isActive:boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-around;
    width: 600px;
    position: absolute;
    transition: 0.25s;

    ${props => props.isActive ? "" : "pointer-events: none; opacity: 0;"}

`;

const Overlay = styled(Box)<{isActive:boolean}>`
    transition: 0.25s;
    background:${props => props.isActive ? "rgba(0,0,0,0.4)":"rgba(0,0,0,0)"};
    pointer-events: ${props => props.isActive ? "" : "none"};
    position: fixed;
    // width: 100vw;
    // height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

interface Props{

}

export const Search:React.FC<Props> = ({}) => {

    const [content, setContent] = useState<string>("suggestions");
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const [inputText, setInputText] = useState<string>("");
    const [isInputActive, setIsInputActive] = useState<boolean>(false);
    const [searchContentHeight, setSearchContentHeight] = useState<string>("0px");
    const [buttonsSlider, setButtonsSlider] = useState<string[]>(["38px","translate(0px, -3px)"]);

    const [currentProduct, setCurrentProduct] = useState<Product>(emptyProduct);

    const [products, setProducts] = useState<ProductMap>({test1:emptyProduct})
    
    const [productQuantity, setProductQuantity] = useState<number>(0);
    const [productServingSize, setProductServingSize] = useState<string>("g")

    const [foodEntryQuantity, setFoodEntryQuantity] = useState<number>(0);
    const [foodEntryServingSize, setFoodEntryServingSize] = useState<string>("g")

    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        console.log("CUUUUUUUUUUUUUUUUU"+currentProduct)
    }, [currentProduct]);

    const getIsCategoryActive = (categoryName:string) => {
        if(categoryName === activeCategory){
            return true;
        }
        return false
    }

    useEffect( () => {
        if(isInputActive){
            if(content==="suggestions"){
                setSearchContentHeight("500px")
            }else if(content === "addForm"){
                setSearchContentHeight("500px")
            }
        }else{
            setSearchContentHeight("0px")
        }

    }, [content, isInputActive])

    const closeSearch = () => {
        setIsInputActive(false);
        // setInputText("");
        setContent("suggestions");
        setActiveCategory("All");
        setCurrentProduct({...emptyProduct});
    }
    
    const wrapperRef = useRef(null);
    useOutsideClick(() => closeSearch(), wrapperRef);

    const getSearchResults = useMemo(() => {
        console.log(products)
        return Object.values(products).map(product => (
                <React.Fragment key = {product.id}>
                    <SearchListItem onClick={()=>{setInputText(product.name); setContent("addForm"); setActiveCategory("Add to Diary"); setCurrentProduct(product);}}>
                        <img src={"aa"} alt="." style={{height: "40px", width: "40px"}}/>
                        <div style={{fontWeight:"bold"}}>{product.name}</div>
                    </SearchListItem>
                </React.Fragment>
            ));
        
    }, [products])
    
    return (
        <>
        <Overlay isActive={isInputActive}></Overlay>
        <InputContainer isActive={isInputActive} ref={wrapperRef}>
            
            <Box style={{width: "630px", display:"flex", alignItems:"center", justifyContent:'center' , marginBottom:"20px", marginLeft:"22px"}}>
                <SearchIcon sx={{transform: "translate(41px, 0px)"}}/>
                <CustomInput value={inputText} onClick={() => setIsInputActive(true)} onChange={e => setInputText(e.target.value)} placeholder="Search food"/>
                <ClearButton sx={{transform: "translate(-60px, 0px)"}} color="inherit" inputText={inputText} onClick={()=>{setContent("suggestions"); setInputText(""); setActiveCategory("All"); setCurrentProduct({...emptyProduct})}}/>
            </Box>
            <Box style={{width:"100%", height: searchContentHeight, transition:"0.25s"}}>
                <SearchContent isActive={isInputActive && content==="suggestions"}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding:"0px 20px" }}>
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="scrollable prevent tabs example"
                            >
                            <Tab label="Recent" />
                            <Tab label="Custom" />
                            <Tab label="Basic" />
                            <Tab label="Branded" />
                        </Tabs>
                    </Box>
                    <TabPanel value={tab} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={tab} index={3}>
                        Item Four
                    </TabPanel>
                </SearchContent>
            </Box>
        </InputContainer>
        </>
    )
}

