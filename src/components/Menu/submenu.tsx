import React, { useState,createContext, useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu'
import { MenuItemProps } from './menuitem';
import { cleanup } from '@testing-library/react';

export interface SubMenuProps{
    index ?: string;
    title :string;
    classname ?:string;
}

const SubMenu : React.FC <SubMenuProps>=(props)=>{
    const {
        index,classname,children,title
    }=props
    const context = useContext(MenuContext);
    

    const openedSubMenus=context.defaultOpenMenu as Array<string>
    const isOpened=(index && context.mode==='vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen,openSub]=useState(isOpened)

    const classes=classNames('menu-item submenu-item',classname,{
        'is-active' : context.index===index
    })

    const handelClick= ()=>{
        if(context.onSelect &&(typeof index === 'string')){
            context.onSelect(index ? index : '0')
            openSub(!menuOpen)
        }
    }
    let timer:any;
    const handelMouse=(e:React.MouseEvent, toggle:boolean)=>{
        clearTimeout(timer);
        e.preventDefault();
        timer=setTimeout(()=>{
            openSub(toggle)
        },300)
    }

    const clickEvents = context.mode==='vertical'?{
        onClick:handelClick
    }:{}
    const hoverEvents = context.mode==='horizontal'?{
        onMouseEnter : (e:React.MouseEvent)=>{handelMouse(e,true)},
        onMouseLeave : (e:React.MouseEvent)=>{handelMouse(e,false)}
    }:{}

    const renderChildren=()=>{
        const childrenComponent= React.Children.map(children,(child,i)=>{
            const childElenemt= child as FunctionComponentElement<MenuItemProps>
            if(childElenemt.type.displayName==='MenuItem'){
                return React.cloneElement(childElenemt,{
                    index : `${index}-${i}`
                })
            }else{
                console.error('warning')
            }
        })
        return (
            <ul className='viking-submenu'>
               {childrenComponent}
            </ul>
        )
    }
    return( 
          <li key={index} className={classes} {...hoverEvents} >
              <div className='submenu-title' {...clickEvents}>
                  {title}
              </div>
              {menuOpen? renderChildren() : null}
          </li>
    )
}
SubMenu.displayName='SubMenu'
export default SubMenu