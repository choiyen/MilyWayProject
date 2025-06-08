import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ImageGridContainer } from "./ImageGriding";
import { Link } from "react-router-dom";

// 애니메이션 정의
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

// 그리드 설정 (기본 2개, 모바일도 2개)
const ImageGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 0 20px;

  @media (max-width: 800px) {
    gap: 12px;
    padding: 0 10px;
  }
`;

// 타이틀 텍스트
const FontImages = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #305f55;
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
`;

// 이미지 카드 컴포넌트
const ImageCard = styled.div<{ isVisible: boolean }>`
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
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

// 이미지 스타일 (모바일 포함)
const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  @media screen and (max-width: 800px) {
    max-width: 150px;
  }
`;

// 설명 텍스트
const ImageDescription = styled.div`
  margin-top: 12px;
  font-size: 1.5rem;
  color: #444;
  font-weight: 600;
  transition: color 0.3s ease;

  ${ImageCard}:hover & {
    color: #d32f2f;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

// 이미지 타입
type ImageType = {
  src: string;
  alt: string;
  link: string;
};

// 관찰 컴포넌트
const ObserveCard = ({ image }: { image: ImageType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

// 전체 그리드 컴포넌트
export const ImageGrid = () => {
  return (
    <div style={{ padding: "10px", marginBottom: "15px" }}>
      <FontImages>🧹 실제 청소 현장, 지금 블로그에서 확인하세요 📝</FontImages>
      <ImageGrids>
        {ImageGridContainer.map((image) => (
          <ObserveCard key={image.src} image={image} />
        ))}
      </ImageGrids>
    </div>
  );
};
