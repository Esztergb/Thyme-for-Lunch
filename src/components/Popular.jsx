import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  //useEffect automatically imports from React - running the getPupuler function only when the component is mounted
  useEffect(() => {
    getPopular();
  }, []);

  // fetch request to Spoonacular API to find random (popular) recipes.
  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=74db62d59a674bbc85356ed301f3b3e2&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      <Title>
        <h3>Popular Picks</h3>
      </Title>
      <Wrapper>
        

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-weight: 600;
    font-size: 2rem;
    color: #715a45;
  }
`;

const Wrapper = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
`;
const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  border: black;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    font-weight: 600;
    font-size: 1rem;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 10%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    height: 40;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100;
  background: linear-gradient(rgba(0, 0, 0, 0)), rgba(0, 0, 0, 0.5);
`;

export default Popular;