import { ButtonUpload } from "@common/buttons/ButtonUpload";
import styled from "styled-components";

export interface AlbumPanelProps {
  photosAmount: number;
  swithChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  buttonUpload: React.MouseEventHandler<HTMLButtonElement>;
}

export const AlbumPanel: React.FC<AlbumPanelProps> = (props) => {
  return (
    <Panel>
      {props.photosAmount > 1 ? (
        <></>
      ) : (
        <ButtonUpload buttonHandler={props.buttonUpload} />
      )}
      <div>
        <Switch>
          <input
            type="checkbox"
            checked={props.checked}
            onChange={props.swithChangeHandler}
          />
          <Slider></Slider>
        </Switch>
      </div>
    </Panel>
  );
};

const Panel = styled.div`
  width: 345px;
  height: 55px;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + .albumPanel__slider {
    background-color: #592ce0f3;
  }

  input:checked + .albumPanel__slider:before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  border-radius: 34px;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;

  &:before {
    border-radius: 34px;
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
  }
`;
