import React from "react";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";
import Images from "imageExporter/qq-race-match";
import './matchTimeLine.less';

@inject("store")
@observer
class MatchTimeLine extends React.Component{
  componentDidMount = () => {
    this.props.store.fetchStageInfo();
  }
  render(){
    const { stage_info, stage } = this.props.store.stageInfo;
    return (
      <div className="match-tl-container">
      <div className="match-time-line">
        <div className="bar" style={{backgroundImage: `url(${Images["bar.png"]})`}}>
          <div 
            className="match-stage" 
            style={{ width: `${stage / stage_info.length * 100}%`, 
            borderRadius: `${stage === stage_info.length ? '17px' : ''}`}}
          />
        </div>
        { stage_info.map(( info, i ) => <Item info={info} index={i} activeIndex={stage}/>)}
      </div>

      </div>
    )
  }
}
function Item({ info, index, activeIndex }) {
  const { name, date, stage } = info
  return (
    <div className='item' style={{left: `${stage / 4 * 100}%`}}>
      <div className='match-name'>{name}</div>
      <img src={Images[`stage${index + 1}${activeIndex === (index + 1) ? '-active' : ''}.png`]}/>
      <div className='match-time'>{date}</div>
    </div>
  )
  
}

export default MatchTimeLine;