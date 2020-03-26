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

type NativeButtonProps= BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps= BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps= Partial<NativeButtonProps & AnchorButtonProps>;

interface BaseButtonProps{
    classname?: string;
    disabled?: boolean;
    btnType?: ButtonType;
    size?: ButtonSize;
    children?: React.ReactNode;
    href? : string
}

const Button : React.FC <ButtonProps>=(props)=>{
   const {
     classname,
     disabled,
     btnType,
     size,
     children,
     href,
     ...restProps
   }=props;

   //btn,btn-lg, btn-primary
   const classes=classNames('btn',{
       [`btn-${btnType}`]: btnType,
       [`btn-${size}`]: size,
       'disabled' : (btnType === ButtonType.Link) && disabled,
       [`${classname}`]: classname
    }
   )

   if (btnType===ButtonType.Link){
       return (
           <a 
            {...restProps}
            className={classes}
            href={href}>
               {children}
           </a>
       )
   }
   else{
       return(
           <button 
            {...restProps}
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