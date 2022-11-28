import { Menu } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { NoteContext } from '../App'

export function SideBar() {
  return (
    <NoteContext.Consumer>
      {({ notes, selectedNote, setSelectedNote }) => {
        const menuData: ItemType[] = notes.map(({ id, name }) => {
          return {
            key: id,
            title: name,
            theme: 'light',
            label: name
          }
        })

        return (
          <Menu
            theme='dark'
            mode='inline'
            items={menuData}
            defaultSelectedKeys={[String(selectedNote?.id || '')]}
            onSelect={({ key }) => {
              const foundNote = notes.find(note => note.id === Number(key))
              if (setSelectedNote !== undefined) {
                setSelectedNote(foundNote)
              }
            }}
          />
        )
      }}
    </NoteContext.Consumer>
  )
}
