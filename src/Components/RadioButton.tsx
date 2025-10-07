import styled from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border-radius: 6px;
  padding: 5px 10px;
  background-color: #ffffff;
  cursor: pointer;
  &:has(input:checked) {
    background-color: #d1ddf3;
  }
`;

const Text = styled.p`
  color: #101010;
  font-size: 16px;
  line-height: 18px;
  margin-left: 4px;
  text-transform: capitalize;
`;

const RadioBox = styled.div`
  height: 12px;
  width: 12px;
  border: 1px solid lightgray;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 4px;
  transition: background 0.15s, border-color 0.15s;
  padding: 4px;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background: #2266dc;
    border-radius: 50%;
    cursor: pointer;
    transform: scale(0);
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  &:focus + ${RadioBox} {
    outline: 2px solid #2266dc;
    outline-offset: 2px;
  }
  &:checked + ${RadioBox} {
  border-color: #2266dc;
      &::after {
        transform: scale(1);
      }
`;

const RadioButton = ({
  id,
  name,
  label,
  onClick,
  checked,
}: {
  id: string;
  name: string;
  label: string;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) => {
  return (
    <Label htmlFor={id} role="label">
      <Input
        type="radio"
        name={name}
        id={id}
        value={id}
        data-testid="radio-input"
        checked={checked}
        onChange={onClick}
      />
      <RadioBox></RadioBox>
      <Text>{label}</Text>
    </Label>
  );
};

export default RadioButton;
