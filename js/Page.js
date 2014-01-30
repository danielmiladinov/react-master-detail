/** @jsx React.DOM */
define([
    'underscore', 'react', 'kendo', 'mori', 'util',
    'AutoForm', 'MasterDetail',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, kendo, m, util, AutoForm, MasterDetail,
             ContactModel, contacts) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var contacts = JSON.parse(contacts).data;


    //        value={m.get_in(this.props.appState, ['a', 'MasterDetail2', 'timer2'])}
//    onChange={this.props.reset(_.partial(m.assoc_in, this.props.appState, ['a', 'MasterDetail2', 'timer2']))}
//reset={this.props.reset}



    function Cursor(app, appState, path) {
        this.app = app;
        this.appState = appState;
        this.path = path;
    }
    Cursor.prototype = {
        get: function (path) {
            if (path === undefined) {
                return m.get_in(this.appState, this.path);
            }

            if (!_.isArray(path)) { path = [path]; }
            return m.get_in(this.appState, this.path.concat(path || []));
        },
        set: function (path) {
            this.reset(_.partial(m.assoc_in, this.appState, this.path.concat(path || [])));
        },
        reset: function(fNextState) {
            return (function () {
                var nextState = fNextState();
                this.app.setProps({ appState: nextState });
            }.bind(this));
        },
        extend: function (path) {
            return new Cursor(this.app, this.appState, this.path.concat(path));
        },
        empty: function () {
            return {
                get: function () { return ''; },
                set: function () {},
                extend: function () { return Cursor.prototype.empty(); },
                empty: function () { return Cursor.prototype.empty(); }
            }
        }
    };

    var App = React.createClass({

        render: function () {
            return (
                <div className="App">
                    <MasterDetail
                        model={ContactModel} collection={this.props.cursor.get('collection')}
                        cursor={this.props.cursor.extend(['a', 'MasterDetail2'])} />
                    <button onClick={this.onFormSaveAB}>Save</button>

                    <MasterDetail
                        model={ContactModel} collection={this.props.cursor.get('collection')}
                        cursor={this.props.cursor.extend(['a', 'MasterDetail2'])} />
                    <button onClick={this.onFormSaveAC}>Save</button>

                    <pre>{JSON.stringify(m.clj_to_js(this.props.cursor.get()), undefined, 2)}</pre>
                </div>
            );
        },

        onFormSaveAB: function () {
            var collection = this.props.cursor.get('collection');



            var record = _.findWhere(this.state.collection, { id: this.state.a.MasterDetail1.formValue.id });
            var nextRecord = $.extend(true, {}, record, this.state.a.MasterDetail1.formValue, { revision: this.state.a.MasterDetail1.formValue.revision + 1 });

            // subtract out the stale record (old revision)
            // union in the new record into the nextCollection
            var nextCollection = util.differenceDeep(this.state.collection, [record]);
            nextCollection = util.unionDeep(nextCollection, [nextRecord]);

            var nextState = util.deepClone(this.state);
            nextState.collection = nextCollection;
            nextState.a.MasterDetail1.formValue = nextRecord;
            this.setState(nextState);
        },

        onFormSaveAC: function () {
            var record = _.findWhere(this.state.collection, { id: this.state.a.MasterDetail2.formValue.id });
            var nextRecord = $.extend(true, {}, record, this.state.a.MasterDetail2.formValue, { revision: this.state.a.MasterDetail2.formValue.revision + 1 });

            // subtract out the stale record (old revision)
            // union in the new record into the nextCollection
            var nextCollection = util.differenceDeep(this.state.collection, [record]);
            nextCollection = util.unionDeep(nextCollection, [nextRecord]);


            var nextState = util.deepClone(this.state);
            nextState.collection = nextCollection;
            nextState.a.MasterDetail2.formValue = nextRecord;
            this.setState(nextState);
        }
    });


    var appState = m.js_to_clj({
        collection: contacts, // source of truth/database state
        a: {
            MasterDetail1: {
                formValue: {}, // value the editor is currently targetting
                timer1: 7,
                timer2: 1
            },

            MasterDetail2: {
                formValue: {},
                timer1: 3,
                timer2: 5
            }
        }
    });


    function entrypoint(rootEl) {

        var app = React.renderComponent(<App cursor={Cursor.prototype.empty()} />, rootEl);

        app.setProps({ cursor: new Cursor(app, appState, [])});
    }

    return {
        entrypoint: entrypoint
    };
});