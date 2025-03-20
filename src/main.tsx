import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
  <Theme accentColor="red">
    <App />
    {/* <ThemePanel /> */}
  </Theme>
);
