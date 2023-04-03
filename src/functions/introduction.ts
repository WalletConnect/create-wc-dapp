import { blue } from "picocolors";
import { log } from "./log";
import { WELCOME_TEXT } from "../constants/steps";

const introduction = () => {
	// Print the WalletConnect logo and welcome message
	log(
		blue(`

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

	log("\n");
	log(WELCOME_TEXT);
};

export default introduction;
