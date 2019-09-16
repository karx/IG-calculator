import React from "react";


class FeatureCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickedAnimation: false,
      props: props
    }
    this.props = props;
    this.handleClick = this.handleClick.bind(this);
    this.removeClasses = this.removeClasses.bind(this);
    this.animateValue = this.animateValue.bind(this); 
  }

   quadratic (duration, range, current) {
    return ((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2);
  }
   animateValue(start, duration, easing) {

    let finalValue = this.state.props.value;
    if (finalValue.split) {
      finalValue = finalValue.split(',').join('');
    }
    var end = parseFloat(finalValue, 10);
    
    var range = end - start;
    var current = start;
    console.log(end < 5.000);
    var offset = end < 5.00 ? 0.01 : 1;
    var increment = (end-start)/100;
    
    var startTime = new Date();
    
    var remainderTime = 0;
    console.log(`from ${start} to ${end} | Step size: ${increment} (${offset}).`);
    var step = () => {
      current += increment;
      
      this.setState(state => ({
        props: {
          value:  (Math.round(current*100)/100).toLocaleString(),
          icon: this.state.props.icon,
          title: this.state.props.title
        }
      }));
      if (current < end) {
        setTimeout(step, easing(duration, range, current));
      }
      else {
        this.setState(state => ({
          props: {
            value:  end.toLocaleString(),
            icon: this.state.props.icon,
            title: this.state.props.title
          }
        }));
        console.log('Easing: ', easing);
        console.log('Elapsed time: ', new Date() - startTime)
        console.log('');
      }
    };
    
    setTimeout(step, easing(duration, range, start));
  }

  handleClick() {
    console.log('clicked');
    console.log(this.state);
    this.animateValue(0, 10 , this.quadratic);

    console.log(this.state);
  }
  removeClasses() {
    this.setState(state => ({
      isClickedAnimation: false
    }));
  }

  render() {
    var props = this.state.props;
    return (
      <div className="col-md-6 col-sm-12" onClick={this.handleClick}>
        <div className="card">
            <div className="card-body">
                <div className="stat-widget-two">
                    <div className="media">
                        <div className="media-body">
                            <h2 className="mt-0 mb-1 text-danger" className={this.state.isClickedAnimation ? 'tracking-in-contract' : ''}>{props.value}</h2><span>{props.title}</span>
                        </div>
                        <img className="ml-3" src={props.icon} alt="" />
                    </div>
                </div>
            </div>
          </div>
        {/* <img
          alt={props.icon}
          className="mx-autop-1"
          src={props.icon}
          style={{
            // backgroundColor: "#fff",
            width: "64px",
            height: "64px"
          }}
        />
        <p className="Righteous lead text-center">{props.title}</p>
        <h4 className="text-center">{props.value}</h4> */}
      </div>
    );
  }

}

export default FeatureCard;
