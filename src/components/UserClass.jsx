import React from "react";
export class UserClass extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state ={
            count: 0,
            count123:123
        }
        console.log('Child Constructor called')
    }
    componentDidMount(){
        console.log('Child Component Did Mount called')
    }
    render(){
        console.log('Child Render called')
        const {name, location} = this.props;
        return(
            <div>
                <h1>UserClass</h1>
                <h2>Name: {name}</h2>
                <h2>Location: {location}</h2>
                <div>
                    <button onClick = {() => {
                        this.setState({
                            count: this.state.count + 1,
                            count123: this.state.count123 + 1
                    })}}> INCREMENT COUNT  </button>
                    <h2>Count: {this.state.count}</h2>
                    <h2>Count123: {this.state.count123}</h2>
                 
                    
                </div>

            </div>
        );
    }
}