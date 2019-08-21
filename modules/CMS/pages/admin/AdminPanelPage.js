import React, { Component } from "react";
import { connect, batch } from "react-redux";
import { Button, Table } from "react-bootstrap";
import history from "../../../../history";

import Header from "../../adminComponents/Header/Header";
import DoArchivePanel from "../../adminComponents/DoArchivePanel/DoArchivePanel";
import ListWrapper from "../../adminComponents/CMSIDList/ListWrapper";

import styles from "./AdminPanelPage.css";

import { fetchCMSList, CMSAdminLogout, archiveCMSIdContent } from "../../CMSActions";

// import getters
import { getCMSList, getCMSArchivedList, getCMSUser } from "../../CMSReducer";

class AdminPanelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "US",
      lan: "en",
      archived: false
    };
    this.logout = this.logout.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  componentWillMount() {
    batch(() => {
      this.props.dispatch(fetchCMSList({ country: "us", lan: "en", archived: false }));
      this.props.dispatch(fetchCMSList({ country: "us", lan: "en", archived: true }));
    });
  }

  toggleList(type) {
    this.setState({ archived: type === "archived" });
  }

  logout() {
    this.props.dispatch(CMSAdminLogout());
  }

  render() {
    const { cms_list, archived_list, username } = this.props;
    if (!cms_list) {
      return <div>Loading List</div>;
    }

    return (
      <div>
        <Header username={username} logout={this.logout} toggleList={this.toggleList} />
        <div className="container">
          <div className={styles["options-header"]}>
            Country: United States , Language: English
          </div>
          <div className="content">
            <div className={styles["action-bar"]}>
              {this.state.archived ? (
                <Button
                  bsStyle="success"
                  onClick={() => {
                    this.toggleList("admin");
                  }}
                >
                  Go back to admin list
                </Button>
              ) : (
                <Button
                  bsStyle="success"
                  onClick={() => {
                    history.push("/cms/admin/liveedit");
                  }}
                >
                  New
                </Button>
              )}
            </div>
            <ListWrapper cms_list={this.state.archived ? archived_list : cms_list} />
          </div>
        </div>
        {this.state.archived ? (
          ""
        ) : (
          <DoArchivePanel
            cms_ids={cms_list
              .filter((ele) => {
                return ele.type === "block" || ele.public === false;
              })
              .sort()}
            username={username}
            archiveCMSIdContent={(params, cb) => batch(() => {
              this.props.dispatch(
                archiveCMSIdContent(params, () => batch(() => {
                  this.props.dispatch(
                    fetchCMSList({ country: "us", lan: "en", archived: false })
                  );
                  this.props.dispatch(
                    fetchCMSList({ country: "us", lan: "en", archived: true })
                  );
                  cb();
                }))
              );
            })}
          />
        )}
      </div>
    );
  }
}
function mapStateToProps(store) {
  return {
    cms_list: getCMSList(store),
    archived_list: getCMSArchivedList(store),
    username: getCMSUser(store)
  };
}
export default connect(mapStateToProps)(AdminPanelPage);
