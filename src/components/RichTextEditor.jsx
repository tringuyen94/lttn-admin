import React, { useRef } from 'react'
import JoditEditor from "jodit-react"

const RichTextEditor = ({ getContentFromRTE, defaultValue }) => {
   const editor = useRef(null)
   return (
      <JoditEditor
         ref={editor}
         tabIndex={1}
         config={{ readonly: false }}
         value={defaultValue}
         onChange={newContent => getContentFromRTE(newContent)}
      />
   )
}
export default RichTextEditor