import express from 'express';
import { create } from 'express-handlebars';

const configureHandlebars = (app:express.Express)=>{
    const hbs = create({
        helpers: {
            // foo() { return 'FOO!'; },
            // bar() { return 'BAR!'; }
        }
      });
      
      app.engine('handlebars', hbs.engine);
      app.set('view engine', 'handlebars');
}

export default configureHandlebars;