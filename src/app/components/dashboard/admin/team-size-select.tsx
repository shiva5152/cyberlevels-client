import React from "react";
import NiceSelect from "@/ui/nice-select";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const TeamSizeSelect = ({ setSelected }: Props) => {
  const handleState = (item: { value: string; label: string }) => {
    setSelected(item.value);
  };
  return (
    <NiceSelect
      options={[
        { value: "Solo", label: "Solo" },
        { value: "1-10", label: "1-10" },
        { value: "11-50", label: "11-50" },
        { value: "51-100", label: "51-100" },
        { value: "101-500", label: "101-500" },
        { value: "501-1,000", label: "501-1,000" },
        { value: "1,001-5,000", label: "1,001-5,000" },
        { value: "5,001-10,000", label: "5,001-10,000" },
        { value: "10,000+", label: "10,000+" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleState(item)}
      name="State"
      placeholder="Size"
    />
  );
};

export default TeamSizeSelect;
