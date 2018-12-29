import React from 'react'

function calcArea (width,height){
    console.log(height)
    if(!height&&!width){
        return "You didn't enter width or height!"
    }
    if(!height){
        height=width
        var area=width*height
        
    }
    else{
     area = width*height
    }
    return "The width entered is "+width+"\nThe height entered is "+height+"\nThe area is "+area
    

    // var w=width;
    // var h=height||width;
    // return w*h

}
class CalArea extends React.Component{
   
    
      

    render() {
        var width = this.props.width;
        
        if(!height){
            height = this.props.width;
        }
        else{
            var height=this.props.height;
        }
        return<div>
            
            
            <span >{calcArea(this.props.width,this.props.height)}</span>
            <div style={{width:width, height:height, backgroundColor:"yellow"}}></div>
        </div>
            
        
    }
}

// CalArea.defaulProps = {
//     width:50,
//     height:null,
// }


export default CalArea