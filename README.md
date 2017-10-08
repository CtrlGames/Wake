# Wake
wake

#### Dependencies
 - Node >= v6 & NPM >= v3
 
#### Environment setup
 - clone repository ( suprise, suprise )
 - run `npm install`
 - run `npm start` ( see build commands )
 
#### build commands
 Wake uses NPM as its build manager and utilizes the scripts section of the package.json to define its build commands.
 We use the Riot.js framework, Babel for esNext features, and sass. There is a general build, that will build all three parts and individal commands for each.
 There is also a lint.

 - `build:tags` compile the riot.js tags
 - `build:tags:watch` compile riot.js tags and watch for tag changes
 - `build:js` compile logic JS
 - `build:js:watch` compile logic JS and watch for JS changes
 - `build:sass` compile styles
 - `build:sass:watch` compile styles and watch for sass changes
 - `build` compile everything
 - `build:watch` compile everything and watch for all changes
 - `lint` lint files
 - `start` start an http-server and the build:watch command
