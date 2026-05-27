import { Outlet } from "react-router";
import GNB from "./GNB";

export default function Layout() {
  return (
    <div>
      <GNB />
      <Outlet />
    </div>
  );
}
