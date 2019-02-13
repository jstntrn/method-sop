import React from 'react'
import './CountDisplay.css'
import styled from 'styled-components'



export default function CountDisplay(props){
    const { slideLog, slideCounter } = props
    const highlightCalc = 130 + 38*slideCounter
    const highlightPos = highlightCalc.toString() + 'px'
    const Highlight = styled.div`
        position: absolute;
        top: 70px;
        left: ${highlightPos};
        width: 35px;
        height: 35px;
        background-color: #FFBD00;
        z-index: -1;
    `
    return(
        <div className='count-wrapper'>
            <div class='slide-counter'>
                {
                    slideLog.map((slide, index) => (
                        ( index<9 ? <h2 className='count'>0{index+1}</h2> : <h2 className='count'>{index+1}</h2>)
                    ))  
                }
            </div>
            <Highlight></Highlight>
        </div>
        
    )
}
