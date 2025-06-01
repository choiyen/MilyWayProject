import styled, { keyframes } from "styled-components";
import { ImageGridContainer } from "./ImageGriding";
import { Link } from "react-router-dom";

const fadeSlideIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ImageGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 한 줄에 2개 */
  gap: 24px;
  padding: 0 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 모바일에서는 1열 */
  }
`;

const FontImages = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #305f55;
  text-align: center;
  padding: 20px;
`;

const ImageCard = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background-color: #f0f9f4; /* 연청록 계열 */
  padding: 20px;
  border-radius: 10px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeSlideIn} 0.6s ease forwards;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);

    img {
      transform: scale(1.05);
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 400px; /* 너무 커지지 않도록 제한 */
  aspect-ratio: 1 / 1; /* 정사각형 유지 */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  transition: transform 0.3s ease;
`;

const ImageDescription = styled.div`
  margin-top: 12px;
  font-size: 1rem;
  color: #444;
  transition: color 0.3s ease;
  font-weight: 600;

  ${ImageCard}:hover & {
    color: #d32f2f; /* 깔끔한 빨간색 */
  }
`;

export const ImageGrid = () => {
  return (
    <>
      <FontImages>🧹 실제 청소 현장, 지금 블로그에서 확인하세요 📝</FontImages>{" "}
      <ImageGrids>
        {ImageGridContainer.map((image) => (
          <ImageCard key={image.src}>
            <Link to={image.link} target="_blank" rel="noopener noreferrer">
              <StyledImage src={image.src} alt={image.alt} />
              <ImageDescription>{image.alt}</ImageDescription>
            </Link>
          </ImageCard>
        ))}
      </ImageGrids>
    </>
  );
};
