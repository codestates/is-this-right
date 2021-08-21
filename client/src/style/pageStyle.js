import styled from 'styled-components';

export const BodyAreaStyle = styled.div`
  min-height: 100vh;
  width: 100%;
  min-width: 100vw;
  display: flex;
  justify-content: center;
`;

export const ContainerStlye = styled.div`
  width: 62vw;
  max-width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  /* background-color: red; */
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;
