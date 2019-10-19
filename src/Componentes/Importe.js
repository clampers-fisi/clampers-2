import React from 'react'

class Importe extends React.Component {
  
     render() {
      return(
        <div className="row">
          <b className="importe">IMPORTE TOTAL:</b>
          <input value={'S/. '+ this.props.importe.toFixed(2)} readOnly="true" type="text" placeholder="Importe" className="center col-xs-5"/>
        </div>
      )
    }   
}
export default Importe;
