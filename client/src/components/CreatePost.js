import React, { useEffect, useRef, useState } from 'react'
import { GiphyFetch } from "@giphy/js-fetch-api"
import { Gif, Grid } from "@giphy/react-components"
import EmojiPicker from "emoji-picker-react"
import { Editor } from "@tinymce/tinymce-react"
import { FormElement } from './FormElements'
import { BoxElement, ButtonElement, CardContentElement, CardElement, CardHeaderElement, ContainerElement, EmoticonElement, FormControlElement, GifElement, HelperTextElement, IconButtonElement, ImageElement, InputLabelElement, PaperElement, PollElement, PrivacyElement, SearchUserInputElement, TypographyElement, UserInputElement, VideoCameraFrontElement } from './MuiElements'
import ChoosePrivacy from './ChoosePrivacy'
import CreatePoll from './CreatePoll'
import ShowUserPostMedias from './ShowUserPostMedias'

function CreatePost() {
  let [addedOptions, setAddedOptions] = useState({})

  let handleAddedOptions = (evt, elm, val) => {
    if (elm) {
      val ? setAddedOptions(prev => ({ ...prev, [elm]: val, current: elm })) : setAddedOptions(prev => ({ ...prev, current: elm }))
      // setAddedOptions(prev => ({ ...prev, [elm]: val, current: elm }))
      // setAddedOptions(prev => ({ ...prev, [elm]: val, current: "elm" }))
    }
  }

  console.log(addedOptions, "addedOptions!!")

  return (
    <ContainerElement width={"md"}>
      <PaperElement>
        <CardElement>
          <CardHeaderElement avatarUrl={null} altText={"fullname"} title={"User Name"} joined={null} />

          <CardContentElement>
            <ShowRichTextEditor />
          </CardContentElement>

          {/* showing user selected medias in post */}
          <ShowUserPostMedias mediaContents={addedOptions} />
          {/* <ShowUserPostMedias mediaType={"picture"} mediaContent={addedOptions.Image} /> */}
          {/* <ShowUserPostMedias mediaType={"picture"} mediaContent={"https://random.imagecdn.app/500/150"} /> */}

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
          height: 200,
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
    renderFunctionality = <ShowGifSelectingElement handleValue={handleValue} currentElement={currentElement} />
  } else if (currentElement === "Emoji") {
    renderFunctionality = <ShowEmoJiPickerElement />
  } else if (currentElement === "Poll") {
    renderFunctionality = <CreatePoll handleValue={handleValue} currentElement={currentElement} />
  } else if (currentElement === "Privacy") {
    renderFunctionality = <ChoosePrivacy handleValue={handleValue} currentElement={currentElement} />
  }

  return (
    renderFunctionality
  )
}

let ShowEmoJiPickerElement = () => {
  return (
    <>
      <EmojiPicker />
    </>
  )
}

let ShowGifSelectingElement = ({handleValue, currentElement}) => {
  let [searchText, setSearchText] = useState(null);
  let [gifData, setGifData] = useState(null);

  let giphyFetch = new GiphyFetch("TpnE8CtDArV0DqW17cilRKXCIptJJ621");

  let fetchGifs = (offset) => searchText ? giphyFetch.search(searchText, { offset, limit: 10 }) : giphyFetch.trending({ offset, limit: 10 });

  let handleOnGifClicked = (gif, e) => {
    e.preventDefault();
    console.log(gif, "gif!!")
    setGifData(gif)
    handleValue(e, currentElement, gif);
  }

  let handleSearchText = evt => setSearchText(evt.target.value)

  return (
    <BoxElement>
      {/* {gifData && <Gif gif={gifData} width={200} height={200} />} */}

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
  let [value, setValue] = useState(null);

  // const ref = useRef();

  let handleChange = event => setValue(event.target.value)

  let handleSubmit = event => {
    event.preventDefault();
    // uploading url into state
    handleValue(event, currentElement, value);
    // changing current elemnt to something which has no actionable components attached to it
    handleValue(event, "choose again", "");
    // reseting form value, but didnt have to as we're closing this functionable components
    // ref.current.reset();
  }

  return (
    <FormElement handleSubmit={handleSubmit}>
      <FormControlElement>
        <InputLabelElement hFor={"url"} text={"Enter Url Of Media Resource Here"} />
        <UserInputElement id={"url"} helperId="url-helper-text" type={"text"} handleChange={handleChange} />
        <HelperTextElement id={"url-helper-text"} text={"Enter a valid a url of your media resource"} />
      </FormControlElement>
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