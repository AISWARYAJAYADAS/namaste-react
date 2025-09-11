import React from "react";
import { UserClass } from "./UserClass";

export class AboutUs extends React.Component{
    constructor(props){
        super(props);
        console.log('Parent Constructor Called')
    }
    componentDidMount(){
        console.log('Parent Component Did Mount Called')
    }

    render(){
        console.log('Parent Render Called')
        return(
            <div>
                <h1>About Us</h1>
                <UserClass name={"ArchanaJayadasan"} location={"Kerala, India"} />
            </div>
        )
    }
}
