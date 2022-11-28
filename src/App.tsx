import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { Layout } from 'antd'
import { CustomModal } from './components/CustomModal'
import { CustomModalProps } from './models/component-types'
import { SideBar } from './components/SideBar'
import { NoteFE, NoteBE } from './models/note-types'
import { Workspace } from './components/Workspace'
import { db } from './config/db'

const { Header, Content, Sider } = Layout

export type NoteContextType = {
  notes: NoteFE[]
  selectedNote?: NoteFE
  setSelectedNote?: React.Dispatch<React.SetStateAction<NoteFE | undefined>>
  setNoteToUpdate?: React.Dispatch<React.SetStateAction<NoteFE | undefined>>
  isEdit: boolean
}

export const NoteContext = React.createContext<NoteContextType>({
  notes: [],
  isEdit: false
})

function App() {
  const [notes, setNotes] = useState<NoteFE[]>([])
  const [filteredNotes, setFilteredNotes] = useState<NoteFE[]>([])
  const [selectedNote, setSelectedNote] = useState<any>()
  const [noteToUpdate, setNoteToUpdate] = useState<NoteFE>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)


  async function addNote(): Promise<void> {
    try {
      const id = await db.notes.add({
        name: 'Test note' + Math.random(),
        text: 'test text' + Math.random(),
        author: 'Author' + Math.random(),
        created_dt: new Date(),
        updated_dt: new Date()
      })
    } catch (error) {
      console.error(error)
    }
  }



  useEffect(() => {
    setLoading(true)
    if (noteToUpdate && noteToUpdate.id) {
      updateNote(noteToUpdate.id, noteToUpdate)
        .then(() => {
          const updatedNotes = notes.map(value =>
            value.id === noteToUpdate.id ? noteToUpdate : value
          )
          setNotes(updatedNotes)
          setFilteredNotes(updatedNotes)
          setSelectedNote(noteToUpdate)
        })
        .catch(console.error)
    }

    getNotes()
      .then(value => {
        setNotes(value)
        setFilteredNotes(value)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [noteToUpdate, isEdit, isOpen])


  async function updateNote(id: number, body: NoteBE): Promise<void> {
    try {
      await db.notes.update(id, body)
    } catch (error) {
      console.error(error)
    }
  }

  const findNotes = (text: string): NoteFE[] => {
    try {
      return notes.filter(value => value.text.includes(text))
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const onNoteRemove = () => setIsOpen(true)

  const removeNote = async (id?: number): Promise<void> => {
    if (id !== undefined) {
      try {
        await db.notes.delete(id)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const props: CustomModalProps = {
    isOpen,
    onOk: async () => {
      try {
        await removeNote(selectedNote?.id)
        const updatedNotes = await getNotes()
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
        setSelectedNote(null)
      } catch (error) {
        console.error(error)
      } finally {
        setIsOpen(false)
      }
    },
    onCancel: () => setIsOpen(false),
    title: 'Подтверждение удаления!',
    modalText: 'Вы уверены, что хотите удалить заметку?'
  }
  const modalElement = <CustomModal {...props} />

  const getNotes = async (): Promise<NoteFE[]> => {
    return (await db.notes.toArray()) as NoteFE[]
  }

  const onEdit = (): void => {
    setIsEdit(!isEdit)
  }

  const sideBarElement = isLoading ? '...Loading' : <SideBar />

  return (
    <NoteContext.Provider
      value={{
        isEdit,
        notes: filteredNotes,
        selectedNote,
        setSelectedNote,
        setNoteToUpdate
      }}
    >
      <Layout>
        <Header className='header'>
          <Input.Search
            allowClear
            style={{ width: '40%', marginRight: '10px' }}
            onChange={({ target: { value } }) => {
              setFilteredNotes(findNotes(value))
            }}
          />
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
            onClick={onEdit}
            disabled={selectedNote == null}
          >
            Изменить
          </Button>
          <Button
            type='primary'
            onClick={onNoteRemove}
            disabled={selectedNote == null}
            danger={true}
          >
            Удалить
          </Button>
        </Header>
        <Layout>
          <Sider width={200} className='site-layout-background'>
            {sideBarElement}
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className='site-layout-background'
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Workspace />
              {modalElement}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </NoteContext.Provider>
  )
}

export default App
