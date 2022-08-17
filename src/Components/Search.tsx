import styled from "@emotion/styled"
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import DefaultFoodImage from "../Pgotos/DefaultFoodImage.png"
import useOutsideClick from "./useOutsideClick";
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Box, Button, ButtonBase, Divider, Input, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { emptyProduct, Product, ProductMap } from "../Api/products/types";
import { Stack } from "@mui/system";
import { MiniChart } from "./MiniChart";

const InputContainer = styled(Box)<{isActive:boolean}>`
    position: absolute;
    z-index: 1000;
    width: 560px;
    min-height: 60px;
    max-height: 600px;
    border: 1px solid;
    border-color: inherit;
    transition: 0.25s;
    border-radius: 10px;

    ${props => props.isActive ? `background: #ffffff;box-shadow: 0 0 10px rgba(0,0,0,0.2); border-color: rgba(0,0,0,0.1);` : ``}
    &:hover{
        // background: rgba(207,223,218,1);
        // box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        // border-color: rgba(0,0,0,0.1);
    }
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;

const CustomInput = styled(InputBase)`
    width: 430px;
    height: 60px;
    border: none;
    margin-left: 10px;
    background: rgba(0,0,0,0);
    outline: none;
    font-size: 20px;
`;

const ClearButton = styled(ButtonBase)<{inputText:string}>`
    border:none;
    outline:none;
    background:inherit;
    font-weight:bold;
    width:50px;
    padding:4px;
    flex-shrink:0;
    margin:0 10px;
    text-decoration:underline;
    transition: 0.25s;

    ${props => props.inputText==="" ? `opacity:0%` : `opacity:100%; cursor:pointer;`}
`;

export const CategoryButton = styled(ButtonBase)<{isActive?:boolean}>`
    border:none;
    outline:none;
    cursor:pointer;
    background:inherit;
    color: black;
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
    position: relative;
`;

