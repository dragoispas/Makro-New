import styled from "@emotion/styled"
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import DefaultFoodImage from "../Pgotos/DefaultFoodImage.png"
import useOutsideClick from "./useOutsideClick";
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Box, Button, ButtonBase, ClickAwayListener, Divider, FormControl, Input, InputAdornment, InputBase, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, OutlinedInput, Paper, Select, Tab,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { emptyProduct, Product, ProductMap } from "../Api/products/types";
import { Stack } from "@mui/system";
import { MiniChart } from "./MiniChart";
import ReplayIcon from '@mui/icons-material/Replay';
import { TabPanel } from "./TabPanel";
import ClearIcon from '@mui/icons-material/Clear';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { SearchListItem } from "./SearchListItem";
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle } from "@mui/icons-material";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";
import { LinearProgressWithLabel } from "./LinearProgressWithLabel";
import NumberFormat, { InputAttributes } from "react-number-format";

const InputContainer = styled(Paper)<{isActive:boolean}>`
    position: absolute;
    z-index: 1000;
    width: 600px;
    min-height: 60px;
    max-height: 600px;
    border-radius: 5px;
    padding-top: 5px;

    ${props => props.isActive ? `box-shadow: 0 0 50px rgba(0,0,0,0.5);` : `box-shadow: none;`}

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

const ClearButton = styled(ClearIcon)<{isActive:boolean}>`
    border:none;
    outline:none;
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

    ${props => props.isActive ? `opacity:100%; cursor:pointer;` : `opacity:0%`}
`;

const SearchContent = styled(Box)<{isActive:boolean}>`
opacity: 0;
    ${props => props.isActive ? "animation: fade-in 1s forwards;" : "pointer-events: none; opacity: 0;"}
    position: absolute;
    width: 600px;
    @keyframes fade-in {
        0%    { opacity: 0; }
        100%  { opacity: 1; }
    }
    animation-delay: 0.15s;
    animation-duration: 0.35s;

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
    z-index:1000;
`;

export const CustomFoodIcon = styled(LocalDiningIcon)`
    background: rgba(150,150,150,0.2);
    border-radius: 50%;
    padding: 5px;
    opacity:0.9;
`;

const AnimatedBox = styled(Box)<{isActive:boolean}>`
    opacity: 0;
    @keyframes fade-in {
        0%    { opacity: 0; }
        100%  { opacity: 1; }
    }
    ${props => props.isActive ? "animation: fade-in 1s;" : ""}
    animation-delay: 0.25s;

