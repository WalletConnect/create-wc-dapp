import chalk from "chalk";
import { APP_NAME, WELCOME_TEXT } from "./constants.js";

export const wcText = chalk.blue.bold;

export const INTRO = () => {
	// Print the WalletConnect logo and welcome message
	console.log(
		chalk.blue(`

              /////////////////                     
          /////////////////////////                 
        /////////           /////////               
         .///                   ///                 
  */                  /                  /*         
//////.            ///////             //////       
 ////////        ///////////        ////////        
   ////////.  /////////////////   ////////          
      //////////////     //////////////             
        /////////,         ./////////               
           ////               ////                  
`)
	);

	console.log("\n");
	console.log(WELCOME_TEXT);
};
