//Contexts
import UserContextProvider from "./contexts/UserContextProvider";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
//App components
import Content from "./components/Content";

function App() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Content />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
