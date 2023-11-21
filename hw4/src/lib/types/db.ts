export type User = {
  id: string;
  username: string;
  email: string;
  image?: string | null;
  provider: "github" | "credentials";
};

export type Conversation = {
  id: string;
  title: string;
  userIds: string[];
};

export type Message = {
  id: string;
  message: string;
};
