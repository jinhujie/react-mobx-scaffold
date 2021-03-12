import React from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';

import { BackgroundContainer, BackgroundedDropdown } from 'components';

import './container.less';
import * as Images from './images';
import matchTimeline from "assets/image/matchTimeline.png";
import { options } from 'less';

const classNames = {
    displayHidden: "display-hidden",
}

@inject('store')
@observer class Root extends React.Component{
    
  render() {
    return <React.Fragment>
        <h1 className={classNames.displayHidden}>QQ飞车赛事</h1>
        <BackgroundContainer bgSrc={Images.bg} classExt="main">
            <div className="background">
                <img src={matchTimeline} style={{marginTop: '40%'}} className="centerBlock"></img>
                <SignupInfo />
                <img src={Images.matchRule} className="centerBlock matchRuleExt"/>
                {/* <Rewards /> */}
                <img src={Images.extralSummary} className="centerBlock extralSummary"/>
                <br/>
                <div className='raw'>
                    <span>在法律许可范围内，公司有随时调整活动的权利并享有活动的最终解释权，请详细了解规则后再参与</span>
                    <div className='split'/>
                    <span>如有疑问请联系在线客服或客服QQ：800184580进行咨询。</span>
                </div>
            </div>
        </BackgroundContainer>
    </React.Fragment>
  }
}

@inject('store')
@observer class SignupInfo extends React.Component{
    componentDidMount () {
        this.props.store.fetchSignupInfo();
    }
    onSubmit = () => {
        const { uid } = this.props.store.signupInfo;
        const isLogined = uid > 0;
        if (isLogined) {
            this.props.store.signup();
        } else {
            window.showLogin();
        }
    }
    render() {
        const { setSignupInfo } = this.props.store;
        const { name, game_name, requiredListTitle, qq, mobile } 
            = this.props.store.signupInfo;

        return (
            <section className="section-sinup">
                <h1 className={classNames.displayHidden}>比赛报名</h1>

                <img src={Images.signupTitle} style={{marginTop: 42}} className="centerBlock"></img>
                <section className="login">
                  { name 
                    ? (
                        <React.Fragment>
                            <span className="platformNameLabel">平台昵称:</span>
                            <span className="platformNameValue">{name}</span>
                        </React.Fragment>
                    )
                    : null
                  }
                </section>

                <BackgroundContainer 
                    classExt='signup-form-bg'
                    bgSrc={Images.signupFormBg}>
                        <div className='signup-form'>

                    <div className='form-item'>
                    <label>游戏昵称</label>
                    <BackgroundContainer bgSrc={Images.signupFormInput}>
                        <input 
                            value={game_name}
                            onChange={e => setSignupInfo('game_name', e.target.value)}
                            className="transpant-input" placeholder="所指定区服游戏昵称"></input>
                    </BackgroundContainer>
                    </div>

                    <div className='form-item'>
                        <label>所属厅</label>
                        <SignupInfoTing />
                    </div>

                    <div className='form-item'>
                    <label>QQ号</label>
                    <BackgroundContainer bgSrc={Images.signupFormInput}>
                        <input 
                            value={qq}
                            onChange={e => setSignupInfo('qq', e.target.value)}
                            className="transpant-input"></input>
                    </BackgroundContainer>
                    </div>

                    <div className='form-item'>
                    <label>手机号</label>
                    <BackgroundContainer bgSrc={Images.signupFormInput}>
                        <input
                            value={mobile}
                            onChange={e => setSignupInfo('mobile', e.target.value)}
                            className="transpant-input"></input>
                    </BackgroundContainer>
                    </div>

                    <div className='form-item join-qq-commonutiy'>
                        <label>添加群聊</label>
                        <BackgroundContainer bgSrc={Images.joinQqCommuBtn} classExt="join-qq-btncon">
                            <div className='join-btn'>点击加入报名群</div>
                        </BackgroundContainer>
                        <span className='pushbefore'>用于赛前通知</span>
                        {/* <div className='join-qq-commonutiy'/> */}
                    </div>

                    <div className='form-item'>
                    <label>要求区服</label>
                    <BackgroundContainer bgSrc={Images.signupFormInput}>
                        <input className="transpant-input"
                            value={requiredListTitle} disabled />
                    </BackgroundContainer>
                    </div>
                        </div>
                    
                    <img  
                        onClick={this.onSubmit}
                        src={Images.signupSubmit} className='submit'/>
                    {/* <BackgroundContainer bgSrc={Images.signupFormInput}>
                        <div className='dropdown-option'></div>
                    </BackgroundContainer>
                    <BackgroundedDropdown
                        options={listDropdownOptions}
                    /> */}
                </BackgroundContainer>

            </section>
        )
    }
}

@inject('store')
@observer class SignupInfoTing extends React.Component{
    state = { shown: false }
    componentDidUpdate = () => {
        if (this.state.shown) {
            window.addEventListener('click', this.closeOptions.bind(this))
        }else{
            window.removeEventListener('click', this.closeOptions.bind(this))
        }
    }
    closeOptions () {
        this.setState({ shown: false })
    }
    onOptionClick = (e, option) => {
        e.stopPropagation();
        this.setState({shown: false});
        this.props.store.setSignupInfo('cid', option.id);
    }
    onSelectClick = (e) => {
        e.stopPropagation();
        this.setState({shown: !this.state.shown});
    }
    findListByCid = (cid, options) => {
        return options.find(option => option.id === cid) || {};
    }

    render() {
        const { list, cid } = this.props.store.signupInfo;
        const { shown } = this.state;
        const listDropdownOptions = [];
        if (!Array.isArray(list)) {
            const toJS_list = toJS(list);
            Object.values(toJS_list).map(obj => {
                listDropdownOptions.push(obj);
            });
        }

        return (
            <React.Fragment>
                <span onClick={this.onSelectClick} className='pointer'>

                <BackgroundContainer bgSrc={Images.signupFormInput}>
                    <input 
                        className="transpant-input" value={this.findListByCid(cid, listDropdownOptions).title} disabled></input>
                </BackgroundContainer>
                </span>
                <div className='ting-options'>
                    { shown 
                    ? listDropdownOptions.map(option => {
                        return (
                            <div
                                onClick={e => this.onOptionClick(e, option)}
                                className='option'
                                key={option.id}>{option.title}</div>
                        )
                    })
                    :null
                    }
                </div>
            </React.Fragment>
        )
    }
}

// const Rewards = () => {
//     return (
//         <BackgroundContainer bgSrc={Images.rewardBg} classExt='rewardBg'>
//             <img src={Images.rewardFinalTitle} />
//         </BackgroundContainer>
//     )
// }

export default Root;