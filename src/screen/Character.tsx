import { useQuery } from "@tanstack/react-query";
import { fetchCharacterList } from '../api';
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  background-color: #abd3f3;
  font-family: "Madimi One", sans-serif;
`;

const MickeyImage = styled.img`
  width: 70px;
  height: 70px;
  transform: rotate(-10deg);
  &:last-child{
    transform: rotate(10deg);
  }
`

const Header = styled.header`
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 48px;
  color: #6ba4eb;
  text-align:center;
  text-shadow: 6px 0px 5px rgba(0,0,0,0.07);
  z-index: 1000;
`;
const CharacterListBox = styled.div`
  display: grid;
  width: 68%;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;
const CharacterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1e272e;
  font-size: 20px;
  text-shadow: 6px 0px 5px rgba(0,0,0,0.07);
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  max-width: 300px;
  transition: background-color 0.1s ease-in;
  a {
    text-decoration: none;
    color: white;
    transition: color 0.1s ease-in;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
      color: #09347c;
    }
  }
`;

const Loader = styled.span`
  text-align: center;
`;

const Img = styled.img`
  margin-bottom: 10px;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  &:hover{
    filter: drop-shadow(3px 3px 15px rgba(0,0,0,0.4));
  }
`; 

interface CharsInfoData {
  id: number;
  name: string;
  imageUrl: string;
}

export default function Character() {

  const { isLoading, data } = useQuery<CharsInfoData[]>({
    queryKey: ["allCharacters"],
    queryFn: fetchCharacterList,
    select: data => data.slice(0,100)
  })


  return (
    <Container>
       <Header>
        <MickeyImage src={"https://i.pinimg.com/564x/bf/cb/fc/bfcbfc2acd4692272aa09b158d54692e.jpg"}/>
        <Title>Disney Characters</Title>
        <MickeyImage src={"https://i.pinimg.com/564x/bf/cb/fc/bfcbfc2acd4692272aa09b158d54692e.jpg"}/>
        </Header>
       {isLoading ? (<Loader>Loading..</Loader>) : (
        <CharacterListBox>
          {data?.map((char) => (
            <CharacterItem key={char.id}>
              <Link to={{
                pathname: `/characters/${char.id}`
              }}><Img src={`${char.imageUrl}`} />{char.name}
              </Link>
            </CharacterItem>
          ))}
        </CharacterListBox>
       )} 
    </Container>
  );
}
