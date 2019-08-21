import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import createComponentFromTagProp from "react-create-component-from-tag-prop";

const TextFromTagProp = createComponentFromTagProp({
  tag: "p",
  prop: "as",
  propsToOmit: ["size", "bold", "italic", "center"],
});

const StyledComponent = styled(TextFromTagProp)`
  font-size: ${({ size }) => (size && `${size}px`) || "12px"};
  font-weight: ${({ bold }) => (bold && "bold") || "normal"};
  font-style: ${({ italic }) => (italic && "italic") || "normal"};
  color: ${({ color }) => (color && `${color}`) || "black"};
`;

StyledComponent.propTypes = {
  as: PropTypes.oneOf(["p", "span", "label", "h1", "h2", "h3", "h4", "h5", "h6"]),
  size: PropTypes.number,
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  color: PropTypes.string,
};

export default StyledComponent;
