import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ImageGridContainer } from "./ImageGriding";
import { Link } from "react-router-dom";

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ImageGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 0 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FontImages = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #305f55;
  text-align: center;
  padding: 20px;
`;

const ImageCard = styled.div<{ isVisible: boolean }>`
  max-width: 100%;
  margin: 0 auto;
  background-color: #f0f9f4;
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeSlideIn} 0.6s ease forwards;
    `}

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    img {
      transform: scale(1.05);
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ImageDescription = styled.div`
  margin-top: 12px;
  font-size: 1rem;
  color: #444;
  font-weight: 600;
  transition: color 0.3s ease;

  ${ImageCard}:hover & {
    color: #d32f2f;
  }
`;

type ImageType = {
  src: string;
  alt: string;
  link: string;
};

const ObserveCard = ({ image }: { image: ImageType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <ImageCard ref={ref} isVisible={isVisible}>
      <Link to={image.link} target="_blank" rel="noopener noreferrer">
        <StyledImage src={image.src} alt={image.alt} />
        <ImageDescription>{image.alt}</ImageDescription>
      </Link>
    </ImageCard>
  );
};

export const ImageGrid = () => {
  return (
    <>
      <FontImages>🧹 실제 청소 현장, 지금 블로그에서 확인하세요 📝</FontImages>
      <ImageGrids>
        {ImageGridContainer.map((image) => (
          <ObserveCard key={image.src} image={image} />
        ))}
      </ImageGrids>
    </>
  );
};
