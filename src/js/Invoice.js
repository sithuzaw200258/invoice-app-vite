import initialRender from "./initialRender";
import listener from "./listener";
import observer from "./observer";

class Invoice{
    init(){
        // console.log("Invoice init")
        observer();
        listener();
        initialRender();
    }
    
}
export default Invoice;