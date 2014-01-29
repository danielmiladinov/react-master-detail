/** @jsx React.DOM */
define([
    'underscore', 'react', 'AutoForm'
], function (_, React, AutoForm) {
    'use strict';


    var MasterDetail = React.createClass({

        getDefaultProps: function () {
            return {
                model: undefined,
                collection: undefined,
                value: undefined,
                onChange: undefined     // any time the value of the form changes
            };
        },

        render: function () {
            var list = _.map(this.props.collection, function (record) {
                return (<li><a href="javascript:void(0)" onClick={_.partial(this.onTargetChange, record.id)}>{record.lastName}</a></li>);
            }.bind(this));

            return (
                <div className="MasterDetail">
                    <ol>{list}</ol>
                    <AutoForm
                        model={this.props.model}
                        value={this.props.value}
                        onChange={_.partial(this.props.onChange)} />
                </div>
            );
        },

        onTargetChange: function (recordId) {
            // dirty check here
            this.props.onChange(_.findWhere(this.props.collection, { id: recordId }));
        }
    });


    return MasterDetail;
});