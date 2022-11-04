import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { RenderTopic, topicCategories } from './ChooseTopics'

function TopicCategory() {
    let [topics, setTopics] = useState([])
    let { category } = useParams()

    let handleTopics = () => {
        topicCategories.forEach(item => {
            if (Object.keys(item) == category) setTopics(Object.values(item))
        })
    }

    let renderTopics = () => topics[0]?.map(name => <RenderTopic key={name} topic={name} />)

    useEffect(() => handleTopics, [category])

    // console.log(category, "!!", topicCategories[0].category, topics)


    return (
        <>
            <Typography variant='h1' component={"p"} sx={{ pl: 1 }}>{category}</Typography>
            <Stack
                sx={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    m: 1,
                    p: 1.5,
                    backgroundColor: "lightskyblue",
                    borderRadius: 2,
                    alignItems: "center",
                }}
            >
                {renderTopics()}
            </Stack>
        </>
    )
}

export default TopicCategory