import styled from "styled-components";

import Logo from "/public/logo.svg";
import InstagramIcon from "/public/instagram.svg";
import TiktokIcon from "/public/tiktok.svg";
import TwitterIcon from "/public/twitter.svg";

export const StyledLogo = styled(Logo)`
  width: 75px;
  height: 75px;
  fill: none;

  path {
    transition: fill 0.3s ease-in-out;
  }

  &:hover path:first-child,
  &:hover path:nth-child(3) {
    fill: #cd4631;
  }

  &:hover path:nth-child(2) {
    fill: #000;
  }
`;

export const StyledInstagramIcon = styled(InstagramIcon)`
  transition: transform 0.3s ease-in-out;

  path {
    transition: fill 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.2);
  }

  &:hover path {
    fill: #cd4631;
  }
`;

export const StyledTiktokIcon = styled(TiktokIcon)`
  transition: transform 0.3s ease-in-out;

  path {
    transition: fill 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.2);
  }

  &:hover path {
    fill: #cd4631;
  }
`;

export const StyledTwitterIcon = styled(TwitterIcon)`
  transition: transform 0.3s ease-in-out;

  path {
    transition: fill 0.3s ease-in-out;
  }

  &:hover {
    transform: scale(1.2);
  }

  &:hover path {
    fill: #cd4631;
  }
`;
