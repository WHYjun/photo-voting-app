import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
  ${reset};
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family:-apple-system, BlinkMacSystemFont, 'SegoeUI', Roboto;
    font-size: 14px;
    background-color: rgba(20,20,20,1);
    color: white;
    padding-top: 50px;
  }
  form {
    padding-top: 10px;
    margin: 10px;
  }
`;

export default globalStyles;
