import styled, { css } from "styled-components";

export const Container = styled.div(
  () => css`
    position: relative;
    border-radius: 8px;
    width: 400px;
    margin: auto;
    background: #f3f3f3;
    margin-top: 20px;
    padding: 20px 0;
    box-shadow: 1px 1px 0px #f7f7f7, 2px 2px 0px #999, 3px 3px 0px #999, 4px 4px 0px #d4d4d4, 5px 5px 0px #999, 6px 6px 0px #999;
  `
);

export const Pieces = styled.div(
  () => css`
    display: inline-block;
    position: relative;
    overflow: hidden;

    :hover {
      background-color: #cce5ff;
      cursor: pointer;
    }
  `
);

export const Color = styled.div(
  () => css`
    display: inline-block;
    height: 26px;
    width: 23px;
    cursor: pointer;

    [color="#FFFFFF"] {
      border: 1px solid #ccc;
    }
  `
);

export const None = styled.div(
  () => css`
    opacity: 0.2;
    font-size: 11px;
    position: absolute;
    top: 20px;
    left: 9px;
  `
);

export const StyledAvatar = styled.div(
  () => css`
    display: block;
    width: 315px;
    height: 235px;
    padding-left: 20px;
  `
);

export const Tab = styled.div(
  () => css`
    font-size: 12px;
    text-align: center;
    border: 1px solid transparent;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    color: #007bff;

    ${({ selectedTab, type }) =>
      selectedTab === type &&
      css`
        background: #007bff;
        color: white;
      `}
  `
);

export const Tabpane = styled.div(
  () => css`
    box-sizing: border-box;
    display: none;
    width: 400px;
    padding: 0 10px 10px;
    ${({ selectedTab, type }) =>
      selectedTab === type &&
      css`
        display: flex;
        align-items: center;
        justify-items: center;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
      `}
  `
);
export const DownloadRow = styled.div(
  () => css`
    text-align: center;
  `
);

export const Tabs = styled.div(
  () => css`
    box-sizing: border-box;
    display: block;
    position: absolute;
    right: 50px;
    top: 8px;
    width: 100px;
  `
);
export const ColorContainer = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-items: center;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  `
);

export const Tabpanes = styled.div(
  () => css`
    box-sizing: border-box;
    display: inline-block;
    width: 400px;
  `
);

export const Button = styled.button(
  () => css`
    border-radius: 7px;
    color: #e6e6ee;
    background-color: #001f3f;
    border: 1px solid transparent;
    padding: 5px 7px;
    font-size: 20px;
    letter-spacing: 0.6px;
    margin: 0 5px;
    cursor: s-resize;
    :active {
      cursor: progress;
    }
    :hover {
      text-decoration: none;
      color: #fff;
    }
    > svg {
      fill: #e6e6ee;
      height: 20px;
    }
    > svg:hover {
      color: #fff;
    }
  `
);
