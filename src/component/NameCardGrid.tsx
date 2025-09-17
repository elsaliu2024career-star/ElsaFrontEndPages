import { NameCard } from "./NameCard.tsx";
import type { Props } from "../type";
import "./NameCard.css";
import { useState } from "react";

/*
export interface Props {
  data: Person[];
}
*/

function NameCardGrid({ data }: Props) {
  const [showAll, setshowAll] = useState(false);
  const ContentDisplay = () => {
    setshowAll(!showAll);
    console.log("showAll:", !showAll);
  };
  const visibleData = showAll ? data : data.slice(0, 6);

  return (
    <div className="name-card-grid-panel">
      <div className="panel-menu">
        <div className="panel-title">People you may know from Amazon</div>
        <div className="toggle-button" onClick={ContentDisplay}>
          {showAll ? "Show less ▲" : "Show more ▼"}
        </div>
      </div>
      <div className="name-card-grid">
        {visibleData.map((person, index) => (
          <NameCard key={index} {...person} />
        ))}
      </div>
    </div>

    /*
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",        
      }}
    >
      {data.map((person, index) => (
        <NameCard key={index} {...person} />
      ))}
    </div>
    */
  );
}

export default NameCardGrid;
