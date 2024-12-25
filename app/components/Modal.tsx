import React, { useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

interface ModalProps {
    isOpen?: boolean,
    onClose?: () => void,
    onSubmit?: () => void,
    title?: string
    body?: React.ReactElement,
    footer?: React.ReactElement,
    actionLabel?: string,
    disabled?: boolean
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled
}) => {

    const handleClose = useCallback(() => {
        if(disabled) {
            return;
        }
        onClose?.();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if(disabled) {
            return;
        }
        onSubmit?.();
    }, [disabled, onSubmit]);

    if(!isOpen) {
        return null;
    }

    return (
        <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70'>
            <div className='relative w-full max-w-md my-6 mx-auto h-full lg:h-auto'>
                <div className='h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none'>
                    <div className='flex items-center justify-between p-6 rounded-t'>
                        <h3 className='text-2xl font-semibold text-white'>{title}</h3>
                        <button className='p-1 ml-auto bg-transparent border-0 text-white hover:opacity-70 transition' onClick={handleClose}>
                            <AiOutlineClose size={20} />
                        </button>
                    </div>
                    <div className='p-6 relative flex-auto'>
                        {body}
                    </div>
                    <div className='flex flex-col gap-2 p-6'>
                        <Button disabled={disabled} label={actionLabel || ''} secondary fullWidth large onClick={handleSubmit} />
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
