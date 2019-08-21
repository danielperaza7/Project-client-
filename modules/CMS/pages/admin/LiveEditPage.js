import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Modal, Button } from "react-bootstrap";
import SplitPane from "react-split-pane";
import _ from "lodash";
import { format, isValid } from "date-fns";
import history from "../../../../history";

// import local compnents
import InfoWithButtons from "../../adminComponents/InfoWithButtons/InfoWithButtons";
import ConfigsPanel from "../../adminComponents/ConfigsPanel/ConfigsPanel";
import JSONEditor from "../../adminComponents/JSONEditor/JSONEditor";
import LiveViewInfo from "../../adminComponents/LiveViewInfo/LiveViewInfo";
import LiveView from "../../adminComponents/LiveView/LiveView";

// import actions
import {
  fetchCMSIdContent,
  saveNewCMSIdContent,
  updateExistCMSIdContent
} from "../../CMSActions";

import styles from "./LiveEditPage.css";

class LiveEditPage extends Component {
  constructor(props) {
    super(props);
    // initialization of states
    this.state = {
      url_id: "", // id, only will update this when create new...
      modules: [], // local version, the one in reducer is always the one get from server
      meta: [],
      title: "",
      type: "page",
      effective_start: "",
      effective_end: "",
      comment: "",
      public: null,
      tags: [],

      view_mode: "both", // 'both', 'left', 'right'
      is_new: !this.props.location.query.id,
      is_dirty: false,
      dirty_keys: [],
      show_modal: false,
      modal_msg: "",
      try_leave: false,
      EditorInstance: null,
      live_view_mode: "custom", // 'default': 100%, 'custom', 'mobile', 'pad','desktop'
      live_view_width: 375,
      live_view_height: 677,
      live_view_wrapper_width: null, // measure width using resize event listener

      configCollapsed: false
    };
    this.handleFetchCMSIdContentResponse = this.handleFetchCMSIdContentResponse.bind(
      this
    ); // bind this you could try comment this line to what will happen...
    this.handleConfigInputChange = this.handleConfigInputChange.bind(this);
    this.goBackToList = this.goBackToList.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveResponse = this.handleSaveResponse.bind(this);
    this.handleJSONEditorContentChange = this.handleJSONEditorContentChange.bind(this);
    this.handleSetIframeDimensions = this.handleSetIframeDimensions.bind(this);
    this.handleLiveViewSelect = this.handleLiveViewSelect.bind(this);
    this.saveJSONEditorInstance = this.saveJSONEditorInstance.bind(this);
  }

  componentDidMount() {
    // 1. get cms_id from url, this.props.location....
    const cms_id = this.props.location.query.id;

    // 2. if cms_id from url exists, set is_new false. vice versa
    if (cms_id) {
      const params = {
        id: cms_id,
        country: "us",
        lan: "en"
      };
      this.setState({
        url_id: cms_id
      });
      this.props.dispatch(
        fetchCMSIdContent(params, "admin", this.handleFetchCMSIdContentResponse)
      );
    } else {
      this.setState({
        is_new: true,
        dirty_keys: ["type"]
      });
    }
  }

  getFormattedTime(str) {
    if (isValid(str)) {
      return format(str, "YYYY-MM-DD HH:mm");
    }
    return "";
  }

  handleFetchCMSIdContentResponse(err, data) {
    // if err show message in a modal
    console.log("handleFetchCMSIdContentResponse called");
    if (err) {
      console.log("err");
    } else {
      // initialize local copy ...
      console.log("moment / date-fns");
      this.getFormattedTime(data.effective_start);
      // console.log('effective_start', this.getFormattedTime(data.effective_start));
      // console.log('effective_end', this.getFormattedTime(data.effective_end));
      this.setState({
        is_new: false,

        url_id: data.url,
        modules: data.modules,
        meta: data.meta,
        title: data.title,
        type: data.type,
        effective_start: this.getFormattedTime(data.effective_start),
        effective_end: this.getFormattedTime(data.effective_end),
        comment: data.comment,
        public: data.public,
        tags: data.tags
      });
    }
    // if no err, save cms_id_content in local
    // console.log('save data');
    // console.log(data);
    // this.setState({local_cms_id_content:data})//, ()=>{console.log(this.state);});
  }

  handleConfigInputChange(key, content, flag) {
    // update local version of configs
    if (flag === "META") {
      console.log("META InputChange");
      const newMeta = JSON.parse(JSON.stringify(this.state.meta));
      const index = _.findIndex(newMeta, { name: key });
      if (index > -1) {
        newMeta.splice(index, 1, { name: key, content });
      } else {
        newMeta.push({ name: key, content });
      }
      this.setState({
        meta: newMeta,
        is_dirty: true
      });
      // update dirty_keys
      this.addDirtyElement("meta");
    } else {
      // update dirty_keys
      this.addDirtyElement(key);
      this.setState({
        [key]: content,
        is_dirty: true
      });
    }
  }

