import React from "react";

class Page extends React.Component {

    render(){
        return <div className={"page page-outer-wrapper absolute center " + this.props.className}>
            <div className="page page-inner-wrapper relative center">
                {this.props.children}
            </div>
        </div>
    }
}

export default Page;