import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
   }

   html, body, #root {
    min-height: 100%;
   }

   body {
    background: whitesmoke;
    -webkit-font-smoothing: antialiased !important;
   }

   body, input, button {
    color: #333;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
   }

  button {
    cursor: pointer;
  }

  .b {
    background-color: #007bff;
  }

  .g {
    background-color: #28a745;
  }

`;
