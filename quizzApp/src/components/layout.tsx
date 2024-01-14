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
