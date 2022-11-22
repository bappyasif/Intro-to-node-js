import { DoneAllTwoTone } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreatePost from './CreatePost';

function SharePostModal({ showModal, setShowModal, setShowCreatePost, handleCounts, setShareFlag, shareFlag }) {
    // console.log(showModal, "showModal!!")
    // let [flag, setFlag] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 2,
        // pointerEvents: "auto",
        // pointerEvents: showModal ? "none" : "auto" 
    };

    let handleModalsVisibility = () => {
        setShowCreatePost(true)
        setShowModal(false)
        handleCounts("Share", !shareFlag)
        setShareFlag(!shareFlag)
        // console.log(flag, "!!")
    }
    console.log(shareFlag, "!!from share")
    return (
        <Box sx={style}>
                {/* <Typography id={"modal-modal-title"} variant={"h6"}>"Modal Text"</Typography>
                <Typography id={"modal-modal-description"} variant={"h6"} sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula</Typography> */}
                <CreatePost handleModalsVisibility={handleModalsVisibility} />
                <Button
                    onClick={handleModalsVisibility}
                    // onClick={() => console.log("clicked!!")}
                    startIcon={<DoneAllTwoTone />}>
                    <Typography variant='body2'>Done</Typography>
                </Button>
            </Box>
        // <Modal
        //     open={showModal}
        //     onClose={() => setShowModal(false)}
        //     aria-labelledby="modal-modal-title"
        //     aria-describedby="modal-modal-description"
        // >
        //     <Box sx={style}>
        //         <Typography id={"modal-modal-title"} variant={"h6"}>"Modal Text"</Typography>
        //         <Typography id={"modal-modal-description"} variant={"h6"} sx={{ mt: 2 }}>
        //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula</Typography>
        //         <CreatePost />
        //         <Button
        //             onClick={() => setShowModal(false)}
        //             // onClick={() => console.log("clicked!!")}
        //             startIcon={<DoneAllTwoTone />}>
        //             <Typography variant='body2'>Done</Typography>
        //         </Button>
        //     </Box>
        // </Modal>
        // <div style={{position: "absolute", top: 0, right: 11}}>SharePostModal</div>
    )
}

export default SharePostModal