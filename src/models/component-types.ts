import { Note } from './note-types';

export type CustomModalProps = {
    isOpen: boolean
    title: string
    onOk: () => void
    onCancel: () => void
    modalText: string
}

export type SideBarProps = {
    data: Note[]
}


export type ListItemProps = {
    data: Note
}