const SearchContent = styled(Box)<{isActive:boolean}>`
    ${props => props.isActive ? "" : "pointer-events: none; opacity: 0;"}
    position: absolute;
    transition: 0.25s;
    width: 560px;

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
    width: 560px;
    position: absolute;
    transition: 0.25s;

    ${props => props.isActive ? "" : "pointer-events: none; opacity: 0;"}

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

    useEffect( () => {
        if(activeCategory === "All"){
            setButtonsSlider(["38px","translate(0px, -3px)"])
        }else if(activeCategory === "Your foods"){
            setButtonsSlider(["95px","translate(43px, -3px)"])
        }else if(activeCategory === "Common"){
            setButtonsSlider(["82px","translate(144px, -3px)"])
        }else if(activeCategory === "Branded"){
            setButtonsSlider(["78px","translate(232px, -3px)"])
        }else if(activeCategory === "Edit Food"){
            setButtonsSlider(["86px","translate(0px, -3px)"])
        }else if(activeCategory === "Add to Diary"){
            setButtonsSlider(["107px","translate(91px, -3px)"])
        }
    }, [activeCategory])

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
        <InputContainer isActive={isInputActive} ref={wrapperRef}>
            <Box style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding: "0px 30px"}}>
                <SearchIcon/>
                <CustomInput value={inputText} onClick={() => setIsInputActive(true)} onChange={e => setInputText(e.target.value)} placeholder="Search food"/>
                <ClearButton inputText={inputText} onClick={()=>{setContent("suggestions"); setInputText(""); setActiveCategory("All"); setCurrentProduct({...emptyProduct})}} disableRipple >Clear</ClearButton>
            </Box>
            <Box style={{width:"100%", height: searchContentHeight, transition:"0.25s", position: "relative"}}>
                <SearchContent isActive={isInputActive && content==="suggestions"}>
                    <Box sx={{padding:"0px 30px"}}>
                        <Box sx={{display: "flex", gap: "5px", flexShrink:"0"}}>
                            <CategoryButton onClick={() => setActiveCategory("All")} isActive={getIsCategoryActive("All")} disableRipple>All</CategoryButton>
                            <CategoryButton onClick={() => setActiveCategory("Your foods")} isActive={getIsCategoryActive("Your foods")} disableRipple>Your foods</CategoryButton>
                            <CategoryButton onClick={() => setActiveCategory("Common")} isActive={getIsCategoryActive("Common")} disableRipple>Common</CategoryButton>
                            <CategoryButton onClick={() => {setActiveCategory("Branded"); setContent("addForm")}} isActive={getIsCategoryActive("Branded")} disableRipple>Branded</CategoryButton>
                        </Box>
                        <Box sx={{transform:"translate(-30px, -1px)", height:"1px", width:"560px",background:"grey" }}/>
                        <Box sx={{width: buttonsSlider[0], height: "2px", background:"black", transform: buttonsSlider[1], transition:"0.25s"}}></Box>
                    </Box>

                    <div style={{marginTop: "10px"}}>
                        <Stack>
                            {getSearchResults}
                            <Box style={{margin:"10px 0px", height:"1px", width:"560px", backgroundColor:"grey"}}/>
                            <SearchListItem onClick={()=>{setContent("addForm"); setActiveCategory("Edit Food")}}>
                                <div style={{background: "#83b28d", borderRadius:"50%",height: "30px", width: "30px", margin:"5px", color:"white", fontWeight:"bold", display:"flex", justifyContent:"center", textAlign:"center", alignItems:"center", fontSize:"20px"}}>+</div>
                                <div style={{fontWeight:"bold"}}>Add new food</div>
                            </SearchListItem>
                        </Stack>
                    </div>
                </SearchContent>
                <SearchContent isActive={isInputActive && content === "addForm"}>

                    <Box sx={{padding:"0px 30px"}}>
                        <Box sx={{display: "flex", gap: "5px", flexShrink:"0"}}>
                            <CategoryButton onClick={() => setActiveCategory("Edit Food")} isActive={getIsCategoryActive("Edit Food")} disableRipple>Edit Food</CategoryButton>
                            <CategoryButton onClick={() => setActiveCategory("Add to Diary")} isActive={getIsCategoryActive("Add to Diary")} disableRipple>Add to Diary</CategoryButton>
                        </Box>
                        <Box sx={{transform:"translate(-30px, -1px)", height:"1px", width:"560px",background:"grey" }}/>
                        <Box sx={{width: buttonsSlider[0], height: "2px", background:"black", transform: buttonsSlider[1], transition:"0.25s"}}></Box>
                    </Box>
                    
                    <EditFormBox isActive={activeCategory==="Edit Food"}>
                        <Box>
                            <Stack direction={"row"} justifyContent={"center"} sx={{marginTop:"10px", padding:"10px"}}>
                                <Typography sx={{fontWeight:"bold", textAlign:"center", margin: "10px", display:"flex", alignItems:"center"}}>Nutrition facts per</Typography> 
                                <TextField value={productQuantity} onChange={e => setProductQuantity(parseFloat(e.target.value))} variant="standard" sx={{width:"50px"}} inputProps={{style: {textAlign: 'center'}}}></TextField>
                                <TextField value={productServingSize} onChange={e => setProductServingSize(e.target.value)} select variant="standard" sx={{width:"50px", marginLeft:"5px"}} inputProps={{style: {textAlign: 'left'}}}>
                                <option key={"asd"} value={"g"}>
                                    {"g"}
                                </option>
                                </TextField>
                            </Stack>
                            <TableContainer component={Box}>
                                <Table sx={{ width: 400, margin: "auto"}} size="small" aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>Calories</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.calories} onChange={e => setCurrentProduct(prev =>{return {...prev, calories:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>Tot fat</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.fat} onChange={e => setCurrentProduct(prev =>{return {...prev, fat:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{paddingLeft:"40px"}}>Sat fat</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.saturatedFat} onChange={e => setCurrentProduct(prev =>{return {...prev, saturatedFat:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>Tot carbs</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.carbs} onChange={e => setCurrentProduct(prev =>{return {...prev, carbs:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{paddingLeft:"40px"}}>Fiber</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.fiber} onChange={e => setCurrentProduct(prev =>{return {...prev, fiber:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{paddingLeft:"40px"}}>Sugar</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.sugar} onChange={e => setCurrentProduct(prev =>{return {...prev, sugar:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>Protein</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.protein} onChange={e => setCurrentProduct(prev =>{return {...prev, protein:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" sx={{paddingLeft:"40px"}}>Sodium</TableCell>
                                            <TableCell align="center"><InputBase value={currentProduct.sodium} onChange={e => setCurrentProduct(prev =>{return {...prev, sodium:parseFloat(e.target.value)}})} inputProps={{style: {textAlign: 'center', fontSize:"15px", maxHeight: "20px"}}} onFocus={(event) => event.target.select()}></InputBase></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                       
                    </EditFormBox>

                    <EditFormBox isActive={activeCategory==="Add to Diary"}>
                        <Stack direction={"row"} justifyContent={"center"} sx={{marginTop:"10px", padding:"10px"}}>
                            <Typography sx={{fontWeight:"bold", textAlign:"center", margin: "10px", display:"flex", alignItems:"center"}}>Add to diary</Typography> 
                            <TextField value={foodEntryQuantity} onChange={e => setFoodEntryQuantity(parseFloat(e.target.value))} variant="standard" sx={{width:"50px"}} inputProps={{style: {textAlign: 'center'}}}></TextField>
                            <TextField value={foodEntryServingSize} onChange={e => setFoodEntryServingSize(e.target.value)} select variant="standard" sx={{width:"50px", marginLeft:"5px"}} inputProps={{style: {textAlign: 'left'}}}>
                            <option key={"asd"} value={"g"}>
                                {"g"}
                            </option>
                            </TextField>
                        </Stack>
                        <div style={{fontSize:"14px", fontWeight:"bold", textAlign:"center"}}>{currentProduct.calories * foodEntryQuantity / 100} cal</div>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <MiniChart color="#EF4444" label="fat" amount={currentProduct.fat * foodEntryQuantity / 100} unit="g" procentage={currentProduct.calories===0? 0 : currentProduct.fat * 9 * 100 / currentProduct.calories}/>
                            <MiniChart color="#ef9a44" label="carbs" amount={currentProduct.carbs * foodEntryQuantity / 100} unit="g" procentage={currentProduct.calories===0? 0 : currentProduct.carbs * 4 * 100 / currentProduct.calories}/>
                            <MiniChart color="#83b28d" label="protein" amount={currentProduct.protein * foodEntryQuantity / 100} unit="g" procentage={currentProduct.calories===0? 0 : currentProduct.protein * 4 * 100 / currentProduct.calories}/>
                        </Stack>
                        <Button>Add</Button>
                    </EditFormBox>
                </SearchContent>

            </Box>
        </InputContainer>
    )
}

