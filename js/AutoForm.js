/** @jsx React.DOM */
define([
    'underscore', 'react', 'kendo', 'wingspan-forms'
], function (_, React, kendo, Forms) {
    'use strict';


    var AutoForm = React.createClass({

        getDefaultProps: function () {
            return {
                model: undefined,
                value: undefined,
                onChange: undefined
            };
        },

        componentWillMount: function () {
            // Initialize datastores
            _.each(this.props.model.properties, function (fieldInfo) {
                if (fieldInfo.options) {
                    fieldInfo.options.dataSource = new kendo.data.DataSource(fieldInfo.options);
                }
            }.bind(this));
        },

        render: function () {
            var controls = _.map(this.props.model.properties, function (fieldInfo) {
                return (
                    <FormField fieldInfo={fieldInfo} layout="formFieldInline" key={fieldInfo.name}>
                        <AutoControl
                            fieldInfo={fieldInfo}
                            value={this.props.value[fieldInfo.name]}
                            onChange={_.partial(this.onFieldChange, fieldInfo.name)} />
                    </FormField>
                );
            }.bind(this));

            return (
                <div className="AutoForm" >
                    {controls}
                    <div className="formClear"/>
                </div>
            );
        },

        onFieldChange: function (fieldName, value) {
            var nextValue = _.extend({}, this.props.value, _.object([[fieldName, value]]))
            this.props.onChange(nextValue);
        }
    });

    var FormField = Forms.FormField;
    var AutoControl = Forms.AutoControl;

    return AutoForm;
});
