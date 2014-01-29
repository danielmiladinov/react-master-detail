/** @jsx React.DOM */
define([
    'underscore', 'react', 'kendo', 'util',
    'AutoForm', 'MasterDetail',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, kendo, util, AutoForm, MasterDetail,
             ContactModel, contacts) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var contacts = JSON.parse(contacts).data;


    var App = React.createClass({

        getInitialState: function () {
            return {
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
            };
        },

        render: function () {
            return (
                <div className="App">
                    <MasterDetail
                        model={ContactModel} collection={this.state.collection}
                        value={this.state.a.MasterDetail1} onChange={_.partial(this.onChange, ['a', 'MasterDetail1'])} />
                    <button onClick={this.onFormSaveAB}>Save</button>
                    <MasterDetail
                        model={ContactModel} collection={this.state.collection}
                        value={this.state.a.MasterDetail2} onChange={_.partial(this.onChange, ['a', 'MasterDetail2'])} />
                    <button onClick={this.onFormSaveAC}>Save</button>
                    <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
                );
        },

        onChange: function (path, /* more paths,*/ value) {
            path = _.flatten(_.initial(arguments));
            value = _.last(arguments);

            var nextState = util.deepClone(this.state);
            var scoped = getReferenceForPath(nextState, _.initial(path));
            scoped[_.last(path)] = value;
            this.setState(nextState);
        },

        onFormSaveAB: function (path) {
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


    /**
     * Must return a reference into the scoped value (that we can mutate on purpose)
     */
    function getReferenceForPath (value, pathVector) {
        for (var i = 0; i < pathVector.length; i++) {
            value = value[pathVector[i]];
        }
        return value;
    }


    function entrypoint(rootEl) {
        React.renderComponent(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});