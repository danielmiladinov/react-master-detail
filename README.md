react-master-detail
===================

Simple master/detail CRUD editor in react.

# how to build and run

This project has a mandatory frontend build step.

1. install dependencies - Node, Grunt, Bower

    brew install node
    npm install -g grunt-cli
    npm install -g bower

2. prepare for build

    npm install    # fetch node plugins for mandatory build step
    bower install  # fetch js dependencies

3. build the `wingspan-forms` dependency (sorry, I just open sourced this in Janurary and it has rough edges)

    cd bower_components/wingspan-forms
    npm install                   # this is a seperate project which also uses node plugins
    bower install                 # and has its own dependencies
    grunt react less requirejs    # do the library build

4. build the actual app

    cd ../..   # back to app directory
    grunt react less

5. serve the app from the project directory on localhost, using `python -m SimpleHTTPServer` or something

6. browse to index.html


