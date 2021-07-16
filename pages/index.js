import {React, useState, useEffect} from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';




function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


function ProfileRelationsBox ({
  Titulo,
  Array
}) {
  return (

    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{Titulo} ({Array.length})</h2>
      <ul>
        {Array.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/seguidores/${itemAtual.title}`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })
        }
      </ul>
  </ProfileRelationsBoxWrapper>

  )
}


export default function Home(props) {

  const usuarioAleatorio = props.githubUser;
  
  
  const TOKEN_DATOCMS = process.env.NEXT_PUBLIC_TOKEN_READ_ONLY;

  const [comunidades, setComunidades] = useState([]);
  const [seguidores, setSeguidores]   = useState([]);
  
  useEffect(() => {
    // GET
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    });

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': TOKEN_DATOCMS,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })


  }, []);
  
/*
  const [comunidades, setComunidades] = useState([{
    id: '12802378123789378912789789123896123', 
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  */
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];

  //console.log('Nosso teste', );
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]


  function handleCriaComunidade(event) {
    
    event.preventDefault();
    const dadosDoForm = new FormData(event.target);

    console.log('Campo: ', dadosDoForm.get('title'));
    console.log('Campo: ', dadosDoForm.get('image'));

    const comunidade = {
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
      creatorSlug: usuarioAleatorio
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
    .then(async (response) => {
      const dados = await response.json();
      
      console.log(dados.registroCriado);
      const comunidade = dados.registroCriado;
      
      const comunidadesAtualizadas = [...comunidades, comunidade];
      setComunidades(comunidadesAtualizadas);
    })

}



  return (
    <>
      
      <AlurakutMenu githubUser ={usuarioAleatorio} />
      
      <MainGrid>
        
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
         
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            
            <form onSubmit={handleCriaComunidade}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>

          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox 
            Titulo = 'Seguidores'
            Array = {seguidores}
          />     

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.title}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
    </>
  )
}


export async function getServerSideProps(context) {

  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  }).then((resposta) => resposta.json())

  console.log(isAuthenticated);

  if(!isAuthenticated) {
    
    return {
      
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 