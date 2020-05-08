import styled from 'styled-components';

export const Controller = styled.div`
height: auto;
margin: 5px 35px 25px 35px;
border-radius: 15px;
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
background: white;
padding: 20px;
text-align: center;

.player-cards {
  display: flex;
  justify-content: center;
}

h3 {
  font-weight: 300;
}

`;

export const AdminSettings = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  vertical-align: middle;

  h2 {
    font-weight: 300;
    font-size: 20px;
  }

`;

export const PlayerSettings = styled.div`
height: 100%;
width: 100%;

display: flex;
flex-direction: column;
align-items: center;
vertical-align: middle;
justify-content: center;

`;
