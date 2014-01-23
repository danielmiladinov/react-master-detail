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
                formValue: {} // value the editor is currently targetting
            };
        },

        render: function () {
            return (
                <div className="App">
                    <MasterDetail
                        model={ContactModel} collection={this.state.collection}
                        formValue={this.state.formValue}
                        onFormChange={this.onFormChange} />
                    <button onClick={this.onFormSave}>Save</button>
                    <pre>{JSON.stringify(this.state.collection, undefined, 2)}</pre>
                </div>
            );
        },

        onFormChange: function (value) {
            //var nextCollection = $.extend(true, [], this.state.collection);
            //var nextRecord = _.findWhere(nextCollection, { id: value.id });
            //_.extend(nextRecord, value, { revision: value.revision + 1 });

            this.setState({
                //collection: nextCollection,
                formValue: value
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
