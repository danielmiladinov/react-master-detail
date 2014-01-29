/** @jsx React.DOM */
define([
    'underscore', 'react', 'kendo', 'AutoForm', 'MasterDetail',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, kendo, AutoForm, MasterDetail,
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
                    <button onClick={this.onFormSave}>Save</button>
                    <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
            );
        },

        onChangeABForm: function (value) {
            this.setState({ a: { b: { formValue: value }}});
        },

        onFormSave: function () {
            var nextCollection = $.extend(true, [], this.state.collection);
            var nextRecord = _.findWhere(nextCollection, { id: this.state.a.b.formValue.id });
            // the record is a ref into the collection, mutate it
            _.extend(nextRecord, this.state.a.b.formValue, { revision: this.state.a.b.formValue.revision + 1 });
            this.setState({
                collection: nextCollection,
                a: { b: { formValue: nextRecord }}
            });
        }
    });


    function entrypoint(rootEl) {
        React.renderComponent(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});
