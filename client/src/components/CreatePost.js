import React, { useEffect, useState } from 'react'
import { GiphyFetch } from "@giphy/js-fetch-api"
import { Gif, Grid, Video } from "@giphy/react-components"
import EmojiPicker from "emoji-picker-react"
import { Editor } from "@tinymce/tinymce-react"
import { FieldsetElement, FormElement, LegendElement } from './FormElements'
import { WrapperDiv } from './GeneralElements'
import { BoxElement, ButtonElement, CardContentElement, CardElement, CardHeaderElement, ContainerElement, DislikeIconElement, EmoticonElement, EverybodyElement, FormControlElement, FriendsElement, GifElement, HelperTextElement, IconButtonElement, ImageElement, InputLabelElement, LikeIconElement, LoveIconElement, MenuItemElement, PaperElement, PollElement, PrivacyElement, SearchUserInputElement, SelectElement, ShareIconElement, TextFieldMultilineElement, TypographyElement, UserInputElement, VideoCameraFrontElement } from './MuiElements'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import ChoosePrivacy from './ChoosePrivacy'

function CreatePost() {
  let [addedOptions, setAddedOptions] = useState({})

  let handleAddedOptions = (evt, elm, val) => {
    if (elm) {
      setAddedOptions(prev => ({ ...prev, [elm]: val, current: elm }))
    }
  }

  console.log(addedOptions, "addedOptions!!")

  return (
    <ContainerElement width={"md"}>
      <PaperElement>
        <CardElement>
          <CardHeaderElement avatarUrl={null} altText={"fullname"} title={"User Name"} joined={null} />

          <CardContentElement>
            {/* <TextFieldMultilineElement /> */}
            <ShowRichTextEditor />
          </CardContentElement>

          {iconsBtns.map(item => <ShowIconBtns key={item.name} item={item} handleAddedOptions={handleAddedOptions} />)}

          <ShowClickActionsFunctionality currentElement={addedOptions.current} handleValue={handleAddedOptions} />

        </CardElement>
      </PaperElement>
    </ContainerElement>
  )
}

