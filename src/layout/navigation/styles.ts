import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NavigationLink = styled(NavLink)<{ isActive: boolean }>`
    padding: 8px 16px;
    margin: 0 16px;
    color: white;
    background: ${(({isActive}) => isActive ? '#003082' : '#0063D3')} ;
    border-radius: 32px;
    text-decoration: none;
  
  &:hover, &:focus {
    background: #003082;
  }
`
