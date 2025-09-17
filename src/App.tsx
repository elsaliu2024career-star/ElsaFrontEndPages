//import ListGroup from "./component/ListGroup";
import NameCardGrid from "./component/NameCardGrid";
import NaviBar from "./component/NaviBar";
import { BottomDrawer } from "./component/BottomDrawer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
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

  let heading = "Elsa's Favorite Companies";
  */
  /*
  const data = [
    {
      person_name: "Elsa Zhang",
      role: "CEO at Company",
      avatar: "E",
      rating: 5,
      review:
        "Hello, I’m Elsa. I’m from China and now living in Melbourne.My child recently joined the school, and I want to understand how they’re settling in—both academically and socially.",
    },
    {
      person_name: "John Doe",
      role: "Engineer",
      avatar: "J",
      rating: 4,
      review:
        "I love frontend and user interface design.My child recently joined the school, and I want to understand how they’re settling in—both academically and socially.",
    },
    {
      person_name: "Alice Smith",
      role: "Marketing Lead",
      avatar: "A",
      rating: 4,
      review:
        "Creative thinker and team leader.My child recently joined the school, and I want to understand how they’re settling in—both academically and socially.",
    },
    {
      person_name: "Liam",
      role: "Software Engineer",
      avatar: "L",
      rating: 4,
      review:
        "I love coding and coffee. I'm currently building cool things with React and TypeScript.",
    },
    {
      person_name: "Ava",
      role: "Product Manager",
      avatar: "A",
      rating: 5,
      review:
        "I'm passionate about user experience and turning ideas into real products.",
    },
    {
      person_name: "Noah",
      role: "UX Designer",
      avatar: "N",
      rating: 3,
      review:
        "Design is thinking made visual. I enjoy solving problems through interface design.",
    },
    {
      person_name: "Mia",
      role: "Marketing Specialist",
      avatar: "M",
      rating: 4,
      review: "Creative marketer who enjoys connecting products with people.",
    },
    {
      person_name: "Amy",
      role: "Marketing Specialist",
      avatar: "A",
      rating: 10,
      review: "Creative marketer who enjoys connecting products with people.",
    },
    {
      person_name: "Shirley",
      role: "Marketing Specialist",
      avatar: "S",
      rating: 10,
      review: "Creative marketer who enjoys connecting products with people.",
    },
    {
      person_name: "Daisy",
      role: "Marketing Specialist",
      avatar: "D",
      rating: 5,
      review: "Creative marketer who enjoys connecting products with people.",
    },
    {
      person_name: "Eden",
      role: "Marketing Specialist",
      avatar: "E",
      rating: 4,
      review: "Creative marketer who enjoys connecting products with people.",
    },
  ]; */
  
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://172.20.10.2:8000/reviews/")
    .then((res) => setData(res.data))
    .catch((err: string) => console.log(err))
   }, [])

  console.log(typeof data);   // "object" if it's already parsed
  //console.log(Array.isArray(data)); // true if it's an array
  console.log(data);          // inspect the structure

/*
   const [ChatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    axios.get("http://172.20.10.2:8000/chat-messages/")
    .then((res) => setChatMessages(res.data))
    .catch((err: string) => console.log(err))
   }, [])
   
   console.log(ChatMessages);
   */
  
  const ChatMessages = [
    {
      avatar: "E",
      name: "Elsa Zhang",
      last_message:
        "Hey, how's it going?I have not seen you for a long time, how are you doing? Is everything okay? How is your family? How do you like your new house?",
    },
    {
      avatar: "J",
      name: "John Doe",
      last_message: "I'm doing well, how about you?",
    },
    {
      avatar: "A",
      name: "Alice Smith",
      last_message: "I'm also doing well, how about you?",
    },
    {
      avatar: "L",
      name: "Liam",
      last_message: "I'm also doing well, how about you?",
    },
    {
      avatar: "A",
      name: "Ava",
      last_message: "I'm also doing well, how about you?",
    },
    {
      avatar: "N",
      name: "Noah",
      last_message: "I'm also doing well, how about you?",
    },
    {
      avatar: "M",
      name: "Mia",
      last_message: "I'm also doing well, how about you?",
    },
    {
      avatar: "A",
      name: "Amy",
      last_message: "I'm also doing well, how about you?",
    },
    {
      avatar: "S",
      name: "Shirley",
      last_message: "I'm also doing well, how about you?",
    },
  ];

  /*
  return (
    <div>
      <ListGroup items={items} heading={heading} />
    </div>
  );
}*/
  

  return (
    <div>
      <NaviBar />
      <NameCardGrid data={data} />
      <BottomDrawer ChatMessages={ChatMessages} />
    </div>
  );
}

export default App;
