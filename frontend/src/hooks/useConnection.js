import { useContext } from "react";
import { Connection } from "../contexts/connection";

export default function useConnection() {
  const conn = useContext(Connection);
  return conn;
}
