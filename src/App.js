import './App.css';
import { Channel } from "./Components/Channel";
import {UserProvider} from "./Providers/UserProvider"

function App() {
  return (    
    <UserProvider>
      <Channel/>
    </UserProvider>
  );
}

export default App;
