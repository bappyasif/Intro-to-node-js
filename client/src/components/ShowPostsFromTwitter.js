import { Box, Link, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../App';
import { readDataFromServer } from './utils';

function ShowPostsFromTwitter() {
  let [dataset, setDataset] = useState({});

  let appCtx = useContext(AppContexts);

  let topic = "Sport"

  let searchTerm = "World Cup"

  let handleDataset = result => setDataset(result)

  let url = `${appCtx.baseUrl}/twitter/search/${topic}/${searchTerm}`

  useEffect(() => {
    readDataFromServer(url, handleDataset)
  }, [url])

  let renderPosts = () => dataset?.data?.data?.map((item) => <RenderPost key={item.id} item={item} />)

  console.log(dataset, "dataset!!")
  return (
    <Box>
      <Typography>Showing Post from Twitter</Typography>
      {renderPosts()}
    </Box>
  )
}

let RenderPost = ({ item}) => {
  let [imgUrl, setImgUrl] = useState(null)
  let handleImgUrl = () => {
    if(item?.medias) {
      setImgUrl(item.medias[0].url)
    }
    // mediaUrls?.forEach(elem => {
    //   if (elem.media_key === item.attachments?.media_keys[0]) {
    //     setImgUrl(elem.media_key)
    //   }
    // })
  }
  useEffect(() => {
    handleImgUrl()
  }, [item])

  // media files are now included now match and show images in tweet posts

  // let chkUrl = item?.text?.includes("https://")
  // let chkImg = false;
  // if(item?.attachments) {
  //   // let findIndx = mediaUrls.findIndex(elem => elem.media_key === item.attachments[0])
  //   mediaUrls.forEach(elem => {
  //     if(elem.media_key === item.attachments[0]) {
  //       chkImg = elem.url
  //     }
  //   })
  // }
  // console.log(chkImg, "chkImg")
  imgUrl && console.log(imgUrl, "<<imgUrl>>");
  return (
    <Box>
      <Stack>
        <Typography variant='h4'>{item.postData.text}</Typography>
        <Link>
          {imgUrl ? <img src={imgUrl} /> : null}
        </Link>
        {/* {chkUrl ?
          <Link target={"_blank"} href={`${item.text.split("https://")[1]}`}>
            <Typography variant='h4'>{item.text}</Typography>
          </Link>
          : null} */}
      </Stack>
    </Box>
  )
}

export default ShowPostsFromTwitter