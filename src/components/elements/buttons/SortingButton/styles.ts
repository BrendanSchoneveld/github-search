import styled from "styled-components";

export const StyledSortingButton = styled.button`
  background: #FFC917;
  border: 1px solid #003082;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover, &:focus {
    background: #dcb213;
  }

  span {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }

  .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
`
