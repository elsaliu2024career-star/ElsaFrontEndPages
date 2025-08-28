
export interface Person {
  person_name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
}

export interface Props {
  data: Person[];
}

export interface SearchContent {
  query: string;
}

export interface ChatFriend {
  avatar: string;
  name: string;
  last_message: string;
}

export interface MessageInfo {
  ChatMessages: ChatFriend[];
}

export type CloseProps = {
  onClose: () => void;
};

export type ClickCount = {
  Count: number;
}

export type PositionProps  = {
    Position: {
    x: number;
    y: number;
  }
}

export type zIndexProps = {
  zIndex: number;
}

export type TopActiveProps = {
  TopActiveBox: () => void;
};