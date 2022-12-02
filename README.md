# ConFusion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


--------------------------------------

# EXTRA

Preparación de entorno:
```
npm install @angular/cli@6.2.1
ng new conFusion --style=scss
npm install
```

Angular Material
```
npm install @angular/material@6.4.7 --save
npm install @angular/cdk@6.4.7 --save
 npm install @angular/animations@6.1.7 --save
 npm install hammerjs@2.0.8 --save
 npm install @angular/flex-layout@6.0.0-beta.18 --save
```

Añadir a index.html:
```
<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Y los imports:
``
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
```
``` 
import 'hammerjs';
```

```
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
  ],
  ```

en styles.scss:
```
/* You can add global styles to this file, and also import other style files */
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';

// Some basic resets

body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
}

```

