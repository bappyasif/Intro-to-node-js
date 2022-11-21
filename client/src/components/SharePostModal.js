import { DoneAllTwoTone } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

function SharePostModal({ showModal, setShowModal }) {
    console.log(showModal, "showModal!!")
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        zIndex: 2,
        pointerEvents: "auto"
    };

    return (
        <Box sx={style}>
            <Typography variant={"h6"}>"Modal Text"</Typography>
            <Typography variant={"h6"} sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula</Typography>
            <Button
                // onClick={() => setShowModal(false)}
                onClick={() => console.log("clicked!!")}
                startIcon={<DoneAllTwoTone />}>
                <Typography variant='body2'>Done</Typography>
            </Button>
        </Box>
        // <Modal
        //     open={showModal}
        //     // onClose={() => setShowModal(false)}
        //     aria-labelledby="modal-modal-title"
        //     aria-describedby="modal-modal-description"
        // >
        //     <Box sx={style}>
        //         <Typography id={"modal-modal-title"} variant={"h6"}>"Modal Text"</Typography>
        //         <Typography id={"modal-modal-description"} variant={"h6"} sx={{ mt: 2 }}>
        //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula</Typography>
        //     </Box>
        // </Modal>
        // <div style={{position: "absolute", top: 0, right: 11}}>SharePostModal</div>
    )
}

export default SharePostModal