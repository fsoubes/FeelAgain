import BaseIcon from "./BaseIcon";

const InfoIcon: React.FC<{}> = () => (
  <BaseIcon color="#2E9AFE">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="8" />
  </BaseIcon>
);

export default InfoIcon;
