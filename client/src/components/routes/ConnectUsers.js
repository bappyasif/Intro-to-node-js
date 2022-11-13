import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContexts } from '../../App'
import { WrapperDiv } from '../GeneralElements'
import { BoxElement, ButtonElement, CardContentElement, CardElement, CardHeaderElement, MasonryElement, SkeletonBasicElement, StackElement, TypographyElement } from '../MuiElements'
import { readDataFromServer, updateUserInDatabase } from '../utils'

function ConnectUsers() {
  let [data, setData] = useState({})
  let [timers, setTimers] = useState(false)

  let appCtx = useContext(AppContexts)

  let url = `${appCtx.baseUrl}/users`

  let dataHandler = dataset => setData(dataset)

  useEffect(() => {
    readDataFromServer(url, dataHandler)
  }, [url])

  console.log(data)

  // making timers flag to be true after 1.7sec
  let timer = setTimeout(() => setTimers(true), 1700)

  // when flag is true then we are clearing its timer for performance and best practice, also turning timers flag to false
  useEffect(() => {
    timers && clearTimeout(timer)
    timers && setTimers(false);
  }, [timers, timer])

  let renderUsers = () => data?.data?.data.map(user => <RenderUser key={user._id} userData={user} />)

  return (
    <WrapperDiv className="cards-wrapper">
      <TypographyElement text={"Connect With Other User"} type="h1" />
      
      {/* making skeleton show up when data is still not available */}
      {!timers && Array.from([1, 2, 3,4]).map(idx => <CardSkeleton key={idx} />)}

      {
        timers
          ?
          <MasonryElement className="masonry-elem">
            {renderUsers()}
          </MasonryElement>
          :
          null
      }
    </WrapperDiv>
  )
}

let RenderUser = ({ userData }) => {
  let { fullName, email, friends, created, bio, _id } = { ...userData }
  let test = "https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"

  let [selectedTopics, setSelectedTopics] = useState([])

    let appCtx = useContext(AppContexts);

    let navigate = useNavigate()

    let updatingUserDataInDatabase = (data, endpoint) => {
      let url = `${appCtx.baseUrl}/users/${endpoint}`
        updateUserInDatabase(url, data, appCtx.updateData, navigate)
        
        // url = `${appCtx.baseUrl}/users/${userData._id}`
        // updateUserInDatabase(url, {frRecieved: appCtx.user._id}, appCtx.updateData, navigate)
    }

    let handleSend = (evt) => {
      
      updatingUserDataInDatabase({frSent: userData._id}, appCtx.user._id)
      updatingUserDataInDatabase({frRecieved: appCtx.user._id}, userData._id)

      if(evt.target.textContent === "Send") {

        // console.log(userData)
        // updatingUserDataInDatabase({frSent: userData._id}, appCtx.user._id)
        
        updatingUserDataInDatabase({frRecieved: appCtx.user._id}, userData._id)
        
      } else if(evt.target.textContent === "Undo") {
        // todo undo

      }
    }

  return (
    <CardElement
      className="card-wrapper"
      styles={{ backgroundColor: "text.secondary" }}
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
              <ButtonElement text={"Send"} type="contained" action={handleSend} disable={appCtx.user.frSent.includes(_id)} />
              <ButtonElement text={"Undo"} type="contained" action={handleSend} />
            </BoxElement>
          </BoxElement>
        </StackElement>
      </CardContentElement>
    </CardElement>
  )
}

let CardSkeleton = () => {
  return (
    <CardElement
      className="card-wrapper"
      styles={{ backgroundColor: "text.secondary" }}
    >
      <SkeletonBasicElement width={"40px"} height="40px" />
      <CardContentElement>
        <SkeletonBasicElement variant='rectangular' />
        <SkeletonBasicElement variant='rectangular' />
        <SkeletonBasicElement variant='rectangular' height="40px" />
        <SkeletonBasicElement variant='rectangular' height="40px" />
      </CardContentElement>
    </CardElement>
  )
}

export default ConnectUsers