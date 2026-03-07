import { startCase } from "es-toolkit";

export default () => {
  const formatToLabel = (label: string) => {
    return startCase(label.replace(/_/g, " "));
  };

  return {
    formatToLabel,
  };
};
