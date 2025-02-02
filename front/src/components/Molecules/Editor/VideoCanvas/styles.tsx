import styled from "styled-components";

export const CanvasContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  canvas {
    position: absolute;
    background-color: transparent;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
`