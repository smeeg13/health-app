
import ReactSlider from "react-slider";

function Slider (props){
    return (
        <ReactSlider
            className="customSlider"
            trackClassName="customSlider-track"
            thumbClassName="customSlider-thumb"
            markClassName="customSlider-mark"
            marks={20}
            min={props.min}
            max={props.max}
            defaultValue={0}
            value={props.value}
        />
    );
};

export default Slider;