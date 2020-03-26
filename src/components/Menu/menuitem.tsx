import React, { useContext } from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu'

export interface MenuItemProps{
    index : number;
    disabled ?: boolean;
    className ?: string;
    style ?: React.CSSProperties;
}

const MenuItem : React.FC<MenuItemProps>=(props)=>{
     const {
         index,disabled,className,children,style
     } = props;

     const context = useContext(MenuContext)

     const classes=classNames('menu-item',classNames,{
         'is-disabled' : disabled,
         'is-active' : context.index === index
     })

     const handelClick= ()=>{
         if(context.onSelect && !disabled){
             context.onSelect(index ? index : 0)
         }
     }

     return(
         <li className={classes} style={style} onClick={handelClick}>
              {children}
         </li>
     )

}

export default MenuItem;