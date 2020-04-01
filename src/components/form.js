import React,{useState,useEffect} from "react"
import {Route,Link} from "react-router-dom"
import axios from "axios"
import * as yup from "yup"

const formSchema = yup.object({
name:yup.string().required("your name has gotta have 2 letters at least").min(2),
pizzaSize:yup
    .string()
    .oneOf(["10in", "12in","14in"])
    .required("what size you want this pizza"),
pepporoni: yup.boolean().defined(),
mushrooms: yup.boolean().defined(),
olives: yup.boolean().defined(),
unholyPineapple: yup.boolean().defined(),
specInstr: yup.string().notRequired(),
specialInstructions:yup
    .string()
});

const Form = (props) => {
    const [pizzaState, setPizzaState] = useState({
        pizzaSize: "",
        pepporoni:false,
        mushrooms:false,
        olives:false,
        unholyPineapple:false,
        specialInstructions:""
    })
    const [errors, setErrors] = useState({
        pizzaSize: "",
        pepporoni:"",
        mushrooms:"",
        olives:"",
        unholyPineapple:"",
        specialInstructions:""
    })
    
    const [orders, setOrders] = useState ([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(pizzaState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [pizzaState]);
    

    

    //then we validate changes
    const validateChange = event =>{
        yup.reach(formSchema,event.target.name)
        .validate(event.target.value)
        .then(valid=>{
            setErrors({...errors,
                [event.target.name]: ""
            })
            
        })
        .catch(err => {
            setErrors({
                ...errors,
                [event.target.name]:err.errors[0]
            })
        })


    };
    //we then make sure what we are typing goes into our state
    const inputChange = event => {
        event.persist();
        const newPizzaData = {
          ...pizzaState,
          [event.target.name]:
            event.target.type === "checkbox" ? event.target.checked : event.target.value
        };

        validateChange(event);
        setPizzaState(newPizzaData);
      };

      




        const formSubmit = event => {
            event.preventDefault();
            axios.post("https://reqres.in", pizzaState)
                .then(res => {
                    setOrders(res.data);
    
    
                    setPizzaState({
                    pizzaSize: "",
                    pepporoni:false,
                    mushrooms:false,
                    olives:false,
                    unholyPineapple:false,
                    specialInstructions:""
                })
                .catch(err => console.log("POST error:", err.res))
        })
}

    return(
        
            <form onSubmit = {formSubmit}>
                <h1>Place an Order!</h1>
                <label htmlFor = 'name'>
                    <input
                    type = 'text'
                    name = 'name'
                    id = 'nameinput'
                    placeholder = 'Name'
                    value={pizzaState.name}
                    onChange={inputChange}
                    />
                </label>
           
    
                <label htmlFor = 'pizzaSize'>
                    Pizza Size
                  
                    <select name = 'pizzaSize'  onChange = {inputChange}>
                        <option name="default" value={null}></option>
                        <option name="small" value='10in'>Sm</option>
                        <option name="medium" value='12in'>Lg</option>
                        <option name="large" value='14in'>XL</option>
                    </select>
                </label>
               
    
                <div className = 'toppings'>
    
                    <p>Select Toppings</p>
    
                    <label htmlFor = 'pepporoni'>
                        <input
                            type='checkbox'
                            name='pepporoni'
                            
                            checked={pizzaState.pepporoni} 
                            onChange={inputChange}
                        /> 
                        Pepporoni
                    </label>
                 
                    <label htmlFor = 'mushrooms'>
                        <input
                            type='checkbox'
                            name='mushrooms'
                            
                            checked={pizzaState.mushrooms} 
                            onChange={inputChange}
                        />
                        Mushrooms
                    </label>
    
                    <label htmlFor = 'peppers'>
                        <input
                            type='checkbox'
                            name='olives'
                            checked={pizzaState.olives} 
                            onChange={inputChange}
                        /> 
                        Olives
                    </label>
             
                    <label htmlFor = 'unholyPineapple'>
                        <input
                            type='checkbox'
                            name='unholyPineapple'
                            checked={pizzaState.unholyPineapple} 
                            onChange={inputChange}
                        />
                        you disgust me! pineapple
                    </label>
              
    
                </div>
    
                <label htmlFor = 'Special'>
                    anything special?
                    <textarea
                    name = 'specInstr'
                    placeholder = 'Type instructions here...'
                    value={pizzaState.specInstr} 
                    onChange={inputChange}
                    />
                </label>
          
                <button name = 'submit' disabled={buttonDisabled}>Submit</button>
                
    console.log(orders)
                </form>

)

}
export default Form;