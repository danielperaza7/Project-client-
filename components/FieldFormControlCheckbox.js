/**
 * Created by warrenchen on 4/11/17.
 */
import React, { Component } from "react";

import styles from "./FieldFormControlCheckbox.css";

class FieldFormControlCheckbox extends Component {
  render() {
    const {
      input,
      title,
      label,
      id
      /* placeholder,
      type,
      bsClass,
      checked,
      disabled, */
    } = this.props;

    return (
      <div className={styles["check-box"]}>
        <label htmlFor={id || label}>
          <input id={id || label} type="checkbox" {...input} checked={input.value} />
          <span className={styles.outer}>
            <div className={styles.inner}>
              <img
                src="https://hiddenfigure.evestemptation.com/email/Component/checkedcheckbox_black.svg"
                alt="Chat Pic"
              />
            </div>
          </span>
          <label className={styles.title}>{title}</label>
        </label>
      </div>
    );
  }
}

export default FieldFormControlCheckbox;

/*

 <Checkbox
 bsClass={bsClass}
 type={type}
 placeholder={placeholder}
 value={input.value}
 onChange={input.onChange}
 checked={checked}
 disabled={disabled}
 >
 {title}
 </Checkbox>

 */

// render () {
//
//   const { input, bsClass, title } = this.props;
//
//   return (
//     <div className={`checkbox ${bsClass}`}>
//       <input id="checkbox7" className="styled" type="checkbox" {...input} />
//       <label htmlFor="checkbox7">
//         {title}
//       </label>
//     </div>
//   );
// }

// render () {
//   const { placeholder, type, input, bsClass, title, checked, disabled} = this.props;
//
//   return (
//     <Checkbox
//       bsClass={bsClass}
//       type={type}
//       placeholder={placeholder}
//       value={input.value}
//       onChange={input.onChange}
//       checked={checked}
//       disabled={disabled}
//     >
//       {title}
//     </Checkbox>
//   );
// }
