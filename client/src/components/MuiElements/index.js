import { Tab, Tabs, Input, Button, Box, Typography, Card, CardHeader, Avatar, CardContent, Stack } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import {Masonry} from "@mui/lab"

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
            sx={{ border: 2, margin: 1.1, width: "263px", color: color, borderColor: "secondary.main" }}
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

const MuiButtonElement = ({ type, text }) => {
    return (
        <Button variant="contained" color={"success"} type={type}>{text}</Button>
    )
}

const MuiBoxElement = (props) => {
    return (
        <Box
            sx={{ border: 1.1, borderColor: props.color }}
            color={props.color}>{props.children}</Box>
    )
}

const TypographyElement = ({ text, type }) => {
    return <Typography variant={type}>{text}</Typography>
}

const CardElement = (props) => {
    return <Card className={props.className} sx={props.styles}>{props.children}</Card>
}

const AvatarElement = ({ url, altText }) => {
    return (
        <Avatar
            alt={altText}
            src={url}
        />
    )
}

const CardHeaderElement = ({ avatarUrl, title, joined, altText }) => {
    return (
        <CardHeader
            avatar={<AvatarElement url={avatarUrl} altText={altText} />}
            title={title}
            subheader={`Member Since: ${moment(joined).fromNow()}`}
        />
    )
}

const CardContentElement = (props) => {
    return <CardContent>{props.children}</CardContent>
}

const ButtonElement = ({text, type, fontSize}) => {
    return <Button sx={{fontSize: fontSize || "20px"}} variant={type}>{text}</Button>
}

const BoxElement = (props) => {
    return <Box className={props.className}>{props.children}</Box>
}

const StackElement = (props) => <Stack className={props.className}>{props.children}</Stack>

const MasonryElement = props => <Masonry columns={3} spacing={2} className={props.className}>{props.children}</Masonry>

// const MuiIconElement = ({icon}) => {

// }

export {
    MasonryElement,
    StackElement,
    BoxElement,
    ButtonElement,
    CardContentElement,
    AvatarElement,
    CardHeaderElement,
    TabsElement,
    TabElement,
    TabElementWithoutLink,
    MuiInputElement,
    MuiButtonElement,
    MuiBoxElement,
    TypographyElement,
    CardElement
}