import React from 'react'
import { WrapperDiv } from './GeneralElements'
import { BoxElement, CardContentElement, CardElement, CardHeaderElement, ContainerElement, DislikeIconElement, IconButtonElement, LikeIconElement, LoveIconElement, PaperElement, ShareIconElement, TextFieldMultilineElement, TypographyElement } from './MuiElements'

function CreatePost() {
  return (
    <ContainerElement width={"md"}>
      <PaperElement>
        <CardElement>
          <CardHeaderElement avatarUrl={null} altText={"fullname"} title={"User Name"} joined={null} />
          <CardContentElement>
            <TextFieldMultilineElement />
          </CardContentElement>

          {/* {iconsBtns.map(item => item.elem)} */}
          {iconsBtns.map(item =><ShowIconBtns key={item.name} item={item} />)}

        </CardElement>
      </PaperElement>
    </ContainerElement>
  )
}

let ShowIconBtns = ({ item }) => {
  return (
      <IconButtonElement>
        <BoxElement className="icon-button">
          {item.elem}
          <TypographyElement text={item.name} type={"span"} />
        </BoxElement>
      </IconButtonElement>
  )
}

// dataset needs to be changed asap
let iconsBtns = [
  { name: "Like", elem: <LikeIconElement /> },
  { name: "Dislike", elem: <DislikeIconElement /> },
  { name: "love", elem: <LoveIconElement /> },
  { name: "share", elem: <ShareIconElement /> }
]

export default CreatePost