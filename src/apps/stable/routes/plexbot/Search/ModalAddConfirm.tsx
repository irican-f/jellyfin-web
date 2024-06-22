// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */
import React from 'react';

import { Box, Button, Modal, TextField } from '@mui/material';

import { useConfirmAdd } from 'hooks/Plexbot/useConfirmAdd';

import toast from 'components/toast/toast';

interface ModalAddConfirmProps {
    title: string | undefined;
    mediaId: string | undefined;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const ModalAddConfirm: React.FC<ModalAddConfirmProps> = ({ title, openModal, setOpenModal, mediaId }) => {
    const [renamedTitle, setRenamedTitle] = React.useState(title);

    const handleCloseModal = () => {
        mutate({ extractMediaConfirmationRequest:
            { mediaTitle: renamedTitle, crawlLinkId: mediaId }
        });
        toast('Media added successfully');
        setOpenModal(false);
    };
    const handleRenameTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
        setRenamedTitle(event.target.value);
    };

    const { mutate } = useConfirmAdd();

    return (
        <Modal open={openModal} onClose={() => handleCloseModal()}>
            <Box sx={style}>
                <h2>Please rename if needed</h2>
                <TextField
                    id='outlined-basic'
                    label='Title'
                    variant='outlined'
                    defaultValue={title}
                    value={renamedTitle}
                    onChange={handleRenameTitle}
                />
                <Button
                    variant='outlined'
                    onClick={handleCloseModal}
                >
                    confirm
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalAddConfirm;
