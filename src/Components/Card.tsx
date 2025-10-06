import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  width: auto;
  height: auto;
  gap: 20px;
  margin: 32px 0;
`;

const CardInital = styled.div`
  font-size: 24px;
  color: #2266dc;
  background-color: #d1ddf3;
  padding: 10px 16px;
  border-radius: 8px;
  text-transform: uppercase;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
`;

const CardName = styled.p`
  font-size: 20px;
  color: #101010;
  margin: 0;
  text-transform: capitalize;
`;

const CardRole = styled.p`
  font-size: 16px;
  color: gray;
  margin: 0;
  text-transform: capitalize;
`;

const Card = ({ role, name }: { role: string; name: string }) => {
  return (
    <CardContainer>
      <CardInital data-testid="user-initial">{name.slice(0, 1)}</CardInital>
      <CardInfo>
        <CardName data-testid="user-name">{name}</CardName>
        <CardRole>{role}</CardRole>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
