import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { RouteProvider } from "./routes/RouteProvider";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-[1100px] mx-auto px-2 md:px-0">
          <RouteProvider />
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
