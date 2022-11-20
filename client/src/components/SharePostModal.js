import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

function SharePostModal({ showModal, setShowModal }) {
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
    };

    return (
        <Box sx={style}>
            <Typography id={"modal-modal-title"} variant={"h6"}>"Modal Text"</Typography>
            <Typography id={"modal-modal-description"} variant={"h6"} sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula</Typography>
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