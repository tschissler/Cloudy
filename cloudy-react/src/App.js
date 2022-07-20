import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useRef } from 'react';

import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import ButtonGroup, { Item as ButtonItem } from 'devextreme-react/button-group';
import { markup } from './data.js';

import 'devextreme/ui/html_editor/converters/markdown';

const defaultSelectedItemKeys = ['Html'];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.htmlEditorRef = React.createRef();

    this.state = {
      valueContent: markup,
      editorValueType: 'html',
    };

    this.valueChanged = this.valueChanged.bind(this);
    this.valueTypeChanged = this.valueTypeChanged.bind(this);

    this.toolbarButtonOptions = {
      text: 'Test',
      stylingMode: 'text',
      onClick: this.customButtonClick.bind(this),
    };
  }

  get htmlEditor() {
      return this.htmlEditorRef.current.instance;
  }

  onInitialized(e) {
        // const htmlEditor = e.component;
        // const list = htmlEditor.get('formats/list');
        // class ExtendedList extends list {
        //     // Overrides the method that creates a DOM node for the formatted text
        //     static create(value) {
        //         // Creates a DOM node using the parent's implementation
        //         const node = super.create(value);
        //         // node.setAttribute('id', 'test');
        //         // node.setAttribute('references', '[]');
        //         return node;
        //     }

        //     static formats(domNode) {
        //       return ATTRIBUTES.reduce((formats, attribute) => {
        //         if (domNode.hasAttribute(attribute)) {
        //           formats[attribute] = domNode.getAttribute(attribute);
        //         }
        //         return formats;
        //       }, {});
        //     }

        //     static id(domNode) {
        //       return domNode.getAttribute('id');
        //     }
        // }
        // // Replaces the built-in `strike` format
        // htmlEditor.register({
        //     'formats/list': ExtendedList
        // });

        
    }

  render() {
    const { valueContent, editorValueType } = this.state;

    return (
      <div className="widget-container">
        <HtmlEditor
          height={300}
          defaultValue={valueContent}
          valueType={editorValueType}
          onValueChanged={this.valueChanged}
          onInitialized={this.onInitialized}
          ref={this.htmlEditorRef}
        >
          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item name="bulletList" />
            <Item
              widget="dxButton"
              options={this.toolbarButtonOptions}
            />
          </Toolbar>
        </HtmlEditor>

        <div className="options">
          <ButtonGroup
            onSelectionChanged={this.valueTypeChanged}
            defaultSelectedItemKeys={defaultSelectedItemKeys}
          >
            <ButtonItem text="Html" />
            <ButtonItem text="Markdown" />
          </ButtonGroup>
          <div className="value-content">
            {valueContent}
          </div>
        </div>
      </div>
    );
  }

  valueChanged(e) {
    this.setState({
      valueContent: e.value,
    });
  }

  valueTypeChanged(e) {
    this.setState({
      editorValueType: e.addedItems[0].text.toLowerCase(),
    });
  }

    componentDidMount() {
      let list = this.htmlEditor.get("formats/list");
      list.

      this.htmlEditor.register({ "formats/bold": Bold });
  }

  customButtonClick(e) {
    console.log(this.htmlEditor);
    var selectedElems = this.htmlEditor.getSelection();
    console.log(selectedElems);
    for (var i = 0; i < selectedElems.length; i++) {  
      console.log(selectedElems[i]);
      document.getElementById(selectedElems[i]).setAttribute("style", "font-weight: bold");  
      // if (selectedElems[i].attribute == null) {  
      //     document.getElementById(selectedElems[i]).wrap("<span></span>")  
      //     selectedElems = this.htmlEditor.getSelection();  
      //     document.getElementById(selectedElems[i]).attr("style", "font-weight: bold");  
      // }  
      //this.htmlEditor.SaveToUndoHistory();  
  }   
    
  }
}

export default App;
