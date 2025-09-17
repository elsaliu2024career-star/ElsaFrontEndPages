import { HiArrowCircleUp, HiArrowCircleDown } from "react-icons/hi";
import React from "react";
import type {
  ChatFriend,
  MessageInfo,
  CloseProps,
  PositionProps,
  zIndexProps,
  TopActiveProps,
} from "../type";
import { MinIcon, MaxIcon, CloseIcon } from "./ToolRepo";

// This is the bottom drawer component

export function DrawerContent({ ChatMessages }: MessageInfo) {
  console.log("the chat messages are: ", ChatMessages);
  return (
    <div className="drawer-content">
      {ChatMessages.map((chat, index) => (
        <FrindChatBox key={index} {...chat} />
      ))}
    </div>
  );
}

let zIndexCount = { current: 1000 };
//let passZvalue= 1000 + zIndexCount;
let ActiveWindowIndex = 0;

export function FrindChatBox({ avatar, name, last_message }: ChatFriend) {
  //console.log("the chat friend is: ", name, last_message);
  //const [ChatBoxShow, setChatBoxShow] = React.useState(false);
  //const countRef = React.useRef(0);
  //const [ActiveWindowIndex, setActiveWindowIndex] = React.useState(0);
  const [ChatBoxShow, setChatBoxShow] = React.useState(false);

  const [zIndexProps, setzIndexProps] = React.useState(1000);

  const [Position, setPosition] = React.useState<{ x: number; y: number }>({
    x: 150,
    y: 150,
  });

  const CurrentBoxState = React.useRef(false);

  React.useEffect(() => {
    CurrentBoxState.current = ChatBoxShow;
  }, [ChatBoxShow]);

  const HandleChatBoxClick = () => {
    console.log("the chat box is opened");

    if (!CurrentBoxState.current) {
      ActiveWindowIndex += 1;
      setPosition({
        x: 150 + ActiveWindowIndex * 20,
        y: 150 + ActiveWindowIndex * 20,
      });
    }
    //countRef.current += 1;
    //ActiveWindowIndex += 1;
    //zIndexCount += 1;
    //let passZvalue= 1000 + zIndexCount;
    setzIndexProps(++zIndexCount.current);

    setChatBoxShow(true);
    //console.log("Mark the count of the chat box is: ", ActiveWindowIndex);
    //console.log("the position of the chat box is: ", Position);
    console.log("the z-index of the chat box is: ", zIndexProps);
    //console.log("the ActiveWindowIndex is :", ActiveWindowIndex);
  };

  const TopActiveBox = () => {
    setzIndexProps(++zIndexCount.current);
  };

  const HandleClose = () => {
    console.log("the chat box is closed");
    ActiveWindowIndex--;

    if (ActiveWindowIndex === 0) {
      zIndexCount = { current: 1000 };
    }

    console.log(
      "the count of the chat box after close is: ",
      ActiveWindowIndex
    );
    setChatBoxShow(false);
  };

  return (
    <div>
      <button
        type="button"
        className="friend-chat-box"
        onClick={HandleChatBoxClick}
      >
        <div className="avatar">{avatar}</div>
        <div className="message-box">
          <div className="chat-box-name">{name}</div>
          <div className="latest-message">{last_message}</div>
        </div>
      </button>
      <div>
        {ChatBoxShow ? (
          <ChatBox
            avatar={avatar}
            name={name}
            last_message={last_message}
            onClose={HandleClose}
            Position={Position}
            zIndex={zIndexProps}
            TopActiveBox={TopActiveBox}
          />
        ) : null}
      </div>
    </div>
  );
}

export function ChatBox({
  avatar,
  name,
  last_message,
  onClose,
  Position,
  zIndex,
  TopActiveBox,
}: ChatFriend & CloseProps & PositionProps & zIndexProps & TopActiveProps) {
  console.log("the chat box is shown");
  //const [ClikeActiveBox, setClikeActiveBox] = React.useState(zIndex);
  //  console.log("the passed zIndex is: ",zIndex);
  //console.log("the current ClikeActiveBox is: ",ClikeActiveBox);

  return (
    <div
      className="chat-box"
      style={{ left: Position.x, top: Position.y, zIndex: zIndex }}
      onClick={TopActiveBox}
    >
      <div className={"chat-box-header"}>
        <div className="avatar">{avatar}</div>
        <div className="chat-box-name">{name}</div>
        <div className="window-button-bar">
          <MinIcon />
          <MaxIcon />
          <CloseIcon onClose={onClose} />
        </div>
      </div>
      <div>{last_message}</div>
    </div>
  );
}

export function BottomDrawer({ ChatMessages }: MessageInfo) {
  // This is the state of the drawer
  const [drawer, setdrawer] = React.useState(false);

  const HandleDrawerClick = () => {
    setdrawer(!drawer);
    console.log("the state of drawer click is: ", !drawer);
  };

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary ${!drawer ? "drawer" : "drawer show"}`}
        data-bs-toggle="button"
        onClick={HandleDrawerClick}
      >
        {!drawer ? (
          <>
            <span> Online Friends </span> <HiArrowCircleUp />
          </>
        ) : (
          <>
            <div>
              <span>Hide</span> <HiArrowCircleDown />
            </div>
          </>
        )}
      </button>
      {!drawer ? null : <DrawerContent ChatMessages={ChatMessages} />}
    </>
    //
  );
}
