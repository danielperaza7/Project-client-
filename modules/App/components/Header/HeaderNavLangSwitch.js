/**
 * Created by chris on 3/31/17.
 */

import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
import styles from "./Header.css";

export default class HeaderNavLangSwitch extends Component {
  render() {
    return (
      <div>
        <div>
          <Col>
            <h5>Please select your location and language:</h5>
          </Col>
          <Col>
            <h5>
              Be ad At that point, there should be no actively-being-used vnodes since all
              * processes other than pageoutd will have exited.
            </h5>
          </Col>
        </div>
        <div>
          <Col>
            <i className="ion-earth" />
            {" "}
Store:
            <i classID={styles["header-nav-lang"]} className="ion-chevron-down" />
          </Col>
          <Col xsOffset={1}>
            {
              <form>
                <input type="radio" name="location" value="North America" checked />
                {" "}
North
                America
                <br />
                <input type="radio" name="location" value="China" />
                {" "}
China
                <br />
                <input type="radio" name="location" value="Others" />
                {" "}
Others
              </form>
            }
          </Col>
        </div>

        <div>
          <Col xsOffset={1}>
            <i className="ion-chatbubbles" />
            {" "}
Language:
            <i classID={styles["header-nav-lang"]} className="ion-chevron-down" />
          </Col>
          <Col xsOffset={1}>
            {
              <form>
                <input type="radio" name="location" value="English" checked />
                {" "}
English
                <br />
                <input type="radio" name="location" value="Chinese" />
                {" "}
Chinese
                <br />
                <input type="radio" name="location" value="Others" />
                {" "}
Others
              </form>
            }
          </Col>
        </div>

        <div>
          <Col>
            <Button>Switch</Button>
          </Col>
        </div>
      </div>
    );
  }
}
