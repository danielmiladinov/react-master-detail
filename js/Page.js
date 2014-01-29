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
                    b: {
                        formValue: {} // value the editor is currently targetting
                    },

                    c: {
                        formValue: {}
                    }
                }
            };
        },

        render: function () {
            return (
                <div className="App">
                    <MasterDetail
                        model={ContactModel} collection={this.state.collection}
                        formValue={this.state.a.b.formValue} onFormChange={this.onChangeABForm} />
                    <button onClick={this.onFormSaveAB}>Save</button>
                    <MasterDetail
                        model={ContactModel} collection={this.state.collection}
                        formValue={this.state.a.c.formValue} onFormChange={this.onChangeACForm} />
                    <button onClick={this.onFormSaveAC}>Save</button>
                    <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
            );
        },

        onChangeABForm: function (value) {
            var nextState = util.deepClone(this.state);
            nextState.a.b.formValue = value;
            this.setState(nextState);
        },

        onFormSaveAB: function () {
            var record = _.findWhere(this.state.collection, { id: this.state.a.b.formValue.id });
            var nextRecord = $.extend(true, {}, record, this.state.a.b.formValue, { revision: this.state.a.b.formValue.revision + 1 });

            // subtract out the stale record (old revision)
            // union in the new record into the nextCollection
            var nextCollection = util.differenceDeep(this.state.collection, [record]);
            nextCollection = util.unionDeep(nextCollection, [nextRecord]);

            var nextState = util.deepClone(this.state);
            nextState.collection = nextCollection;
            nextState.a.b.formValue = nextRecord;
            this.setState(nextState);
        },

        onChangeACForm: function (value) {
            var nextState = util.deepClone(this.state);
            nextState.a.c.formValue = value;
            this.setState(nextState);
        },

        onFormSaveAC: function () {
            var record = _.findWhere(this.state.collection, { id: this.state.a.c.formValue.id });
            var nextRecord = $.extend(true, {}, record, this.state.a.c.formValue, { revision: this.state.a.c.formValue.revision + 1 });

            // subtract out the stale record (old revision)
            // union in the new record into the nextCollection
            var nextCollection = util.differenceDeep(this.state.collection, [record]);
            nextCollection = util.unionDeep(nextCollection, [nextRecord]);


            var nextState = util.deepClone(this.state);
            nextState.collection = nextCollection;
            nextState.a.c.formValue = nextRecord;
            this.setState(nextState);
        }
    });


    function entrypoint(rootEl) {
        React.renderComponent(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});
