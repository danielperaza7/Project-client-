import React, { Component } from "react";
import Helmet from "react-helmet";

import styles from "./JSONEditor.css";

class JsonEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_click_me: true,
      jsonRendered: false,
      initializing: false
    };
    this.creatJsonEditor = this.creatJsonEditor.bind(this);
  }

  componentDidMount() {
    const { is_new, onChange } = this.props;
    if (is_new) {
      this.creatJsonEditor([], onChange);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.jsonRendered
      && !this.state.initializing
      && nextProps.modules
      && nextProps.modules.length > 0
    ) {
      const { modules, onChange } = nextProps;
      this.creatJsonEditor(modules, onChange);
    }
  }

  creatJsonEditor(modules, onChange) {
    let editor;
    // const json = modules;
    const options = {
      mode: "tree",
      modes: ["code", "form", "text", "tree", "view"], // allowed modes
      onError: (err) => {
        alert(err.toString());
      },
      onModeChange: (newMode, oldMode) => {
        console.log("Mode switched from", oldMode, "to", newMode);
      },
      // onChange: (event)=>{onChange('JSONEditor', editor.get());}
      onChange: () => {
        onChange();
      }
    };
    this.setState({ initializing: true });
    const tryStartEditor = window.setInterval(() => {
      if (window.JSONEditor && this.state.jsonRendered === false) {
        editor = new window.JSONEditor(this.refs.editor_holder, options, modules);
        if (editor) {
          this.props.saveJSONEditorInstance(editor);
          this.setState({
            jsonRendered: true,
            initializing: false
          });
        }
        clearInterval(tryStartEditor);
      }
    }, 2000);
  }

  render() {
    return (
      <div style={{ height: "calc(100% - 128px)" }}>
        <Helmet
          link={[
            {
              rel: "stylesheet",
              href:
                "https://hiddenfigure.evestemptation.com/FrontEndDependency/JsonEditor/jsoneditor.css"
              // href:"https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.7.0/jsoneditor.css"
            }
          ]}
          script={[
            {
              src:
                "https://hiddenfigure.evestemptation.com/FrontEndDependency/JsonEditor/jsoneditor.js"
              // src:"https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.7.0/jsoneditor.js"
            }
          ]}
        />
        <div className={styles.jsoneditor} ref="editor_holder" />
      </div>
    );
  }
}

export default JsonEditor;
