import React from 'react'
import CustomizingTheme from './CustomizingTheme'
import BasicCard, { RecipeReviewCard } from './UsingCard'
import UsingIcons from './UsingIcons'
import UsingProgress from './UsingProgress'
import UsingSx from './UsingSx'

function TryoutContainer() {
    return (
        <>
            <UsingSx />
            <CustomizingTheme />
            <UsingIcons />
            <UsingProgress />
            <BasicCard />
            <RecipeReviewCard />
        </>
    )
}

export default TryoutContainer