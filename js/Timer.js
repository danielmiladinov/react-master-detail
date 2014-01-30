/** @jsx React.DOM */
define([
    'react'
], function (React) {
    'use strict';

    var Timer = React.createClass({

        getDefaultProps: function () {
            return {
                cursor: undefined
            };
        },

        tick: function() {
            this.props.cursor.set(this.props.cursor.get() + 1);
        },

        componentDidMount: function() {
            this.interval = setInterval(this.tick, 1000);
        },

        componentWillUnmount: function() {
            clearInterval(this.interval);
        },

        render: function() {
            return (<div>{'Seconds Elapsed: ' + this.props.cursor.get()}</div>);
        }
    });

    return Timer;
});