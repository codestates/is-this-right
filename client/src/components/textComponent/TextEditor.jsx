import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import parse from 'html-react-parser';
import { config } from './EditorConfig';
import React, { useState } from 'react';
import styled from 'styled-components';

const TextSectionStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5em;
`;

const Editor = styled.div`
  margin-right: 10em;
`;

const CkEditorStyle = styled(CKEditor)`
  min-height: 500px;
`;

function TextEditor() {
  const [body, setBody] = useState('');
  ClassicEditor.defaultConfig = config;
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit({ body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setBody(data);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TextEditor;
