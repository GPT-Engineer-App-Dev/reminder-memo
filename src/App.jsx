import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Archive, Trash } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use sidebar layout
import Index from "./pages/Index.jsx";
import AllNotes from "./pages/AllNotes.jsx";
import ArchivedNotes from "./pages/ArchivedNotes.jsx";
import TrashNotes from "./pages/TrashNotes.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "All Notes",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Archived",
    to: "/archived",
    icon: <Archive className="h-4 w-4" />,
  },
  {
    title: "Trash",
    to: "/trash",
    icon: <Trash className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<AllNotes />} />
              <Route path="archived" element={<ArchivedNotes />} />
              <Route path="trash" element={<TrashNotes />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;