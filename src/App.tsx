import React,{useState} from 'react';
import Button, {ButtonSize,ButtonType} from './components/Button/button';
import Alert, {AlertType} from './components/Alert/alert';

function App() {
  let [open,openAlert]=useState(false)

  return (
    <div className="App">
      <header className="App-header">
       <Button size={ButtonSize.Large} btnType={ButtonType.Primary} onClick={()=>{openAlert(true)}}>nihao</Button>
        
       <Alert idName='1' altType={AlertType.Success} title={'alertsucess'} content='it sucesses' />
      </header>
    </div>
  );
}

export default App;
