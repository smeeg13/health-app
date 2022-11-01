// const Slider = (props) => {
//     return (
//         <div>
//             <input
//                 type="range"
//                 name={props.question.resName}
//                 min={props.question.min}
//                 max={props.question.max}
//                 value={props.value}
//                 onChange={props.handleFormInputChange}
//                 step="1"
//                 className="custom-slider"
//             />
//         </div>

//     );
// };

// export default Slider;
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