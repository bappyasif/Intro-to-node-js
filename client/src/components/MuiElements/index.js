import { Tab, Tabs, Input, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TabsElement = (props) => {
    return (
        <Tabs
            value={props.value}
            onChange={props.handleChange}
            className={props.className}
            centered
        >{props.children}</Tabs>
    )
}

const TabElement = (props) => {
    return (
        <Tab
            icon={props.icon}
            label={props.labelText}
            to={props.path}
            LinkComponent={Link}
        >
            {props.children}
        </Tab>
    )
}

const TabElementWithoutLink = ({ icon, labelText }) => {
    return <Tab icon={icon} label={labelText} />
}

const MuiInputElement = ({ id, type, handleChange, text, required, color, error }) => {
    console.log(error)
    return (
        <Input
            sx={{border: 2, margin: 1.1, width: "263px", color: color, borderColor: "secondary.main"}} 
            id={id}
            name={id}
            type={type}
            onChange={handleChange}
            placeholder={text}
            required={required}
            color={color}
            // fullWidth={true}
            error={error}
        />
    )
}

const MuiButtonElement = ({type, text}) =>{
    return (
        <Button variant="contained" color={"success"} type={type}>{text}</Button>
    )
}

const MuiBoxElement = (props) => {
    return (
        <Box
            sx={{border: 1.1, borderColor: props.color}} 
            color={props.color}>{props.children}</Box>
    )
}

// const MuiIconElement = ({icon}) => {
    
// }

export {
    TabsElement,
    TabElement,
    TabElementWithoutLink,
    MuiInputElement,
    MuiButtonElement,
    MuiBoxElement
}