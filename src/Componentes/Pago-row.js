import React from 'react'

class PagoRow extends React.Component {
  
  colocar=()=>{
    var hola=document.getElementById(this.props.pago.idRec);
    console.log(hola.id);
    var holas=hola.id;
    this.props.Funciones(holas);
   /*  var selec=[];
   var check=document.getElementsByClassName("checkbox1");
    var normal=Array.from(check);
    for(let i=0; i<normal.length;i++){
      if(normal[i].checked==true){
        selec.push(normal[i].id);
      }
    } 
    console.log(selec);
     */

    

    }
  

  render() {
    return(
    <tr>
      <td className="td">
      <form action="#">
              <label className="row center-xs color_white">
                  <input
                  onClick={this.colocar}
                    className="checkbox1"
                    //name="chekbox"
                    id={this.props.pago.idRec}
                    type="checkbox" />
                    <span> </span>

              </label>
      </form>
     
    </td>
      <td className="td">{this.props.pago.apeNom}</td>
      <td className="td">{this.props.pago.concepto}</td>
			<td className="td">{this.props.pago.numero}</td>	
      <td className="td">{this.props.pago.nombre}</td>
      <td className="td">{this.props.pago.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1')}</td>
      <td className="td">{this.props.pago.moneda}</td>
      <td className="td">{'S/. '+this.props.pago.importe}</td>
	  </tr>
    )
  }
}
//observaciones 
//se deberia mostrar el nombre del concepto
//se deberia mostrar el nombre facultad con idAlumno
//
//<td className="td">{this.props.pago.idRec}</td>
//<td className="td">{this.props.pago.alumno.idAlum}</td>
export default PagoRow;