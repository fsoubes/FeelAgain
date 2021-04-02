// React
import { useRouter } from "next/router";
import React from "react";

// Material

import { StyledTab, StyledTabs } from "./Tabs";

interface SubTabsProps {
  title: string[];
  value: number;
  change: (key: number) => void;
  currentContent: string[];
}

const SubTabs: React.FC<SubTabsProps> = ({
  title,
  value,
  change,
  currentContent,
}) => {
  const router = useRouter();
  const updateHandler = (e: React.ChangeEvent<{}>, newValue: number): void => {
    change(newValue);
    router.push(
      {
        pathname: router.pathname,
      },
      `/dashboard/add?content=${currentContent[newValue]}`,
      { shallow: true }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
        marginTop: "2rem",
      }}
    >
      <StyledTabs value={value} onChange={updateHandler}>
        {title.map((item, index) => (
          <StyledTab key={index} label={item} />
        ))}
      </StyledTabs>
    </div>
  );
};
export default SubTabs;
