/** @jsx React.DOM */
define([
    'underscore', 'react', 'mori', 'AutoForm',
    'Timer'
], function (_, React, m, AutoForm, Timer) {
    'use strict';


    var MasterDetail = React.createClass({

        getDefaultProps: function () {
            return {
                model: undefined,
                collection: undefined,
                cursor: undefined
            };
        },

        render: function () {
            debugger;
            var list = m.map(function (record) {
                debugger;
                return (<li><a href="javascript:void(0)" onClick={_.partial(this.onTargetChange, record.get('id'))}>{record.get('lastName')}</a></li>);
            }.bind(this), this.props.collection);

            return (
                <div className="MasterDetail">
                    <ol>{list}</ol>
                    <AutoForm model={this.props.model} cursor={this.props.cursor.extend(['formValue'])} />
                    <Timer cursor={this.props.cursor.extend(['timer1'])} />
                    <Timer cursor={this.props.cursor.extend(['timer2'])} />
                </div>
            );
        },

        onTargetChange: function (recordId) {
            // dirty check here
            this.props.onChange(['formValue'], _.findWhere(this.props.collection, { id: recordId }));
        }
    });


    return MasterDetail;
});