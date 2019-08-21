import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const NewArrivalsMobileInfo = {
  id: "New_Arrivals_Mobile",
  description: "new arrivals component on mobile menu",
  props: {
    NEWARRIVALS: {
      see_all_new: {
        image_url: {
          xl:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
          lg:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
          md:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          sm:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
          xs:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
        },
        link: {
          path: "product/h123456",
          click: true,
          url: null
        },
        description: "Eve by Eve's Skincare",
        title: "Eve by Eve's Skincare"
      }
    }
  },
  responsive: {
    xl: false,
    lg: false,
    md: false,
    sm: false,
    xs: true
  }
};

class NewArrivalsMobile extends Component {
  render() {
    if (!this.props) return null;
    const para = this.props.NEWARRIVALS;

    return (
      <div>
        <Link to={para.see_all_new.link ? para.see_all_new.link.path : null}>
          <div style={{ marginBottom: "20px" }}>
            <img
              src={para.see_all_new.image_url ? para.see_all_new.image_url.xs : null}
              alt={para.title}
              title={para.title}
              width={210}
              height={112}
            />
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(null)(NewArrivalsMobile);
