export type UserData = {
  userID: number;
  username: string;
};

export type FetchedData<T> = {
  data: T;
  status: boolean;
};
