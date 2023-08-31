import React from "react";

class Page extends React.Component {

    render(){
        return <div id={this.props.id} className={`w-full h-full relative ${this.props.className}`}>
            <div className="w-full h-full relative overflow-hidden">
                {this.props.children}
            </div>
        </div>
    }
}

export default Page;