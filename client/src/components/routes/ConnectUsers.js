import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../../App'
import { WrapperDiv } from '../GeneralElements'
import { BoxElement, ButtonElement, CardContentElement, CardElement, CardHeaderElement, MasonryElement, StackElement, TypographyElement } from '../MuiElements'
import { readDataFromServer } from '../utils'

function ConnectUsers() {
  let [data, setData] = useState({})

  let appCtx = useContext(AppContexts)

  let url = `${appCtx.baseUrl}/users`

  let dataHandler = dataset => setData(dataset)

  useEffect(() => {
    readDataFromServer(url, dataHandler)
  }, [url])

  console.log(data)

  let renderUsers = () => data?.data?.data.map(user => <RenderUser key={user._id} userData={user} />)

  return (
    <WrapperDiv className="cards-wrapper">
      <TypographyElement text={"Connect With Other User"} type="h1" />
      <MasonryElement >
        {renderUsers()}
      </MasonryElement>
    </WrapperDiv>
  )
}

let RenderUser = ({ userData }) => {
  let { fullName, email, friends, created, bio } = { ...userData }
  let test = "https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"

  return (
    <CardElement
      className="card-wrapper"
      styles={{ width: "510px", backgroundColor: "text.secondary", minHeight: "277px" }}
    >
      <CardHeaderElement avatarUrl={test} altText={fullName} title={fullName} joined={created} />
      <CardContentElement>
        <TypographyElement text={email} type={"p"} />
        <TypographyElement text={bio} type={"body2"} />
        <StackElement className="af-wrapper">
          <BoxElement className="fc">
            <TypographyElement text={"Friends: "} type={"h4"} />
            <TypographyElement text={friends.length} type={"h4"} />
          </BoxElement>
          <BoxElement className="fr">
            <TypographyElement text={"Friend Request"} type={"h4"} />
            <BoxElement className="all-btns">
              <ButtonElement text={"Send"} type="contained" />
              <ButtonElement text={"Undo"} type="contained" />
            </BoxElement>
          </BoxElement>
        </StackElement>
      </CardContentElement>
    </CardElement>
  )
}

export default ConnectUsers