import { toolbarOptions } from './RichEditorToolbar';

// Modules configuration for ReactQuill
export const editorModules = {
  toolbar: toolbarOptions,
  clipboard: {
    matchVisual: false
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Supported formats in ReactQuill
export const editorFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'indent',
  'align',
  'link',
  'image',
  'code-block',
  'blockquote'
];
