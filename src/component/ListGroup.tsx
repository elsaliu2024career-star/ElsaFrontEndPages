//import ListGroup from "./component/listGroup";
import { useState, useEffect } from "react";

// {items: [], heading: string }
interface Props {
  items: string[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  /*   
  let items = [
    "NOKIA",
    "Amazon",
    "Apple",
    "Tesla",
    "Facebook",
    "Ericsson",
    "Elsa",
  ];
  */

  // items = [];
  // const handleClick = (event: MouseEvent) => console.log(event);
  //  let SelectedIndex = -1;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // arr[0] = variable(SelectedIndex)
  // arr[1] = updater function
  //  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Selected index changed to:", selectedIndex);
  }, [selectedIndex]);

  return (
    <>
      <h1>{heading}</h1>
      {items.length == 0 ? <p>No items to display, help yourself</p> : null}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              //              console.log(selectedIndex, index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
