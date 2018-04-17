import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { assert } from 'chai';
import { resetDatabase } from "meteor/xolvio:cleaner";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Factory } from "meteor/dburles:factory";

import faker from "faker";

import { Events } from "../Events.js";


//puede comentarse el cógido, pero están todos los tests
if (Meteor.isServer) {
    describe("Events", () => {
        describe('Events.addEvent', () => {
            let currentUserName = faker.internet.userName();
            let currentUser;

            let category = faker.company.companyName();
            let name = faker.internet.userName();
            let place = faker.internet.userName();
            let image = faker.internet.userName();
            let team1 = faker.internet.userName();
            let team2 = faker.internet.userName();
            let date = faker.date.recent();
            let prob1 = faker.random.number();
            let prob2 = faker.random.number();
            let tie = faker.random.number();
            let state = "NOT_STARTED";
            let team1R = 0;
            let team2R = 0;
            let bets1 = 0;
            let bets2 = 0;
            let betsT = 0;

            beforeEach(() => {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUser
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should add event!', () => {
                Meteor.call("Events.addEvent", category, name, place, date, image, team1, team2, prob1, prob2, tie);

                let eAdd = Events.findOne({ name: name });
                assert.isNotNull(eAdd, "Event added!");
            });
        });

        describe('Events.startEvent', () => {

            let eId = "Event1";
            let category = faker.company.companyName();
            let name = faker.internet.userName();
            let place = faker.internet.userName();
            let image = faker.internet.userName();
            let team1 = faker.internet.userName();
            let team2 = faker.internet.userName();
            let date = faker.date.recent();
            let prob1 = faker.random.number();
            let prob2 = faker.random.number();
            let tie = faker.random.number();
            let state = "NOT_STARTED";
            let team1R = 0;
            let team2R = 0;
            let bets1 = 0;
            let bets2 = 0;
            let betsT = 0;

            beforeEach(() => {
                resetDatabase();

                let nEvent = {
                    _id: eId,
                    Category: category,
                    Name: name,
                    Place: place,
                    Image: image,
                    Team1: team1,
                    Team2: team2,
                    Date: date,
                    Prob1: prob1,
                    Prob2: prob2,
                    Tie: tie,
                    State: "NOT_STARTED",
                    Team1R: 0,
                    Team2R: 0,
                    Bets1: 0,
                    Bets2: 0,
                    BetsT: 0,
                    Events: []
                };

                Events.insert(nEvent);
            });

            afterEach(() => {
                resetDatabase();
            });

            it('should start event!', () => {
                Meteor.call("Events.startEvent", eId);

                let event = Events.findOne({ _id: eId });
                assert.equal(event.State, "STARTED", "Event started!");
            });
        });

        describe('Events.endEvent', () => {

            let eId = "Event1";
            let category = faker.company.companyName();
            let name = faker.internet.userName();
            let place = faker.internet.userName();
            let image = faker.internet.userName();
            let team1 = faker.internet.userName();
            let team2 = faker.internet.userName();
            let date = faker.date.recent();
            let prob1 = faker.random.number();
            let prob2 = faker.random.number();
            let tie = faker.random.number();
            let state = "NOT_STARTED";
            let team1R = 0;
            let team2R = 0;
            let bets1 = 0;
            let bets2 = 0;
            let betsT = 0;

            beforeEach(() => {
                resetDatabase();

                let nEvent = {
                    _id: eId,
                    Category: category,
                    Name: name,
                    Place: place,
                    Image: image,
                    Team1: team1,
                    Team2: team2,
                    Date: date,
                    Prob1: prob1,
                    Prob2: prob2,
                    Tie: tie,
                    State: "NOT_STARTED",
                    Team1R: 0,
                    Team2R: 0,
                    Bets1: 0,
                    Bets2: 0,
                    BetsT: 0,
                    Events: []
                };

                Events.insert(nEvent);
            });

            afterEach(() => {
                resetDatabase();
            });

            it('should end the event!', () => {
                Meteor.call("Events.endEvent", eId);

                let event = Events.findOne({ _id: eId });
                assert.equal(event.State, "FINISHED", "Event ended!");
            });
        });

        describe('Events.updateScore', () => {
            let eId = "Event1";
            let category = faker.company.companyName();
            let name = faker.internet.userName();
            let place = faker.internet.userName();
            let image = faker.internet.userName();
            let team1 = faker.internet.userName();
            let team2 = faker.internet.userName();
            let date = faker.date.recent();
            let prob1 = faker.random.number();
            let prob2 = faker.random.number();
            let tie = faker.random.number();
            let state = "NOT_STARTED";
            let team1R = 0;
            let team2R = 0;
            let bets1 = 0;
            let bets2 = 0;
            let betsT = 0;

            beforeEach(() => {
                resetDatabase();

                let nEvent = {
                    _id: eId,
                    Category: category,
                    Name: name,
                    Place: place,
                    Image: image,
                    Team1: team1,
                    Team2: team2,
                    Date: date,
                    Prob1: prob1,
                    Prob2: prob2,
                    Tie: tie,
                    State: "NOT_STARTED",
                    Team1R: 0,
                    Team2R: 0,
                    Bets1: 0,
                    Bets2: 0,
                    BetsT: 0,
                    Events: []
                };

                Events.insert(nEvent);
            });

            afterEach(() => {
                resetDatabase();
            });

            it('should update the score!', () => {
                Meteor.call("Events.updateScore", eId, 1, 2);

                let event = Events.findOne({ _id: eId });
                assert.equal(event.Team1R, 1, "Score updated!");
                assert.equal(event.Team2R, 2, "Score updated!");
            });
        });

        describe('Events.addMatchEvent', () => {
            let eId = "Event1";
            let category = faker.company.companyName();
            let name = faker.internet.userName();
            let place = faker.internet.userName();
            let image = faker.internet.userName();
            let team1 = faker.internet.userName();
            let team2 = faker.internet.userName();
            let date = faker.date.recent();
            let prob1 = faker.random.number();
            let prob2 = faker.random.number();
            let tie = faker.random.number();
            let state = "NOT_STARTED";
            let team1R = 0;
            let team2R = 0;
            let bets1 = 0;
            let bets2 = 0;
            let betsT = 0;

            beforeEach(() => {
                resetDatabase();

                let nEvent = {
                    _id: eId,
                    Category: category,
                    Name: name,
                    Place: place,
                    Image: image,
                    Team1: team1,
                    Team2: team2,
                    Date: date,
                    Prob1: prob1,
                    Prob2: prob2,
                    Tie: tie,
                    State: "NOT_STARTED",
                    Team1R: 0,
                    Team2R: 0,
                    Bets1: 0,
                    Bets2: 0,
                    BetsT: 0,
                    Events: []
                };

                Events.insert(nEvent);
            });

            afterEach(() => {
                resetDatabase();
            });

            it('should add match event!', () => {
                Meteor.call("Events.addMatchEvent", eId, "Evento", 21, 2);

                let event = Events.findOne({ _id: eId });
                assert.equal(event.Events.length, 1, "Match event added!");
            });
        });

        describe('Events.addBet', () => {
            let eId = "Event1";
            let category = faker.company.companyName();
            let name = faker.internet.userName();
            let place = faker.internet.userName();
            let image = faker.internet.userName();
            let team1 = faker.internet.userName();
            let team2 = faker.internet.userName();
            let date = faker.date.recent();
            let prob1 = faker.random.number();
            let prob2 = faker.random.number();
            let tie = faker.random.number();
            let state = "NOT_STARTED";
            let team1R = 0;
            let team2R = 0;
            let bets1 = 0;
            let bets2 = 0;
            let betsT = 0;

            beforeEach(() => {
                resetDatabase();

                let nEvent = {
                    _id: eId,
                    Category: category,
                    Name: name,
                    Place: place,
                    Image: image,
                    Team1: team1,
                    Team2: team2,
                    Date: date,
                    Prob1: prob1,
                    Prob2: prob2,
                    Tie: tie,
                    State: "NOT_STARTED",
                    Team1R: 0,
                    Team2R: 0,
                    Bets1: 0,
                    Bets2: 0,
                    BetsT: 0,
                    Events: []
                };

                Events.insert(nEvent);
            });

            afterEach(() => {
                resetDatabase();
            });

            it('should add bet to event!', () => {
                Meteor.call("Events.addBet", eId, 10, 0, 5);

                let event = Events.findOne({ _id: eId });
                assert.equal(event.Bets1, 1, "Bet added to event!");
                assert.equal(event.Bets2, 0, "Bet added to event!");
                assert.equal(event.BetsT, 1, "Bet added to event!");
            });
        });
    });
}
