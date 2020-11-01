import styled, { css } from "styled-components";

export const Form = styled.form`
  margin-top: 10px;

  fieldset {
    border-radius: 4px;
    border: 1px solid #c4c4c4;
    padding: 20px;

    legend {
      font-size: 16px;
    }
  }
`;

export const Float = styled.div`
  position: absolute;
  width: 275px;
  padding: 10px;
  top: 0;
  right: -275px;
`;

export const List = styled.ul`
  width: 100%;
  list-style: none;

  li {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #c4c4c4;
    }
  }
`;

export const Boat = styled.div`
  background-color: #d4d4d4;
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border-radius: 8px;
  margin-top: 200px;
`;

export const TrashButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 10px;
  border-radius: 3px;
  transition: 0.3s;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: #dc3545;
    color: #fff;
  }
`;

export const Alert = styled.span.attrs((props) => ({}))`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px 20px 0 0;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  color: #fff;
  font-size: 15px;
  font-weight: bold;

  ${(props) => {
    switch (props.color) {
      case "danger":
        return css`
          background-color: #dc3545;
        `;
      case "sucess":
        return css`
          background-color: #28a745;
        `;
      default:
        return css`
          background-color: #007bff;
        `;
    }
  }}
`;