  handleJSONEditorContentChange() {
    console.log("handleJSONEditorContentChange called");
    // update local modules,
    const newModules = this.state.EditorInstance.get();
    // console.log('handleJSONEditorContentChange modules', newModules);
    // if modules is not in dirty_keys, add it in
    this.addDirtyElement("modules");
    this.setState({
      modules: newModules,
      is_dirty: true
    });
  }

  handleSetIframeDimensions(width, height) {
    this.setState({
      live_view_width: width,
      live_view_height: height
    });
  }

  handleLiveViewSelect(mode) {
    switch (mode) {
      case "phone":
        console.log("phone case ");
        this.setState({
          live_view_width: 375,
          live_view_height: 667,
          live_view_mode: mode
        });
        break;
      case "pad":
        this.setState({
          live_view_width: 768,
          live_view_height: 1024,
          live_view_mode: mode
        });
        break;
      case "desktop":
        this.setState({
          live_view_width: 1200,
          live_view_height: 768,
          live_view_mode: mode
        });
        break;
      default:
        this.setState({
          live_view_mode: mode
        });
        break;
    }
  }

  handleSave() {
    if (!this.state.is_dirty) {
      // nothing changed, no actions
      this.setState({
        show_modal: true,
        modal_msg: " Nothing changed "
      });
      return;
    }
    const configs = {
      id: this.state.url_id,
      country: "us",
      lan: "en"
    };

    // get data according to dirty_keys
    const data = {};
    this.state.dirty_keys.map((key) => {
      if (key === "modules") {
        data[key] = this.state.EditorInstance.get();
      } else if (key === "effective_start" || key === "effective_end") {
        // validate date in dirty_keys
        if (!moment(this.state[key]).isValid()) {
          this.setState({
            show_modal: true,
            modal_msg: `${key}, not a time format`
          });
        } else {
          data[key] = moment(this.state[key]).utcOffset(120);
        }
      } else {
        data[key] = this.state[key];
      }
    });

    if (this.state.is_new) {
      if (this.state.url_id != null && this.state.url_id !== "") {
        // should validate this.state.url_id strictly
        // saveNewCMSIdContent call action
        console.log(" will create cms id content", configs, data);
        // this.setState({
        //   show_modal:true,
        //   modal_msg:`You are going to save new, but this function is not finished yet, you can check configs and data in console`,
        // })
        // return ;
        this.props.dispatch(saveNewCMSIdContent(configs, data, this.handleSaveResponse));
      } else {
        // remind user to input a valid id
        this.setState({ show_modal: true, modal_msg: "please input a valid cms id!" });
      }
    } else {
      // updateExistCMSIdContent call action
      console.log(" will update cms id content", configs, data);
      // this.setState({
      //   show_modal:true,
      //   modal_msg:`You are going to update this one, but this function is not finished yet, you can check configs and data in console`,
      // })
      this.props.dispatch(
        updateExistCMSIdContent(configs, data, this.handleSaveResponse)
      );
    }
  }

  handleSaveResponse(err, msg) {
    if (err) {
      this.setState({
        show_modal: true,
        modal_msg: msg
      });
    } else {
      this.refs.live_view.refs.live_iframe.contentWindow.location.reload();
      this.setState({
        show_modal: true,
        modal_msg: msg,
        is_dirty: false
      });
    }
  }

  addDirtyElement(ele) {
    const newDirtyKeys = this.state.dirty_keys;
    let needUpdate = true;
    for (let i = 0; i < newDirtyKeys.length; i++) {
      if (newDirtyKeys[i] === ele) {
        needUpdate = false;
      }
    }
    if (needUpdate) {
      newDirtyKeys.push(ele);
      this.setState({
        dirty_keys: newDirtyKeys
      });
    }
  }

  saveJSONEditorInstance(instance) {
    this.setState({
      EditorInstance: instance
    });
  }

  goBackToList() {
    if (this.state.is_dirty) {
      this.setState({
        show_modal: true,
        modal_msg: "Changes not saved!",
        try_leave: true
      }); // if user still want to quit? discard changes
    } else {
      history.push("/cms/admin/"); // remind user, Something not saved yet
    }
  }

