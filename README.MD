# ANGULAR2 REDUX ES6 SEED #

An Angular2 + Redux + ES2015 Seed to get you started.

## Getting started ##
1. Download this repo or git clone https://github.com/JSO-Technologies/angular-webpack-seed.git
2. From the repo folder run:
3. npm install
4. npm start
5. open http://localhost:3000/ in the browser or http://localhost:3000/webpack-dev-server/ to play with the hot reloading

This repository contain a starting seed to bootstrap your angular2 + redux + ES6 project.
It contains some example on how to use angular2 and redux and their unit test to help you.
The project come configured so you can use it with the excellent redux-devtools
![](http://i.imgur.com/J4GeW0M.gif)

## Angular 2 ##

## Redux ##
Please head over to http://redux.js.org/ for some great documentation.

### What is redux ###
Redux store your app state into a single entity.
You can ask for change to the state by emiting object action.
Reducers handle the transformation of the state tree.

Both action creators and reducers a pure function, so are easy to test.

### How Redux is exposed into my angular 2 app ###
(ng2-redux)[https://github.com/angular-redux/ng2-redux] is used to provide the store as an injectable service.

Containers components ask for store via angular2 dependency injection.
```javascript
@Component({
    ...
})
export default class ContainerComponent {

    constructor(
        @Inject(NgRedux) ngRedux) {
        this.ngRedux = ngRedux;
    }
}
```
Then suscribe to a subset of data to expose it to children components AKA dumb components using an async pipe.

```javascript
@Component({
    ...
    pipes: [AsyncPipe],
    template: `<children-component [value]="counter$| async" ></children-component>`
})
export default class ContainerComponent {
    
    counter$ = 0;

    constructor(
        @Inject(NgRedux) ngRedux) {
        this.ngRedux = ngRedux;
    }
    
    ngOnInit() {
        this.counter$ = this.ngRedux.select('counter');
    }
}
```

### How to inject angular2 services into a redux action creator ###
You may want to expose some angular2 service into your actions creators, a simple example is to use the http service to retrieve some data.

You can this by declaring your action creator module to be injectable, providing it at application bootstrap, then injecting it in your component who need to fire such actions.

In the mean time in your action creator module construction you ask for injection of http dependency.



## ES6 ##
We are using babel to compile ES6 to a browser friendly code.