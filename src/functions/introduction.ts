import { blue } from "picocolors";
import { WELCOME_TEXT } from "@/constants/steps";
import { log } from "./log";

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
