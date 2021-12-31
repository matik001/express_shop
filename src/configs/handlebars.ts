import express from 'express';
import { create } from 'express-handlebars';
import CONFIG from './config';

const configureHandlebars = (app:express.Express)=>{
    const hbs = create({
            extname: '.hbs',
            helpers: {
                ternary(cond:boolean, ifTrue:string, ifFalse:string) { 
                    return cond ? ifTrue : ifFalse; 
                },
                eq(a:string, b:string){
                    return a===b;
                },
                section: function (name:string, options:any) {
                    if (!this._sections) {
                        this._sections = {};
                    }
                    (this._sections as any)[name] = options.fn(this);
                    return null;
                }
                // bar() { return 'BAR!'; }
            }
        });
      
        app.engine('hbs', hbs.engine);
        app.set('view engine', 'hbs');
        if(CONFIG.isProduction)
            app.enable('view cache');

}

export default configureHandlebars;