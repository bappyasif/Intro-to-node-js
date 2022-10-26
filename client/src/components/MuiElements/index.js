import { Tab, Tabs, Input, Button, Box, Typography, Card, CardHeader, Avatar, CardContent, Stack, Skeleton, IconButton, Paper, Container, TextField, FormControl, InputLabel, FormHelperText } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import {Masonry} from "@mui/lab"
import { PeopleAltRounded, AllInclusiveRounded, PollRounded, PrivacyTipRounded, InsertEmoticonRounded, GifBoxRounded, ImageRounded, VideoCameraFrontRounded, DeleteOutlineRounded, ThumbUpAltRounded, ThumbDownAltRounded, HeatPumpRounded, ShareRounded } from "@mui/icons-material";

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
        <Button variant="contained" color={"success"} type={type} sx={{borderRadius: 9}}>{text}</Button>
    )
}

const MuiBoxElement = (props) => {
    return (
        <Box
            sx={{ border: 1.1, borderColor: props.color }}
            color={props.color}>{props.children}</Box>
    )
}

const TypographyElement = ({ text, type, styles }) => {
    return <Typography variant={type} sx={styles}>{text}</Typography>
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

const ButtonElement = ({text, type, fontSize, action = null}) => {
    return <Button type={action} sx={{fontSize: fontSize || "20px", borderRadius: 4}} variant={type}>{text}</Button>
}

const BoxElement = (props) => {
    return <Box sx={{width: "100%"}} className={props.className}>{props.children}</Box>
}

const StackElement = (props) => <Stack className={props.className}>{props.children}</Stack>

const MasonryElement = props => <Masonry columns={3} spacing={2} className={props.className}>{props.children}</Masonry>

const SkeletonBasicElement = ({height, width, animation, variant}) => <Skeleton variant={variant || "circular"} animation={animation || "wave"} height={height || 10} width={width || "80%"} />

const IconButtonElement = (props) => <IconButton onClick={e=>props.clickHandler(e, props.elm, true)}>{props.children}</IconButton>

const DeleteIconElement = ({fontSize}) => <DeleteOutlineRounded fontSize={fontSize || "medium"} />

const LikeIconElement = ({fontSize}) => <ThumbUpAltRounded fontSize={fontSize || "medium"} />

const DislikeIconElement = ({fontSize}) => <ThumbDownAltRounded fontSize={fontSize || "medium"} />

const LoveIconElement = ({fontSize}) => <HeatPumpRounded fontSize={fontSize || "medium"} />

const ShareIconElement = ({fontSize}) => <ShareRounded fontSize={fontSize || "medium"} />

const PaperElement = (props) => <Paper sx={{backgroundColor: props.bgColor || "darkslategray"}}>{props.children}</Paper>

const ContainerElement = props => <Container maxWidth={props.width || "lg"}>{props.children}</Container>

const TextFieldMultilineElement = () => <TextField multiline rows={4} defaultValue="this is a test" />

const VideoCameraFrontElement = ({fontSize}) => <VideoCameraFrontRounded fontSize={fontSize || "medium"} />

const ImageElement = ({fontSize}) => <ImageRounded fontSize={fontSize || "medium"} />

const GifElement = ({fontSize}) => <GifBoxRounded fontSize={fontSize || "medium"} />

const EmoticonElement = ({fontSize}) => <InsertEmoticonRounded fontSize={fontSize || "medium"} />

const PrivacyElement = ({fontSize}) => <PrivacyTipRounded fontSize={fontSize || "medium"} />

const PollElement = ({fontSize}) => <PollRounded fontSize={fontSize || "medium"} />

const EverybodyElement = ({fontSize}) => <AllInclusiveRounded fontSize={fontSize || "medium"} />

const FriendsElement = ({fontSize}) => <PeopleAltRounded fontSize={fontSize || "medium"} />

const FormControlElement = (props) => <FormControl sx={{width: "100%"}}>{props.children}</FormControl>

const InputLabelElement = ({hFor, text}) => <InputLabel htmlFor={hFor}>{text}</InputLabel>

const UserInputElement = ({id, helperId , type, handleChange, width}) => <Input type={type} id={id} aria-describedby={helperId} onChange={handleChange} fullWidth={true} />

const HelperTextElement = ({id, text}) => <FormHelperText id={id}>{text}</FormHelperText>

const SearchUserInputElement = ({id, type, handleChange}) => <Input sx={{ pt: 2, pl: 2, mb: 4, bgcolor: "text.success", border: 1.1, borderColor: "teal", fontSize: "x-large"}} type={type} id={id} onChange={handleChange} />

// const MuiIconElement = ({icon}) => {

// }

export {
    SearchUserInputElement,
    HelperTextElement,
    UserInputElement,
    InputLabelElement,
    FormControlElement,
    FriendsElement,
    EverybodyElement,
    PollElement,
    PrivacyElement,
    EmoticonElement,
    GifElement,
    ImageElement,
    VideoCameraFrontElement,
    TextFieldMultilineElement,
    ContainerElement,
    PaperElement,
    IconButtonElement,
    DeleteIconElement,
    LikeIconElement,
    DislikeIconElement,
    LoveIconElement,
    ShareIconElement,
    SkeletonBasicElement,
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