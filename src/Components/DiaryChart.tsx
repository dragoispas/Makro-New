import styled from "@emotion/styled"
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"

const MacroGraph = styled(Box)<{amount:number, macro:string}>`
    border-radius: 2px;
    height: 32px;
    width: ${props => props.amount * 0.8 + 3}px;
    max-width: 300px;
    background-color:${props => props.macro === "totalProtein" ? "#83b28d" : (props.macro === "totalFat" ? "#EF4444" : "#ef9a44")};
    // background-color: #EF4444;
    // background-color: #ef9a44;

    transition: 0.25s;
`;

const ChartContainer = styled(Stack)`
    // display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    padding: 5px;

    .progressbar_container{
        padding: 30px;
        border-radius: 5px;
        // opacity: 80px;
        width: 200px;
    }

    .progressbar{
        width: 175px;
        height: 175px;
        margin: auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .progressbar_label{
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    
    .progressbar_label_amount{
        font-weight: bold;
        font-size: 20px;
        height: 20px;
    }

    .progressbar_label_unit{
        font-weight: bold;
        font-size: 16px;
        height: 20px;
        opacity: 50%;
    }

    .makrocharts_container{
        padding: 30px;
        border-radius: 5px;
        // opacity: 80%;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        width: 200px;
        height: 170px;
    }

    .makrochart_container{
        display: flex;
        height: 32px;
        justify-content: center;
    }
`;

//red color: EF4444

interface Props{
    targetCalories: number,
    totalCalories: number,
    totalCarbs: number,
    totalFat: number,
    totalProtein: number
}

export const DiaryChart:React.FC<Props> = ({targetCalories, totalCalories, totalCarbs, totalFat, totalProtein}) => {
    return(
        <ChartContainer direction={"row"}>
                <Box className="progressbar_container">
                    <Box className="progressbar">
                        <CircularProgressbar
                            value={100*totalCalories/targetCalories}
                            strokeWidth={20}
                            styles={buildStyles({
                                pathColor: "#83b28d",
                                trailColor: "#rgba(250,250,250,0.5)",
                                pathTransition: "0.25s",
                                strokeLinecap: "butt",
                            })}
                        />
                        <Box className="progressbar_label">
                            <div className="progressbar_label_amount">{totalCalories}</div>
                            <div className="progressbar_label_unit">cal</div>
                        </Box>
                    </Box>
                </Box>
                {/* <Box style={{width:"100px"}}></Box> */}
                {/* <Divider wdith="1px" height="200px"></Divider> */}
                <Divider light/>
                <Box className="makrocharts_container">
                    <Box className="makrochart_container">
                        <MacroGraph amount={totalCarbs} macro={"totalCarbs"}></MacroGraph>
                        <Box style={{display:"flex", flexDirection:"column", textAlign:"start", marginLeft:"5px", alignItems:"space-between"}}>
                            <div style={{fontWeight:"bold", fontSize:"16px", height:"17px"}}>{totalCarbs}</div>
                            <div style={{fontWeight:"bold", fontSize:"13px", height:"17px", opacity:"50%"}}>totalCarbs</div>
                        </Box>
                    </Box>
                    <Box className="makrochart_container">
                        <MacroGraph amount={totalFat} macro={"totalFat"}></MacroGraph>
                        <Box style={{display:"flex", flexDirection:"column", textAlign:"start", marginLeft:"5px", alignItems:"space-between"}}>
                            <div style={{fontWeight:"bold", fontSize:"16px", height:"17px"}}>{totalFat}</div>
                            <div style={{fontWeight:"bold", fontSize:"13px", height:"17px", opacity:"50%"}}>totalFat</div>
                        </Box>
                    </Box>
                    <Box className="makrochart_container">
                        <MacroGraph amount={totalProtein} macro={"totalProtein"}></MacroGraph>
                        <Box style={{display:"flex", flexDirection:"column", textAlign:"start", marginLeft:"5px", alignItems:"space-between"}}>
                            <div style={{fontWeight:"bold", fontSize:"16px", height:"17px"}}>{totalProtein}</div>
                            <div style={{fontWeight:"bold", fontSize:"13px", height:"17px", opacity:"50%"}}>totalProtein</div>
                        </Box>
                    </Box>
                </Box>
            </ChartContainer>
    )
}