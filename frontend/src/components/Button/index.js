import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
   from {
      transform: rotate(0deg);
   }

   to {
      transform: rotate(360deg);
   }

`;

const Button = styled.button.attrs((props) => ({
  disabled: props.loading,
}))`
  width: 300px;
  height: 50px;
  border: none;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 5px;
    width: 25px;
    height: 25px;
  }

  &:hover {
    filter: grayscale(0.3);
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export default Button;
