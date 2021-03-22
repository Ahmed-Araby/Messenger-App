import './App.css';
import { Channel } from "./Components/Channel";
import {UserProvider} from "./Providers/UserProvider";
import {Home} from "./Components/Home"

function App() {
  return (    
    
    <UserProvider>
      <Home></Home>
      <Channel/>
    </UserProvider>
  );
}

export default App;
