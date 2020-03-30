import React from 'react';
import {render,RenderResult, fireEvent, cleanup} from '@testing-library/react';
import Menu,{MenuProps} from './menu';
import MenuItem from './menuitem'

const testProps:MenuProps={
    defaultIndex:0,
    onSelect:jest.fn(),
    className:'test'
}

const testVerProps:MenuProps={
    defaultIndex:0,
    mode:'vertical',
    
}

const GerneralMenu=(props : MenuProps)=>{
   return(
    <Menu  {...props}> 
    <MenuItem index={0}>
      active
    </MenuItem>
    <MenuItem disabled index={1}>
      disabled
    </MenuItem>
    <MenuItem index={2}>
      xyz
    </MenuItem>
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
       expect(menuElement.getElementsByTagName('li').length).toEqual(3);
       expect(activeElement).toHaveClass('menu-item is-active');
       expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click item should change active and call the right callback',()=>{
       const thirdItem=wrapper.getByText('xyz');
       fireEvent.click(thirdItem);
       expect(thirdItem).toHaveClass('is-active');
       expect(activeElement).not.toHaveClass('is-actve');
       expect(testProps.onSelect).toHaveBeenCalledWith(2);
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
})