let ShowRichTextEditor = () => {
  return (
    <>
      <Editor
        initialValue="This is the initial content of the editor"
        init={{
          selector: 'textarea',  // change this value according to your HTML
          height: 300,
          branding: false,
          menubar: false,
          preview_styles: false,
          plugins: 'link code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        id="body"
      // onChange={(e) => handleChange(e, 'body')}
      />
    </>
  )
}

let ShowClickActionsFunctionality = ({ currentElement, handleValue }) => {
  let renderFunctionality = null;

  if (currentElement === "Image" || currentElement === "Video") {
    renderFunctionality = <ShowUrlGrabbingForm handleValue={handleValue} currentElement={currentElement} />
  } else if (currentElement === "Gif") {
    renderFunctionality = <ShowGifSelectingElement />
  } else if (currentElement === "Emoji") {
    renderFunctionality = <ShowEmoJiPickerElement />
  } else if (currentElement === "Poll") {
    renderFunctionality = "Show Poll Selecting Element"
  } else if (currentElement === "Privacy") {
    renderFunctionality = <ChoosePrivacy />
  }

  return (
    renderFunctionality
  )
}

let ShowPrivacySettingsOptions = () => {
  let [settingSelected, setSettingSelected] = useState('')

  let handleSettingSelected = event => {
    console.log(event, event.target)
    setSettingSelected(event.target.value)
    // setSettingSelected(event.target.value !== undefined ? event.target.value : "")
  }

  // let renderSettings = () => privacyIcons.map(item => <MenuItemElement key={item.name} value={item.name} text={item.name} />)
  
  // let renderSettings = () => privacyIcons.map(item => <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)

  return (
    <BoxElement>
      {settingSelected}
      <FormControlElement variant="filled" styles={{ m: 1, minWidth: 220 }}>
        <InputLabelElement hFor={"select-elem"} text={"Select Privacy"} />
        <Select
          labelId="select-elem"
          id="select-elem"
          value={settingSelected}
          onChange={handleSettingSelected}
          label="Select Privacy"
        >
          <MenuItem value="">None</MenuItem>
          {/* {renderSettings()} */}
        </Select>
      </FormControlElement>

      {/* <FormControlElement variant="filled" styles={{ m: 2, mt: 4, minWidth: 220 }}>
        <InputLabelElement hFor={"select-element"} text={"Choose Privacy"} />
        <SelectElement
          id={"select-element"}
          value={settingSelected !== undefined ? settingSelected : ''}
          changeHandler={handleSettingSelected}
          label="Choose Privacy"
        >
          <MenuItemElement value={""} text={"None"} />
          {renderSettings()}
        </SelectElement>
      </FormControlElement> */}
    </BoxElement>
  )
}

let RenderPrivacySettingIcon = ({ item }) => {
  return (
    <BoxElement>

    </BoxElement>
  )
}

let ShowEmoJiPickerElement = () => {
  return (
    <>
      <EmojiPicker />
    </>
  )
}

let ShowGifSelectingElement = () => {
  let [searchText, setSearchText] = useState(null);
  let [gifData, setGifData] = useState(null);

  let giphyFetch = new GiphyFetch("TpnE8CtDArV0DqW17cilRKXCIptJJ621");

  let fetchGifs = (offset) => searchText ? giphyFetch.search(searchText, { offset, limit: 10 }) : giphyFetch.trending({ offset, limit: 10 });

  let handleOnGifClicked = (gif, e) => {
    e.preventDefault();
    console.log(gif, "gif!!")
    setGifData(gif)
  }

  useEffect(() => {
    fetchGifs()
  }, [searchText])

  let handleSearchText = evt => setSearchText(evt.target.value)

  return (
    <BoxElement>
      {gifData && <Gif gif={gifData} width={200} height={200} />}

      <ShowGifSearch handleSearchText={handleSearchText} />

      <Grid
        onGifClick={handleOnGifClicked}
        fetchGifs={fetchGifs}
        width={window.innerWidth}
        columns={7}
        gutter={6}
        key={searchText}
      />
    </BoxElement>
  )
}

let ShowGifSearch = ({ handleSearchText }) => {
  return (
    <BoxElement>
      <FormControlElement>
        <InputLabelElement hFor={"url"} text={"Search Gif"} />
        <SearchUserInputElement id={"url"} helperId={null} type={"text"} handleChange={handleSearchText} />
      </FormControlElement>
    </BoxElement>
  )
}

let ShowUrlGrabbingForm = ({ handleValue, currentElement }) => {
  let [value, setValue] = useState(null)

  let handleChange = event => setValue(event.target.value)

  let handleSubmit = event => {
    event.preventDefault();
    console.log("here here", value)
    handleValue(event, currentElement, value)
  }

  return (
    <FormElement handleSubmit={handleSubmit}>
      {/* <LegendElement text={"Enter Your Resource Url"} /> */}
      {/* <FieldsetElement> */}
      <FormControlElement>
        <InputLabelElement hFor={"url"} text={"Enter Url Of Media Resource Here"} />
        <UserInputElement id={"url"} helperId="url-helper-text" type={"text"} handleChange={handleChange} />
        <HelperTextElement id={"url-helper-text"} text={"Enter a valid a url of your media resource"} />
      </FormControlElement>
      {/* </FieldsetElement> */}
      <ButtonElement type={"submit"} text="Upload" />
    </FormElement>
  )
}

let ShowIconBtns = ({ item, handleAddedOptions }) => {
  return (
    <IconButtonElement className="icon-button" clickHandler={handleAddedOptions} elm={item.name}>
      <BoxElement>
        {item.elem}
        <TypographyElement text={item.name} type={"span"} />
      </BoxElement>
    </IconButtonElement>
  )
}

// dataset for post create icons elements
let iconsBtns = [
  { name: "Image", elem: <ImageElement /> },
  { name: "Video", elem: <VideoCameraFrontElement /> },
  { name: "Gif", elem: <GifElement /> },
  { name: "Emoji", elem: <EmoticonElement /> },
  { name: "Poll", elem: <PollElement /> },
  { name: "Privacy", elem: <PrivacyElement /> }
];

export default CreatePost