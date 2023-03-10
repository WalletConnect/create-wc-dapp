import chalk from "chalk";
import { APP_NAME } from "./constants.js";

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
	console.log(
		`📲 Welcome to ${wcText(`${APP_NAME}`)} wizard 📲`
	);
};
