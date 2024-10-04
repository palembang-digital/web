import { init } from "@instantdb/react";

type LobbyRoomSchema = {
  lobby: {
    presence: { row: number; col: number; color: string };
  };
};

const APP_ID = process.env.NEXT_PUBLIC_INSTANTDB_APP_ID || "";

const db = init<{}, LobbyRoomSchema>({ appId: APP_ID, devtool: false });

export const room = db.room("lobby", "0");
