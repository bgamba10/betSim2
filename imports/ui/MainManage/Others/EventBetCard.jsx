import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddBetModal from "../Modals/AddBetModal.jsx";
import "../../css/EventBetCard.css";


class EventBetCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colSize: "col-md-3"
        };
    }

    AddBet(b1, b2, bT, eR1, eR2, eRt) {
        let eInfo = this.props.eventInfo[0];
        //console.log( "EventBetCard earnings: " + eR1 + "-" + eR2 + "-" + eRt);

        this.props.AddBet(eInfo._id, eInfo.Prob1, eInfo.Prob2, eInfo.Tie, b1, b2, bT, eR1, eR2, eRt, eInfo.Team1, eInfo.Team2);
    }

    getFee(percent) {
        let res = 100 / percent;

        return Math.round(res * 100) / 100;
    }

    componentDidMount() {
        if (this.state.colSize) {
            window.addEventListener('resize', () => {
                let nColSize = "col"

                let width = window.innerWidth;
                console.log("EventBetCard | Width: " + width);

                if (width >= 1500) {
                    nColSize = "col-md-3";
                } else if (width > 900 && width < 1500) {
                    nColSize = "col-md-4";
                } else {
                    nColSize = "col-md-6";
                }

                this.setState({ colSize: nColSize });
            }, false);
        }
    }

    loadEventBets(eInfo) {
        //console.log("EventBetCard | Bets: ");
        //console.log(this.props.eventBetsInfo);

        let res = "Loading...";
        let bInfo = this.props.eventBetsInfo;

        let State = eInfo.State;
        let Team1R = eInfo.Team1R;
        let Team2R = eInfo.Team2R;
        //console.log("Bets of event: ");
        //console.log(bInfo);
        //console.log(eInfo);
        //console.log("LoadEventBets | Event state: " + State);
        //console.log("LoadEventBets | Event results: " + Team1R + " - " + Team2R);

        res = []
        for (let i = 0; i < bInfo.length; i++) {
            let e = bInfo[i];
            let T1R = "warning";
            let T2R = "warning";
            let TieR = "warning";

            if(State == "FINISHED"){
                if(Team1R > Team2R){
                    T1R = "success";
                    T2R = "danger";
                    TieR = "danger";
                }else if (Team1R < Team2R){
                    T1R = "danger";
                    T2R = "success";
                    TieR = "danger";
                }else{
                    T1R = "danger";
                    T2R = "danger";
                    TieR = "success";
                }
            }

            res.push(
                <div key={"Bet#" + (i + 1) + "Of" + eInfo.Name} className="row myBetGroup">
                    <div className="btn-group myButtonGroup container">
                        <span className="badge badge-warning myBetTitle">{this.getFee(e.Prob1)}</span>
                        <span className="badge badge-warning myBetTitle">{this.getFee(e.ProbT)}</span>
                        <span className="badge badge-warning myBetTitle">{this.getFee(e.Prob2)}</span>
                    </div>

                    <div className="btn-group myButtonGroup container">
                        <span className={"badge myBetAmount badge-" + T1R}>{e.Team1}</span>
                        <span className={"badge myBetAmount badge-" + TieR}>{e.Tie}</span>
                        <span className={"badge myBetAmount badge-" + T2R}>{e.Team2}</span>
                    </div>
                </div>
            );
        }

        return res;
    }
    
    GenerateEventPage(eId){
        this.props.GenerateEventPage(eId);
    }

    render() {

        const txtLoading = "Loading...";
        let Name = txtLoading;
        let Place = txtLoading;
        let Date = txtLoading;
        let Image = "Basic_Event.png";
        let Team1 = txtLoading;
        let Team2 = txtLoading;
        let Prob1 = txtLoading;
        let Tie = txtLoading;
        let Prob2 = txtLoading;
        let State = null;
        let Team1R = 0;
        let Team2R = 0;

        let eInfo = this.props.eventInfo;
        let bInfo = this.props.eventBetsInfo;

        let actBetsEarnings = 0;

        //console.log("EventBetCard | Event info: ");
        //console.log(eInfo);
        let modal = "Loading event info...";
        let fDate = <h5 className="card-title subTitle">{eInfo.Date}</h5>;
        let isOver = "";
        let showResult = "none";
        let team1RI = "danger";
        let team2RI = "danger";

        if (eInfo != null && eInfo != undefined && eInfo.length > 0) {
            eInfo = eInfo[0];

            //console.log(eInfo);

            Name = eInfo.Name;
            Place = eInfo.Place;
            Date = eInfo.Date;
            Image = eInfo.Image;
            Team1 = eInfo.Team1;
            Team2 = eInfo.Team2;
            Prob1 = eInfo.Prob1;
            Tie = eInfo.Tie;
            Prob2 = eInfo.Prob2;
            State = eInfo.State;
            Team1R = eInfo.Team1R;
            Team2R = eInfo.Team2R;

            modal = <AddBetModal eventInfo={eInfo} fromW="betCard" AddBet={(b1, b2, bT, eR1, eR2, eRt) => this.AddBet(b1, b2, bT, eR1, eR2, eRt)} />;

            bInfo.map(e => {
                actBetsEarnings += e.Earnings;
            });
            //console.log(actBetsEarnings);           
            
            if (State == "STARTED") {
                fDate = <h5 className="card-title txtLive">Now live!</h5>;
            } else if (State == "FINISHED") {
                fDate = <h5 className="card-title txtFinished">The event is over!</h5>;
                isOver = " none";
                showResult = "";
            }

            if(Team1R > Team2R){
                team1RI = "success";
            }else if (Team1R < Team2R){
                team1RI = "success";
            }else{
                team1RI = "warning";
            }
        }

        //console.log("Event Bet Card | Event info: ");
        //console.log(eInfo);

        return (
            <div id={Name} className={this.state.colSize + " myBetCard"}>
                <div className="card myCard">
                    <img className="card-img-top" src={"img/" + Image} alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-title">{Name}</h4>
                        <h5 className="card-title subTitle">{Place}</h5>
                        {fDate}

                        <div className="btn-group myButtonGroup">
                            <span className="badge badge-primary myButtonGroup">{Team1}</span>
                            <span className="badge badge-secondary myButtonGroup">Tie</span>
                            <span className="badge badge-primary myButtonGroup">{Team2}</span>
                        </div>

                        <div className="btn-group myButtonGroup" role="group" aria-label="Match is over" style={{ display: isOver }}>
                            <button type="button" className="btn btn-primary myButtonOnGroup" data-toggle="modal" data-target={"#Add" + Name + "betCardBetModal"}>{"" + this.getFee(Prob1)}</button>
                            <button type="button" className="btn btn-secondary myButtonOnGroup" data-toggle="modal" data-target={"#Add" + Name + "betCardBetModal"}>{"" + this.getFee(Tie)}</button>
                            <button type="button" className="btn btn-primary myButtonOnGroup" data-toggle="modal" data-target={"#Add" + Name + "betCardBetModal"}>{"" + this.getFee(Prob2)}</button>
                        </div>

                        <div className="btn-group myButtonGroup" role="group" aria-label="Results of game" style={{ display: showResult }}>
                            <span className={"badge myButtonGroup badge-" + team1RI}>{eInfo.Team1R}</span>
                            <span className={"badge myButtonGroup badge-" + team2RI}>{eInfo.Team2R}</span>
                        </div>

                        <hr className="my-4" />
                        <h5 className="card-title">Bets...</h5>

                        { eInfo && eInfo != undefined ? this.loadEventBets(eInfo) : ""}

                        <hr className="my-4" />

                        <button onClick={() => this.GenerateEventPage(eInfo._id)} className="btn btn-outline-info myCardButton" type="submit">More info</button>
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}

EventBetCard.propTypes = {
    eventBetsInfo: PropTypes.array.isRequired,
    eventInfo: PropTypes.array.isRequired
}

export default EventBetCard;
