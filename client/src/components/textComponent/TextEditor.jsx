import { CKEditor } from '@ckeditor/ckeditor5-react';
import parse from 'html-react-parser';
import { config } from './EditorConfig';
import React, { useState } from 'react';
import styled from 'styled-components';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
// import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder.js';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const installedPlugins = [
  // Alignment,
  Autoformat,
  AutoImage,
  // Autosave,
  BlockQuote,
  Bold,
  CKFinder,
  CKFinderUploadAdapter,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageInsert,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
];

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
        config={{
          plugins: [...installedPlugins],
          toolbar: [
            '|',
            'heading',
            '|',
            '|',
            'bold',
            'italic',
            'bulletedList',
            'numberedList',
            '|',
            '|',
            'link',
            'blockQuote',
            // 'CKFinder',
            'imageUpload',
            'insertTable',
            'mediaEmbed',
            'Image',
            'ImageCaption',
            'ImageInsert',
            'ImageStyle',
            'ImageToolbar',
            '|',
            'undo',
            'redo',
          ],
          ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command.
            uploadUrl: `/uploads`,
          },
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(editor, data);
          setBody(data);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TextEditor;
