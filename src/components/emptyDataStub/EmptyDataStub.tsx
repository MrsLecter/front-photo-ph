import emptyBoxPNG from "@images/empty-box.png";
import styled from "styled-components";

export const EmptyDataStub: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Stub>
      <img src={emptyBoxPNG} alt="emptyBox.svg" />
      <p>{label}</p>
    </Stub>
  );
};

const Stub = styled.div`
  width: 100px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  img {
    width: 120px;
    height: 120px;
  }

  p {
    margin-top: 20px;
    font-family: "Futura";
    font-weight: 500;
    font-size: 22px;
    text-align: center;
  }
`;
