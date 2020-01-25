import styled from 'styled-components'

export default styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 5vh;
  bottom: 0px;
  background: #7e0000;
  border-top: 1px solid #ffdc61;

  .sound-view {
      display: flex;
      height: 50%;
      margin: 0 1vw;

      .volume-slider {
          background-color: blue;
          display: none;
          height: 20px;
          width: 200px;
      }
  }
`