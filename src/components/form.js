import React,{useState,useEffect} from "react"
import {Route,Link} from "react-router-dom"

const formSchema = yup.object.shape({
name:yup.string.required("your name has gotta have 2 letters at least").min(2),
pizzaSize:yup
    .string()
    .oneOf(["10in", "12in","14in"])
    .required("what size you want this pizza"),
pizzaToppings:yup
    .string()
    .oneOf(["pepperoni","unholy pineapple","cheese","olives","demonic brusselsrouts"]),
specialInstructions:yup
    .string()
});

const Form = (props) => {
    const [pizzaState, setPizzaState] = useState({
        pizzaSize: "",
        pizzaToppings:"",
        specialInstructions:""
    })
    const [error, setErrors] = useState({
        pizzaSize: "",
        pizzaToppings:"",
        specialInstructions:""
    })
    const [post, setPost] = useState([]);
    const [orders, setOrders] = useState ([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(()=>{
        formSchema.isValid(pizzaState)
        .then(valid=>{
            setbuttonDisabled(!valid)
        });
        }, 
    [pizzaState])

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
    const inputChange = event =>{
        event.persist();
        const newPizzaData = {
            ...pizzaState,
            [event.target.name]:
                event.target.type === "dropdown" ? event.target.toggled : event.target.value
        }//probably not like this
        console.log(event.target.value)
        validateChange(event);
        setPizzaState(newPizzaData)
    }
//then we submit data while preventing the page from refreshing
    const  formSubmit = event=> {
        event.preventDefault();
        axios.post("https://reqres.in/api/users",pizzaState)
            .then(response => {
                setPost(response.data)
                set
            })
    }

    return(
        
        <div className="home-button">
            <Link to="/">Home</Link>
        </div>
        

    )


}
export default Form;