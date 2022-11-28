import { NoteForm } from '../containers/NoteForm'
import { Fragment, useContext } from 'react'
import { marked } from 'marked'
import { NoteContext } from '../App'
import parse from 'html-react-parser'

export function Workspace() {
  const { selectedNote, isEdit } = useContext(NoteContext)
  const name = selectedNote?.name || ''
  const text = selectedNote?.text || ''
  const createdDate = selectedNote?.created_dt.toLocaleDateString() || ''
  const updatedDate = selectedNote?.updated_dt.toLocaleDateString() || ''
  const html = parse(marked.parse(text))
  const divStyle = { display: 'flex', alignItems: 'center' }
  const titleStyle = { marginRight: '5px' }

  const formElement = isEdit ? (
    <NoteForm data={selectedNote} />
  ) : (
    <Fragment>
      <div style={divStyle}>
        <strong style={titleStyle}>Note name: </strong>
        <p>{name}</p>
      </div>
      <div style={divStyle}>
        <strong style={titleStyle}>Note text: </strong>
        {html}
      </div>
      <div style={divStyle}>
        <strong style={titleStyle}>Note created date: </strong>
        <p>{createdDate}</p>
      </div>
      <div style={divStyle}>
        <strong style={titleStyle}>Note updated date: </strong>
        <p>{updatedDate}</p>
      </div>
    </Fragment>
  )

  return <div className='work-space'>{formElement}</div>
}
