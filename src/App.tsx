import React,{useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas} from '@fortawesome/free-solid-svg-icons'


import Button, {ButtonSize,ButtonType} from './components/Button/button';
import Alert, {AlertType} from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuitem'
import SubMenu from './components/Menu/submenu'
import Icon from './components/Icon/icon'

function App() {
  let [open,openAlert]=useState(false)
  library.add(fas)
  return (
    <div className="App">
      <header className="App-header">
       <Icon icon='arrow-down' theme='danger' size='8x' />
       <Button size={ButtonSize.Large} btnType={ButtonType.Primary} onClick={()=>{openAlert(true)}}>nihao</Button>        
       <Alert idName='1' altType={AlertType.Success} title={'alertsucess'} content='it sucesses' />

       <Menu mode={'vertical'} defaultIndex='0' onSelect={(index)=>{alert(index)}} defaultOpenMenu={['1']}> 
         <MenuItem>
           link 1
         </MenuItem>
         <SubMenu title='dropdown'>
           <MenuItem>
             dropdown1
           </MenuItem>
           <MenuItem>
             dropdown2
           </MenuItem>
           <MenuItem>
             dropdown3
           </MenuItem>
         </SubMenu>
         <MenuItem>
           link 3
         </MenuItem>
       </Menu>
      </header>
    </div>
  );
}

export default App;
