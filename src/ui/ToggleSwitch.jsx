import StyledToggleSwitch from "../styles/StyledToggleSwitch";

function ToggleSwitch({ checked, onChange }) {
  return (
    <StyledToggleSwitch checked={checked}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="background">
        <span className="circle" />
      </span>
    </StyledToggleSwitch>
  );
}

export default ToggleSwitch;
