
const MainGrid = styled.main`
display: grid;
grid-gap: 10px;
padding: 16px;

//fr - Pegar o resto do que sobrou
@media(min-width: 860px){
  grid-template-areas: "profileArea welcomeArea profileRelationsArea"; 
  grid-template-columns: 160px 1fr 312px;
}



`;