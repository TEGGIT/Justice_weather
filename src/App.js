import './App.css';
import {Provider} from "react-redux";
import {store} from "./redux";
import Main from "./components/Main/Main";
function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Main/>
        </div>
      </Provider>
  );
}

export default App;
