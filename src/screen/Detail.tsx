import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCharacter } from "../api";
import { useQuery } from '@tanstack/react-query';

const Container = styled.div`
  background-color: #a3cbf3;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Madimi One", sans-serif;

  `;
const CharacterBox = styled.div`
  background-color: #6ba4eb;
  width: 38%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 10px 50px;
  border-radius: 10px;
  box-shadow: 22px 12px 38px -8px rgba(0,0,0,0.4);
`;
const Title = styled.h1`
  font-size: 48px;
  color: #eef7fa;
  margin: 10px 0;
  text-shadow: 6px 0px 5px rgba(0,0,0,0.07);
`;

const Loader = styled.span`
  text-align: center;
`;

const CharacterImage = styled.img`
  width: 30vh;
  height: 25vh;
  obejct-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  margin-top: 10px;
  filter: drop-shadow(3px 3px 15px rgba(0,0,0,0.4));
  }
`
const ProjectList = styled.div`
  width: 45%;
  text-align: center;
`
const Project = styled.div`
  background-color: white;
  color: black;
  font-size: 20px;
  display: inline-block;
  margin: 3px 5px;
  padding: 5px 2px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  box-shadow: 10px 10px 38px -8px rgba(0,0,0,0.4);
  }
`
const BtnBack = styled.button`
  background: inherit; 
  border:none; 
  box-shadow:none;
  border-radius:0;
  padding:10px;
  overflow:visible;
  cursor:pointer;
  color: #eef7fa;
  font-size: 25px;
  margin-bottom: 10px;
  transition: color 0.2s ease-in;
  &:hover{
    color: #09347c;
  }
`


interface dataInfo  {
  id: number;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}



export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate()


  const { isLoading, data, error } = useQuery<dataInfo[]>({
    queryKey: ["charInfo", id],
    queryFn: fetchCharacter
  }) 

  if (isLoading || !data) {
    return <Loader>Loading..</Loader>;
  }
  
  if(error) return <div>Sorry</div>

  console.log("캐릭터 정보", data);

  const onClick = () => {
    navigate(-1);
  }


  return (
    <Container>
      <CharacterBox>
      <BtnBack onClick={onClick}>&larr;</BtnBack>
        <CharacterImage src={data.imageUrl}></CharacterImage>
        <Title>{data?.name}</Title>
      <ProjectList>
        {data.films.map((project: string, index: number) => (
          <Project key={index}>{project}</Project>
          ))}
      </ProjectList>
          </CharacterBox>
    </Container>
  );
}
