import React from 'react';
import {render,RenderResult, fireEvent, cleanup, wait} from '@testing-library/react';
import Menu,{MenuProps} from './menu';
import MenuItem from './menuitem';
import SubMenu from './submenu'

const testProps:MenuProps={
    defaultIndex:'0',
    onSelect:jest.fn(),
    className:'test'
}

const testVerProps:MenuProps={
    defaultIndex:'0',
    mode:'vertical',
    
}

const GerneralMenu=(props : MenuProps)=>{
   return(
    <Menu  {...props}> 
    <MenuItem >
      active
    </MenuItem>
    <MenuItem disabled >
      disabled
    </MenuItem>
    <MenuItem >
      xyz
    </MenuItem>
    <SubMenu title='dropdown'>
      <MenuItem>
       drop1
      </MenuItem>
    </SubMenu>
  </Menu>
   )
}

let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement;


describe('test menu and menuItem component',()=>{
    beforeEach(()=>{
       wrapper = render(GerneralMenu(testProps));
       menuElement= wrapper.getByTestId('test-menu');
       activeElement=wrapper.getByText('active');
       disabledElement=wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props',()=>{
       expect(menuElement).toBeInTheDocument();
       expect(menuElement).toHaveClass('viking-menu test');
       expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4)
       expect(activeElement).toHaveClass('menu-item is-active');
       expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click item should change active and call the right callback',()=>{
       const thirdItem=wrapper.getByText('xyz');
       fireEvent.click(thirdItem);
       expect(thirdItem).toHaveClass('is-active');
       expect(activeElement).not.toHaveClass('is-actve');
       expect(testProps.onSelect).toHaveBeenCalledWith('2');
       fireEvent.click(disabledElement);
       expect(disabledElement).not.toHaveClass('is-active');
       expect(testProps.onSelect).not.toHaveBeenNthCalledWith(1);
    });
    it('should render certical mode set class to vertical',()=>{
       cleanup();
       const wrapper=render(GerneralMenu(testVerProps));
       const menuElement=wrapper.getByTestId('test-menu');
       expect(menuElement).toHaveClass('menu-vertical')
    });
    it('should show dropdown items when hover on submenu',async()=>{
       const submenuelement = wrapper.getByText('dropdown')
       expect(submenuelement.outerHTML).toStrictEqual('<div class="submenu-title">dropdown</div>');
       fireEvent.mouseEnter(submenuelement)
       await wait(()=>{
         expect(wrapper.queryByText('drop1')).toBeVisible()
       })
       fireEvent.click(wrapper.getByText('drop1'));
       expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
       fireEvent.mouseLeave(submenuelement)
       await wait(()=>{
         expect(submenuelement.outerHTML).toEqual('<div class="submenu-title">dropdown</div>');
       })
    })
})