`;

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
  
  const NumberFormatCustom = React.forwardRef<
    NumberFormat<InputAttributes>,
    CustomProps
  >(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        // thousandSeparator
        isNumericString
      />
    );
  });

interface Props{

}

export const Search:React.FC<Props> = ({}) => {

    const [content, setContent] = useState<string>("search results");

    const [inputText, setInputText] = useState<string>("");
    const [isInputActive, setIsInputActive] = useState<boolean>(false);
    const [searchContentHeight, setSearchContentHeight] = useState<string>("0px");

    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const [products, setProducts] = useState<ProductMap>({test1:emptyProduct,test2:emptyProduct,test3:emptyProduct})
    
    const [productQuantity, setProductQuantity] = useState<string>("");
    const [productServingSize, setProductServingSize] = useState<string>("g")

    const [foodEntryQuantity, setFoodEntryQuantity] = useState<string>("");
    const [foodEntryServingSize, setFoodEntryServingSize] = useState<string>("g")

    const [tab, setTab] = React.useState(0);

    const [calories, setCalories] = useState<string>("");
    const [fat, setFat] = useState<string>("");
    const [satFat, setSatFat] = useState<string>("");
    const [carbs, setCarbs] = useState<string>("");
    const [fiber, setFiber] = useState<string>("");
    const [sugar, setSugar] = useState<string>("");
    const [protein, setProtein] = useState<string>("");
    const [sodium, setSodium] = useState<string>("");
    const [potassium, setPotassium] = useState<string>("");

    const getProcentage = (x:number, y:number) => {
        return x * 100 / y;
    }


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        console.log("CUUUUUUUUUUUUUUUUU"+currentProduct)
        if(currentProduct){
            setCalories(currentProduct.calories!==0 ? currentProduct.calories.toString() : "");
            setFat(currentProduct.fat!==0 ? currentProduct.fat.toString() : "");
            setSatFat(currentProduct.saturatedFat!==0 ? currentProduct.saturatedFat.toString() : "");
            setCarbs(currentProduct.carbs!==0 ? currentProduct.carbs.toString() : "");
            setFiber(currentProduct.fiber!==0 ? currentProduct.fiber.toString() : "");
            setSugar(currentProduct.sugar!==0 ? currentProduct.sugar.toString() : "");
            setProtein(currentProduct.protein!==0 ? currentProduct.protein.toString() : "");
            setSodium(currentProduct.sodium!==0 ? currentProduct.sodium.toString() : "");
            setPotassium(currentProduct.potassium!==0 ? currentProduct.potassium.toString() : "");
        }else{
            setCalories("");
            setFat("");
            setSatFat("");
            setCarbs("");
            setFiber("");
            setSugar("");
            setProtein("");
            setSodium("");
            setPotassium("");
        }
    }, [currentProduct]);


    /**
     * Expands the search box when input is selected
     */
    useEffect( () => {
        if(isInputActive){
            setSearchContentHeight("500px")
        }else{
            setSearchContentHeight("0px")
        }

    }, [content, isInputActive])



    /**
     * Closes the search, goes back to results and drops the selected product
     */
    const closeSearch = () => { // TODO : make a setting that allows user to choose defaults
        setIsInputActive(false);
        setContent("search results");
        setCurrentProduct(null);
        resetForms();
    }

    const resetForms = () => {
        setFoodEntryQuantity("");
        setProductQuantity("100");
    }
    


    /**
     * Allows user to click outside the search box to close it
     * 
     *  TODO : fix an issue where it'll close the search box when clicking on a MUI select
     */
    // const wrapperRef = useRef(null);
    // useOutsideClick(() => closeSearch(), wrapperRef);

    /**
     * Takes all producs and returns react fragments for each of them
     */
    const getSearchListItems = useMemo(() => {
        console.log(products)
        return Object.values(products).map(product => (
                <React.Fragment key = {product.id}>
                    <Box onClick={()=>{setInputText(product.name); console.log("clicked on " + product.name); setCurrentProduct(product);setContent("selected product");}}>
                        <SearchListItem name={product.name} calories={product.calories}/>
                    </Box>
                </React.Fragment>
            ));
        
    }, [products])


    /**
     * Style applied to all <List> components
     */
    const listSx={
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 355,
        height: 355,
        '& ul': { padding: 0 },
    }
    
    return (
        <>
        <Overlay isActive={isInputActive}></Overlay>
        <ClickAwayListener onClickAway={() =>closeSearch()}>
        <InputContainer isActive={isInputActive}>
        
            <Box style={{width: "630px", display:"flex", alignItems:"center", justifyContent:'center' , marginBottom:"20px", marginLeft:"22px"}}>
                {content==="search results" ? <SearchIcon sx={{transform: "translate(41px, 0px)"}}/> : <EditIcon sx={{transform: "translate(41px, 0px)"}}/>}
                <CustomInput value={inputText} onClick={() => setIsInputActive(true)} onChange={e => setInputText(e.target.value)} placeholder={content==="search results" ? "Search food" : "Food name"}/>
                <ClearButton sx={{transform: "translate(-60px, 0px)"}} color="inherit" isActive={inputText!=="" || content==="selected product"} onClick={()=>{setContent("search results"); setInputText(""); setCurrentProduct(null); resetForms();}}/>
            </Box>
            
            <Box sx={{width:"100%", height: searchContentHeight, transition:"0.25s"}}>
                <SearchContent isActive={isInputActive && content==="search results"}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding:"0px 20px" }}>
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="scrollable prevent tabs example"
                            >
                            <Tab label="All" />
                            <Tab label="Custom" />
                            <Tab label="Common" />
                            <Tab label="Branded" />
                        </Tabs>
                    </Box>
                    <TabPanel value={tab} index={0}>
                        <List sx={listSx} subheader={<li />}>
                            <li key={`section-1`}>
                                <ul>
                                    <ListSubheader>RECENT</ListSubheader>
                                    {getSearchListItems}
                                    <ListSubheader>CUSTOM</ListSubheader>
                                    {getSearchListItems}
                                    <ListSubheader>COMMON</ListSubheader>
                                    {getSearchListItems}
                                    <ListSubheader>BRANDED</ListSubheader>
                                    {getSearchListItems}
                                </ul>
                            </li>
                        </List>
                        <Button onClick={()=>{setContent("selected product");setCurrentProduct(null);}} sx={{width:"100%", marginTop:"10px"}}>CREATE NEW FOOD</Button>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <List sx={listSx} subheader={<li />}>
                            {getSearchListItems}
                        </List>
                        <Button onClick={()=>{setContent("selected product");setCurrentProduct(null);}} sx={{width:"100%", marginTop:"10px"}}>CREATE NEW FOOD</Button>
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <List sx={listSx} subheader={<li />} >
                            {getSearchListItems}    
                        </List>
                        <Button onClick={()=>{setContent("selected product");setCurrentProduct(null);}} sx={{width:"100%", marginTop:"10px"}}>CREATE NEW FOOD</Button>
                    </TabPanel>
                    <TabPanel value={tab} index={3}>
                        <List sx={listSx} subheader={<li />}>
                            {getSearchListItems}
                        </List>
                        <Button onClick={()=>{setContent("selected product");setCurrentProduct(null);}} sx={{width:"100%", marginTop:"10px"}}>CREATE NEW FOOD</Button>
                    </TabPanel>
                </SearchContent>


                <SearchContent isActive={isInputActive && content==="selected product"}>
                    <Stack
                    sx={{height:"455px", margin:"24px"}}
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    >
                        <Box sx={{height:"100%", width:"100%", display:"flex"}}>
                            
                            <Stack gap={1} sx={{ width:"180px", borderRight: 1, paddingRight:"24px", borderColor:"divider", alignItems:"flex-start" }}>
                                <Typography sx={{fontWeight:"bold"}}>Nutrition Facts</Typography>
                                <Box sx={{display:"flex", justifyContent:"space-between", width:"175px", marginBottom:"5px"}}>
                                    <Typography sx={{width:"25px"}}>per </Typography>
                                    <FormControl variant="standard">
                                    <TextField
                                        InputProps={{inputComponent: NumberFormatCustom as any}}
                                        inputProps={{style:{textAlign:"end"}}}
                                        sx={{width:"75px", paddingRight:"1px"}}
                                        size="small"
                                        id="input-with-icon-adornment"
                                        placeholder="0"
                                        value={productQuantity}
                                        onChange={e=>setProductQuantity(e.target.value)}
                                        variant="standard"
                                    />

                                    </FormControl>
                                    <FormControl size="small">
                                        <Select
                                             MenuProps={{
                                                disablePortal: true,
                                                style:{cursor:"default"}
                                              }}
                                            variant="standard"
                                            sx={{width:"75px", paddingLeft:"1px"}}
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={productServingSize}
                                            onChange={e=>setProductServingSize(e.target.value)}
                                        >
                                            <MenuItem value={"g"}>g</MenuItem>
                                            <MenuItem value={"oz"}>oz</MenuItem>
                                            <MenuItem value={"lb"}>lb</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="start"><Typography color={"text.primary"}>Calories</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">cal</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={calories}
                                    onChange={(e)=>setCalories(e.target.value)}
                                    />

                                </FormControl>
                                <FormControl variant="standard">
                                    <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="start"><Typography color={"text.primary"}>Fat</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={fat}
                                    onChange={(e)=>setFat(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="end"><Typography color={"text.secondary"}>Sat Fat</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={satFat}
                                    onChange={(e)=>setSatFat(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="start"><Typography color={"text.primary"}>Carbs</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={carbs}
                                    onChange={(e)=>setCarbs(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="end"><Typography color={"text.secondary"}>Fiber</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={fiber}
                                    onChange={(e)=>setFiber(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="end"><Typography color={"text.secondary"}>Sugar</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={sugar}
                                    onChange={(e)=>setSugar(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="start"><Typography color={"text.primary"}>Protein</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={protein}
                                    onChange={(e)=>setProtein(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="end"><Typography color={"text.secondary"}>Sodium</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={sodium}
                                    onChange={(e)=>setSodium(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                <TextField
                                    InputProps={{inputComponent: NumberFormatCustom as any, startAdornment:<InputAdornment position="end"><Typography color={"text.secondary"}>Potassium</Typography></InputAdornment>, endAdornment:<InputAdornment position="end">g</InputAdornment>}}
                                    inputProps={{style:{textAlign:"end"}}}
                                    sx={{width:"175px"}}
                                    size="small"
                                    id="input-with-icon-adornment"
                                    placeholder="0"
                                    variant="standard"
                                    value={potassium}
                                    onChange={(e)=>setPotassium(e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack gap={1} sx={{ width:"100%", paddingLeft:"24px", alignItems:"center" }}>
                                <Box sx={{display:"flex", justifyContent:"center", width:"300px", marginBottom:"5px"}}>
                                    <Typography sx={{fontWeight:"bold"}}>Quantity:  </Typography>
                                    <FormControl variant="standard">
                                        <TextField
                                        InputProps={{style:{textAlign:"end"},inputComponent: NumberFormatCustom as any}}
                                        inputProps={{style:{textAlign:"end"}}}
                                        sx={{width:"75px", paddingRight:"1px"}}
                                        size="small"
                                        id="input-with-icon-adornment"
                                        placeholder="0"
                                        value={foodEntryQuantity}
                                        onChange={e=>setFoodEntryQuantity(e.target.value)}
                                        variant="standard"
                                    />

                                    </FormControl>
                                    <FormControl size="small">
                                        <Select
                                            MenuProps={{
                                                disablePortal: true,
                                                style:{cursor:"default"}
                                              }}
                                            variant="standard"
                                            sx={{width:"75px", paddingLeft:"1px"}}
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={foodEntryServingSize}
                                            onChange={e=>setFoodEntryServingSize(e.target.value)}
                                        >
                                            <MenuItem value={"g"}>g</MenuItem>
                                            <MenuItem value={"oz"}>oz</MenuItem>
                                            <MenuItem value={"lb"}>lb</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                
                                <Stack
                                direction="column"
                                justifyContent="space-around"
                                alignItems="center"
                                spacing={0}
                                sx={{border: 1, borderColor:"divider", height: "150px", width:"280px", padding:"10px"}}
                                >

                                    <Typography sx={{fontWeight:"bold", marginBottom:"15px"}}>Summary</Typography>

                                    <Stack
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={0}
                                    sx={{width:"100%", position:"relative"}}
                                    >
                                        <Stack
                                        direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                        spacing={0}
                                        sx={{width:"100%", position:"absolute"}}
                                        >
                                            <CircularProgressWithLabel makro={"protein"} style={{opacity:0.3}} size={60} value={100}></CircularProgressWithLabel>
                                            <CircularProgressWithLabel makro={"fat"} style={{opacity:0.3}}  size={60} value={100}></CircularProgressWithLabel>
                                            <CircularProgressWithLabel makro={"carbs"} style={{opacity:0.3}}  size={60} value={100}></CircularProgressWithLabel>
                                        </Stack>
                                        
                                        <CircularProgressWithLabel makro={"protein"} size={60} label={calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0" ?  parseFloat(protein)*parseFloat(foodEntryQuantity) : 0} value={(calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0") ? (getProcentage(parseFloat(protein) * 4, parseFloat(calories))) : 0}></CircularProgressWithLabel>
                                        <CircularProgressWithLabel makro={"fat"}  size={60} label={calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0" ?  parseFloat(fat)*parseFloat(foodEntryQuantity) : 0} value={(calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0") ? (getProcentage(parseFloat(fat) * 9, parseFloat(calories))) : 0}></CircularProgressWithLabel>
                                        <CircularProgressWithLabel makro={"carbs"}  size={60} label={calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0" ?  parseFloat(carbs)*parseFloat(foodEntryQuantity) : 0} value={(calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0") ? (getProcentage(parseFloat(carbs) * 4, parseFloat(calories))) : 0}></CircularProgressWithLabel>

                                        
                                    </Stack>
                                    <Box sx={{ width: '230px' }}>
                                        <LinearProgressWithLabel label={(calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0") ? (parseFloat(calories) * parseFloat(foodEntryQuantity)) : 0} value={(calories!=="" && foodEntryQuantity!=="" && calories!=="0" && foodEntryQuantity!=="0") ? 60 : 0}></LinearProgressWithLabel>
                                    </Box>
                                    

                                </Stack>
                            </Stack>
                        </Box>
                        <Button sx={{width:"100%", marginTop:"10px", justifySelf:"flex-end"}}>ADD TO DIARY</Button>
                    </Stack>
                </SearchContent>
            </Box>
            
        </InputContainer>
        </ClickAwayListener>
        
        </>
    )
}

