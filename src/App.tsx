import React,{useState} from 'react';
import Button, {ButtonSize,ButtonType} from './components/Button/button';
import Alert, {AlertType} from './components/Alert/alert';

import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuitem'

function App() {
  let [open,openAlert]=useState(false)

  return (
    <div className="App">
      <header className="App-header">
       <Button size={ButtonSize.Large} btnType={ButtonType.Primary} onClick={()=>{openAlert(true)}}>nihao</Button>        
       <Alert idName='1' altType={AlertType.Success} title={'alertsucess'} content='it sucesses' />

       <Menu defaultIndex={0}> 

         <MenuItem index={0}>
           link 1
         </MenuItem>
         <MenuItem index={1}>
           link 2
         </MenuItem>
         <MenuItem index={2}>
           link 3
         </MenuItem>
       </Menu>
      </header>
    </div>
  );
}

export default App;
