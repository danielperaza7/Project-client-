import React, { Component } from "react";
import marked from "marked";
import styles from "./FinalSale.css";

class FinalSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.toggleDescription = this.toggleDescription.bind(this);
  }

  toggleDescription() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { description } = this.props;

    const getMarkdownText = (src) => {
      const rawMarkup = marked(src);
      return { __html: rawMarkup };
    };

    const descriptionCard = (
      <div className={styles.description}>
        <span dangerouslySetInnerHTML={getMarkdownText(description)} />
        <i className="ion-close" onClick={this.toggleDescription} />
      </div>
    );

    return (
      <div className={styles.finalSale}>
        <span className={styles.finalSaleBtn} onClick={this.toggleDescription}>
          {" "}
          Final Sale, No Returns
          {" "}
          <i className="ion-help-circled" />
          {" "}
        </span>
        {this.state.open ? descriptionCard : null}
      </div>
    );
  }
}

export default FinalSale;
