import React from 'react'
import './CountDisplay.scss'
import styled from 'styled-components'



export default function CountDisplay(props){
    const { slideLog, slideCounter } = props
    const highlightCalc = 38*slideCounter
    const highlightPos = highlightCalc.toString() + 'px'
    const Highlight = styled.div`
        position: absolute;
        top: 0px;
        left: ${highlightPos};
        width: 35px;
        height: 35px;
        background-color: #FFBD00;
        z-index: -1;
    `
    return(
        <div className='count-wrapper'>
            <div className='slide-counter'>
                {
                    slideLog.map((slide, index) => (
                        ( index<9 ? <h2 className='count' key={index}>0{index+1}</h2> : <h2 className='count' key={index}>{index+1}</h2>)
                    ))  
                }
                <Highlight></Highlight>
            </div>
        </div>
        
    )
}
