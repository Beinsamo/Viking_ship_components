import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large='lg', 
  Small='sm'
}

export enum ButtonType{
  Primary='primary',
  Danger='danger',
  Default='default',
  Link='link'
}

interface BaseButtonProps{
    classname?: string;
    disabled?: boolean;
    btnType?: ButtonType;
    size?: ButtonSize;
    children?: React.ReactNode;
    href? : string
}

const Button : React.FC <BaseButtonProps>=(props)=>{
   const {
     classname,
     disabled,
     btnType,
     size,
     children,
     href
   }=props;

   //btn,btn-lg, btn-primary
   const classes=classNames('btn',{
       [`btn-${btnType}`]: btnType,
       [`btn-${size}`]: size,
       'disabled' : (btnType === ButtonType.Link) && disabled
   }
   )

   if (btnType===ButtonType.Link){
       return (
           <a 
            className={classes}
            href={href}>
               {children}
           </a>
       )
   }
   else{
       return(
           <button 
            className={classes}
            disabled={disabled}
           >

               {children}
           </button>
       )
   }
}

Button.defaultProps={
    disabled:false,
    btnType:ButtonType.Default
}

export default Button;