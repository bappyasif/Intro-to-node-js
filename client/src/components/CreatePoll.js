import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function CreatePoll() {
    return (
        <Box>
            <Typography variant='h4' component={"h2"}>Create Poll</Typography>
            <ShowPollUI />
        </Box>
    )
}

let ShowPollUI = () => {
    let [options, setOptions] = useState(null)

    useEffect(() => setOptions(2), [])

    let renderOptions = () => Array.from({ length: options }).map((_, n) => <ShowOption key={n} n={n} />)

    return (
        <Stack>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", flexDirection: "row" }}>
                {renderOptions()}
            </Box>
            <ActionButtons options={options} setOptions={setOptions} />
        </Stack>
    )
}

let ActionButtons = ({options, setOptions}) => {
    
    let actionHandler = (event) => {
        let chk = event.target.textContent || event.target.parentNode.parentNode.textContent || event.target.parentNode.parentNode.parentNode.textContent
        if(options >= 2) {
            setOptions(prev => chk === "Add" ? prev + 1 : (chk === "Sub" && options > 2) ? prev - 1 : prev)
        }
    }

    let renderButons = () => btnsData.map(item => <Button onClick={actionHandler} variant='contained' key={item.name} endIcon={item.icon} sx={{m: 1, p: 1, borderRadius: "11px", fontSize: "larger"}}>{item.name}</Button>)
    
    return (
        <Box>
            {renderButons()}
        </Box>
    )
}

let ShowOption = ({ n }) => {
    return (
        <FormControl sx={{ m: 1, mb: 2, width: (window.innerWidth / 6) }}>
            <InputLabel htmlFor={`option-${n + 1}`}>{`Option ${Number(n + 1)}`}</InputLabel>
            <Input id={`option-${Number(n + 1)}`} type={"text"} placeholder='add your option value in here....' />
        </FormControl>
    )
}

let btnsData = [
    { name: "Add", icon: <AddCircleRounded /> },
    { name: "Sub", icon: <RemoveCircleRounded /> }
]

export default CreatePoll