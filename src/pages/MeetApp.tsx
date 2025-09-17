import "./MeetApp.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuWine } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";

export function ActOptions() {
  const [selectedplace, setSelectedPlace] = useState("Coffee");

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-info dropdown-toggle"
        style={{ backgroundColor: "rgb(156, 234, 248)", width: "150px" }}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedplace}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedPlace("Restaurant")}
          >
            <div className=" list-content">
              Restaurant <IoRestaurantOutline />
            </div>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedPlace("Bar")}
          >
            <div className=" list-content">
              Bar <LuWine />
            </div>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedPlace("Mall")}
          >
            <div className=" list-content">
              Mall <MdOutlineShoppingCart />
            </div>
          </a>
        </li>
        <hr className="dropdown-divider" />
        <li>
          <a className="dropdown-item" href="#">
            <div className=" list-content">
              Custom <MdOutlinePlace />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export function ClockOptions({selectedclock, setSelectedClock}:{ selectedclock: string; setSelectedClock: React.Dispatch<React.SetStateAction<string>> }) {

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-info dropdown-toggle"
        style={{ backgroundColor: "rgb(156, 234, 248)", width: "120px" }}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedclock}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedClock("15 min later")}
          >
            <div className="list-content">
              15 min later
            </div>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedClock("30 min later")}
          >
            <div className=" list-content">
              30 min later
            </div>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedClock("1 hour later")}
          >
            <div className=" list-content">
              1 hour later
            </div>
          </a>
        </li>
        <hr className="dropdown-divider" />
        <li>
          <a className="dropdown-item" href="#">
            <div className=" list-content">
              Prefered time <FaRegClock />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export function TransportOption(){
    const [selectedtool, setSelectedtool] = useState("car")
    return(        
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-info dropdown-toggle"
        style={{ backgroundColor: "rgb(156, 234, 248)", width: "150px" }}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedtool}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedtool("Bus")}
          >
            <div className=" list-content">
              Bus <FaBusSimple />
            </div>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedtool("Walking")}
          >
            <div className=" list-content">
              Walking <FaWalking />
            </div>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => setSelectedtool("Bike")}
          >
            <div className=" list-content">
              Bike <MdDirectionsBike />
            </div>
          </a>
        </li>
      </ul>
    </div>
    );
}

export type ClockProps = {
  selectedclock: string;
};

export function Clock({selectedclock}:ClockProps) {
  const [time, setTime] = useState(new Date());
  const [timeoption, setTimeOption] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date()); // update every second
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  useEffect(() => {
    if (selectedclock === "15 min later") setTimeOption(15);
    else if (selectedclock === "30 min later") setTimeOption(30);
    else if (selectedclock === "1 hour later") setTimeOption(60);
    else setTimeOption(0); // default if nothing matches
  }, [selectedclock]);

  const displayTime = new Date(time.getTime() + Number(timeoption) * 60 * 1000);

  return (
    <div>
      Leaving time is: {displayTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

export function TabOption(){
    const [selected, setSelected] = useState<"time" | "distance">("time");

  return (
    <div>
      {/* Tab buttons */}
      <div className="content-layout">
        <button
          onClick={() => setSelected("time")}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid gray",
            background: selected === "time" ? "#ddd" : "white",
          }}
        >
          Equal travel time
        </button>
        <button
          onClick={() => setSelected("distance")}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid gray",
            background: selected === "distance" ? "#ddd" : "white",
          }}
        >
          Equal travel distance
        </button>
      </div>

    </div>
  );
}

export function MeetApp() {
 
  const [selectedclock, setSelectedClock] = useState("15 min later");

  return (
    <div className="panel">
      <div className="topbar">
        <div>{"GeoMeet"}</div>
        <div>{"Premium"}</div>
      </div>
      <div className="panel-content">
        <div className="block-layout">
          <div className="content-layout">
            <div>{"Please find us a "}</div>
            <div>
              <ActOptions />
            </div>
            <div>{"place"}</div>
          </div>
          <div className="content-layout">
            <div>{"Midway between"}</div>
            <div className="mb-3">
              <input
                type="localtion"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Search here"
                style={{ width: "180px" }}
              />
            </div>
          </div>
          <div className="content-layout">
            <div>{"And"}</div>
            <div className="mb-3">
              <input
                type="localtion"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Search here"
                style={{ width: "180px" }}
              />
            </div>
          </div>
          <button type="button" className="btn btn-warning" style={{backgroundColor:"rgb(255, 160, 64)"}}>{"+ Add another friend"}</button>
        </div>
        <div className="shedule-content">
            <div>{"We will leave around"}</div>
            <div><ClockOptions selectedclock={selectedclock} setSelectedClock={setSelectedClock} /></div>
            <div><Clock selectedclock={selectedclock} /></div>
        </div>
        <div className="block-layout">
          <div>{"Everyone's transport getting there"}</div>
          <div className="content-layout">
            <div>{"I'am "}</div>
            <TransportOption />
          </div>
          <div className="content-layout">
            <div>{"Friend 1 is "}</div>
            <TransportOption />
          </div>
        </div>
        <div className="block-layout">
          <div>{"Make it fair by optimizing for:"}</div>
          <div>
            < TabOption />
          </div>
          <button type="button" className="btn btn-warning" style={{backgroundColor:"rgb(255, 160, 64)"}}>{"Find Spot"}</button>
        </div>
      </div>
    </div>
  );
}
