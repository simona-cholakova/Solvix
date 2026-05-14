import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ComplaintsProvider } from "./context/ComplaintsContext";

export default function App() {
  return (
    <ComplaintsProvider>
      <RouterProvider router={router} />
    </ComplaintsProvider>
  );
}