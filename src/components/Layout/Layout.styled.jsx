import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  display: flex;
`;

export const MenuLink = styled(NavLink)`
  position: relative;
  padding: 16px;
  font-weight: 500;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  &.active {
    color: #24a3ff;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 3px;
      background-color: #24a3ff;
    }
  }
`;

export const LeftLink = styled(MenuLink)`
  margin-right: auto;
`;
