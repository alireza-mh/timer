import React, {useEffect, useRef, useState} from 'react';
import './style.css';

/**
 * @interface Timer Component IProps
 */
interface ITimerProps extends React.HTMLProps<HTMLDivElement> {
}


interface IAllDigits extends React.HTMLProps<HTMLDivElement> {
}

const AllDigits: React.FC<IAllDigits> = (props: IAllDigits) => {
    const {style, ...rest} = props;
    return (<div className='react-timer_digit-container' style={style} {...rest}>
        <div>0</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
    </div>);
}
/**
 * @param props: ITimerProps
 */
const Timer: React.FC<ITimerProps> = (props: ITimerProps) => {
    const [time, updateTime] = useState<number>(9);
    useEffect(() => {
        setInterval(() => updateTime(prevTime => prevTime === 0 ? 0  : prevTime - 1) , 1000)
    }, [])
    return (
        <div className='react-timer'>
            <div className='react-timer-decimal'>
                <AllDigits style={{marginTop: `${-(23*time)}px`}}/>
            </div>
        </div>
    );
};

export default Timer;
