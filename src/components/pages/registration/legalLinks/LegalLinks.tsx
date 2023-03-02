import { AppUrlsEnum } from "@const";
import styled from "styled-components";

export const LegalLinks: React.FC = () => {
  return (
    <Links>
      <div>
        By proceeding, you consent to get WhatsApp or SMS messages, from
        PhotoDrop and its affiliates to the number provided. Text “STOP” to
        89203 to opt out.
      </div>
      <div>
        By continuing, you indicate that you have read and agree to our
        <a href={AppUrlsEnum.TERMS}>Terms of Use</a> &
        <a href={AppUrlsEnum.POLICY}>Privacy Policy</a>
      </div>
    </Links>
  );
};

const Links = styled.div`
  position: sticky;
  width: 340px;
  bottom: 0px;
  margin: 10px auto;
  text-align: start;
  font-family: "Futura";
  font-weight: 400;
  font-size: 14px;
  line-height: 17.95px;
  color: ${({ theme }) => theme.text.second};

  div:nth-child(1) {
    height: 46px;
    margin-bottom: 38px;
  }

  a,
  a:active {
    color: ${({ theme }) => theme.text.second};
  }

  a:hover {
    color: ${({ theme }) => theme.text.main};
  }
`;
