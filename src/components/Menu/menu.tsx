import React, { useState,createContext } from 'react';
import classNames from 'classnames';
import MenuItem from './menuitem';
import {MenuItemProps} from './menuitem'

type MenuMode = 'horizontal' | 'vertical' ;
type SelectCallBack = (selectedIndex : string) => void;

export interface MenuProps{
  defaultIndex ?: string;
  className ?: string;
  mode ?: MenuMode;
  style ?: React.CSSProperties;
  onSelect ?: SelectCallBack;
  defaultOpenMenu?:string[];
}

interface IMenuContext{
  index: string;
  onSelect?: SelectCallBack;
  mode ?: MenuMode;
  defaultOpenMenu?:string[];
}

export const MenuContext=createContext<IMenuContext>({index:'0'})

const Menu : React.FC<MenuProps>=(props)=>{
    const{ 
        className, mode, style, children,onSelect, defaultIndex,defaultOpenMenu
    }=props

    const [currentActive,setActive]=useState(defaultIndex)

    const handelClick = (index : string)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }

    const passedContext : IMenuContext={
        index : currentActive ? currentActive : '0',
        onSelect : handelClick,
        mode: mode,
        defaultOpenMenu
    }

    const classes=classNames('viking-menu',className,{
        'menu-vertical' : mode ==='vertical',
        'menu-horizontal' : mode !== 'vertical'
    });
    const renderChildren=()=>{
        return React.Children.map(children,(child,index)=>{
            const childrenElment=child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName}=childrenElment.type;
            if(displayName==='MenuItem' || 'SubMenu'){
                return React.cloneElement(childrenElment,{
                    index: index.toString()
                });
            }else{
                console.error('warning : menuitem lost')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
             {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps={
    defaultIndex : '0',
    mode : 'horizontal',
    defaultOpenMenu:[]
}

export default Menu;