import styled from "styled-components";

export const Label = styled.div`
  font-size: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  margin-top: 50px;
  font-size: 36px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  width: 90vw;
  padding: 16px;
  background: white;
  border-radius: 5px;
  margin-bottom: 24px;
`;

export const InputsWrapper = styled.div`
  margin-bottom: 40px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const Link = styled.div`
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 600;
  color: var(--m-primary);
  cursor: pointer;
`;

export const Instruction = styled.div<{width: string}>`
  font-size: 32px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 50px;
  text-align: left;
  color: white;
  line-height: 30px;
  width: ${props => props.width};
`;

export const CardsWrapper = styled.div<{padding?: string}>`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.padding};
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 12px;
  margin-bottom: 24px;
`;

export const CardTitle = styled.div`
  font-size: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 2px;
`;

export const Subtitle = styled.div`
  font-size: 12px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 12px;
  color: var(--m-grey_dark);
`;
