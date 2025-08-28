import { FaHome, FaUserFriends, FaSearch, FaBell } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import SearchBar from "./SearchBar";

function gotoHome() {
  console.log("goto home");
  window.open("https://www.google.com", "_blank");
  //   navigate("./ListGroup");
}

export default function NaviBar() {
  return (
    <div className="navi-bar">
      <div className="search-bar">
        <img
          src="/images/Code_heroes_logo1.png"
          className="logo-style"
          alt="logo"
        />
        <FaSearch />
        <SearchBar />
      </div>
      <div className="tool-bar">
        <div className="icon-format" onClick={gotoHome}>
          <FaHome title="Home" className="icon-style" />
          <span>Home</span>
        </div>
        <div className="icon-format">
          <FaUserFriends title="Friends" className="icon-style" />
          <span>Friends</span>
        </div>
        <div className="icon-format">
          <LuMessageCircleMore title="Messages" className="icon-style" />
          <span>Messages</span>
        </div>
         <div className="icon-format">
          <FaBell title="Notifications" className="icon-style" />
          <span>Notifications</span>
        </div>
      </div>
    </div>
  );
}
