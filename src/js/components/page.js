import React from "react";

class Page extends React.Component {

    render(){
        return <div className="w-full h-full">
            <div className="w-full h-full">
                {this.props.children}
            </div>
        </div>
    }
}

export default Page;