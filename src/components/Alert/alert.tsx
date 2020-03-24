import React,{useState} from 'react';
import classNames from 'classnames';

export enum AlertType{
    Success='success',
    Default='default',
    Warning='warning',
    Danger='danger'
}

interface BaseAlertProps{
    idName : string
    title ?: string;
    warning ?: string;
    content ?: string;
    altType ?: string;
    isOpen?:boolean
}

const Alert : React.FC<BaseAlertProps>=(props)=>{
   const {
       idName,
       isOpen,
       title,
       warning,
       content,
       altType
   }=props;


   const classes=classNames('alert',{
       [`alert-${altType}`]:altType,
       [`${idName}`]: true
   })

   function close(){
      document.getElementsByClassName(`${idName}`)[0].setAttribute('style',`display : none`);
   }


return(
      <div className={classes}>
        <button className='btn-close' type='button' onClick={close}>close</button>
        <h5>{title}</h5>     
        <p>{content}</p>
      </div>
        )
  
    
    
    
   
   Alert.defaultProps={
      isOpen:false,
      altType: AlertType.Default
   }
}

export default Alert;