  render() {
    // console.log('render cms_data', cms_data);// correct

    // I suggest prepare props for each component here
    const InfoWithButtonsProps = {
      url_id: this.state.url_id, // edit exist, data comes from this.props, create new, data comes fron this.state
      country: "us", // should from CMS reducer
      lan: "en", // should from CMS reducer
      is_new: this.state.is_new,
      type: this.state.type,
      handleSave: this.handleSave, // function, action in CMSActions
      goBackToList: this.goBackToList, // function, use history push to some route
      handleConfigInputChange: this.handleConfigInputChange
    };

    const ConfigsPanelProps = {
      title: this.state.title,
      type: this.state.type,
      meta: this.state.meta,
      effective_start: this.state.effective_start,
      effective_end: this.state.effective_end,
      comment: this.state.comment,
      handleConfigInputChange: this.handleConfigInputChange,
      public: this.state.public,
      tags: this.state.tags
    };
    //
    const JSONEditorProps = {
      modules: this.state.modules,
      onChange: this.handleJSONEditorContentChange,
      saveJSONEditorInstance: this.saveJSONEditorInstance,
      is_new: this.state.is_new
    };
    //
    const LiveViewProps = {
      modules: this.state.modules,
      meta: null,
      title: null,
      url_id: this.state.url_id,
      is_new: this.state.is_new,

      mode: this.state.live_view_mode,
      width: this.state.live_view_width, // 375,
      height: this.state.live_view_height,
      wrapperWidth: this.state.live_view_wrapper_width // : null // measure width using resize event listener
    };

    const LiveViewInfoProps = {
      handleSetIframeDimensions: this.handleSetIframeDimensions,
      handleLiveViewSelect: this.handleLiveViewSelect,

      mode: this.state.live_view_mode,
      width: this.state.live_view_width, // 375,
      height: this.state.live_view_height,
      wrapperWidth: this.state.live_view_wrapper_width // : null // measure width using resize event listener
    };
    const { configCollapsed } = this.state;

    return (
      <div style={{ marginTop: "-15px" }}>
        <SplitPane
          className={styles["split-pane"]}
          split="vertical"
          minSize={5}
          defaultSize={
            this.state.view_mode == "both"
              ? "50%"
              : this.state.view_mode == "left"
                ? "100%"
                : "0%"
          }
        >
          <div
            className={styles["inside-pane"]}
            style={{ display: this.state.view_mode == "right" ? "none" : "" }}
          >
            {" "}
            {/* left panel */}
            <Col className={styles.columns}>
              {" "}
              {/* content */}
              <div>
                <InfoWithButtons {...InfoWithButtonsProps} />
              </div>
              <div>
                <Button
                  onClick={() => {
                    this.setState({ configCollapsed: !this.state.configCollapsed });
                  }}
                  bsSize="small"
                >
                  {configCollapsed ? "Show form" : "Hide form"}
                </Button>
                {configCollapsed ? null : (
                  <ConfigsPanel newState={this.state.is_new} {...ConfigsPanelProps} />
                )}
              </div>
              <JSONEditor {...JSONEditorProps} />
            </Col>
            <Col className={styles["columns-button-left"]}>
              {/* narrow column for change mode */}
              <button
                onClick={() => {
                  if (this.state.view_mode == "both") {
                    this.setState({ view_mode: "right" });
                  } else {
                    this.setState({ view_mode: "both" });
                  }
                }}
              >
                {" "}
                {"<"}
              </button>
            </Col>
          </div>

          <div
            className={styles["inside-pane"]}
            style={{ display: this.state.view_mode == "left" ? "none" : "" }}
          >
            {/* right panel */}
            <Col className={styles["columns-button-right"]}>
              {/* narrow column for change mode */}
              <button
                onClick={() => {
                  if (this.state.view_mode == "both") {
                    this.setState({ view_mode: "left" });
                  } else {
                    this.setState({ view_mode: "both" });
                  }
                }}
              >
                {" "}
                {">"}
              </button>
            </Col>
            <Col className={styles.columns}>
              {/* content */}
              <div>{<LiveViewInfo {...LiveViewInfoProps} />}</div>
              <div id="right-panel" className={styles.liveViewWrapper}>
                {<LiveView {...LiveViewProps} ref="live_view" />}
              </div>
            </Col>
          </div>
        </SplitPane>
        <div>
          <Modal
            show={this.state.show_modal}
            onHide={() => {
              this.close;
              this.setState({ show_modal: false, try_leave: false });
            }}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Hi, there</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modal_msg}</Modal.Body>
            <Modal.Footer>
              {this.state.try_leave ? (
                <Button
                  onClick={() => {
                    this.close;
                    this.setState({ show_modal: false });
                    history.push("/cms/admin/");
                  }}
                >
                  {" "}
                  Discard and Leave
                </Button>
              ) : null}
              <Button
                onClick={() => {
                  this.close;
                  this.setState({
                    show_modal: false,
                    try_leave: false // reset anyway
                  });
                }}
              >
                {" "}
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect()(LiveEditPage);
