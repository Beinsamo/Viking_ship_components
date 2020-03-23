import React from 'react';
import Button, {ButtonSize,ButtonType} from './components/Button/button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>nihao</Button>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
