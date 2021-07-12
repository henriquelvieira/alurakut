import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Box = styled.div`
  background: #fff;
  border-radius: 8px;
`;


export default function Home() {
  return (
    
    <MainGrid>
      
      <div className="profileArea" styled={{ gridArea: 'profileArea'}}>
        <Box>Imagem</Box>
      </div>
      
      <div className="welcomeArea" styled={{ gridArea: 'welcomeArea'}}>
        <Box>Bem vindo</Box>
      </div>      
      
      <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea'}}>
        <Box>Comunidades</Box>
        <Box>Comunidades</Box>
      </div>

    </MainGrid>
  )
}
