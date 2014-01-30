/** @jsx React.DOM */
define([
    'underscore', 'react', 'kendo', 'wingspan-forms'
], function (_, React, kendo, Forms) {
    'use strict';


    var AutoForm = React.createClass({

        getDefaultProps: function () {
            return {
                model: undefined,
                cursor: undefined
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
                            value={this.props.cursor.get(fieldInfo.name)}
                            onChange={_.partial(this.props.cursor.set, [fieldInfo.name])} />
                    </FormField>
                );
            }.bind(this));

            return (
                <div className="AutoForm" >
                    {controls}
                    <div className="formClear"/>
                </div>
            );
        }
    });

    var FormField = Forms.FormField;
    var AutoControl = Forms.AutoControl;

    return AutoForm;
});
