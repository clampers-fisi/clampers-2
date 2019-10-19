import React from 'react'

var jsPDF = require('jspdf');
require('jspdf-autotable');

class Imprimir extends React.Component {
  
  componentDidMount() {

    // console.log('PrintThisComponent mounted!')

  }
  CalcularImporte(listado) {
    
    let pagos = listado;
    let importe = 0;
    for (var indice in pagos) {
      importe = importe + pagos[indice].importe;
    }
    return importe;
  }

  demoTwoPageDocument() {
    var doc = new jsPDF('landscape');
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');
    
    // Save the PDF
    doc.save('Test.pdf');
  }
  Imprimir(){
    // console.log(this.props.listado);

    var checkbox_selec=[];
    var checks=[];
    console.log("datos de alumno pasado por props");
    console.log(this.props.alumno);
    var nombres = this.props.alumno.apeNom; 
    var codigo= this.props.alumno.codigo;
    var importe = 0;
    var listadopagos = this.props.listado;
    var listado = [];
    var total=[];
    var checks=document.getElementsByClassName("checkbox1");
    var checks_normales=Array.from(checks);
    checks_normales.map((checkbox)=>{
     if(checkbox.checked){
       checkbox_selec.push(checkbox.id);
     }
    });
  //  console.log(checkbox_selec);
   
      for(let j=0;j<listadopagos.length;j++){
        if(listadopagos[j].check==true){
            total.push(listadopagos[j]);
        }
      }

    importe = this.CalcularImporte(total).toFixed(2);
   
    // console.log(total);

    console.log("total de listado de pagos que han sido seleccionados");
    console.log(total);

    for (let i = 0; i<total.length; i++) {
      var pago = [i+1,total[i].nombre,total[i].moneda,total[i].concepto,total[i].numero,
      total[i].fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1'),"S/."+total[i].importe,total[i].observacion]
      listado.push(pago);
    }
   //Obtenemos todos los concepto existentes de los pagos seleccionados
  var conceptos=[];
  
    for (let j = 0; j<total.length; j++) {
      
        var auxConcepto = total[j].concepto;
        console.log("aux concepto")
        console.log(auxConcepto);
        var lista2 = conceptos.filter(h => h === auxConcepto);
        console.log("lista2");
        console.log(lista2);
        console.log("longitud");
        console.log(lista2.length);
        if(!lista2.length){
          conceptos.push(auxConcepto);
        }
     
    }
  console.log("listado de conceptos obtenidos");
  console.log(conceptos);
  
//filtramos el array de pagos seleccionados por el tipo de concepto
var listaFinal=[];
for (let k = 0; k<conceptos.length; k++) {
    
    var auxiliar= conceptos[k];

   
    var lista3 = total.filter(h => h.concepto === auxiliar);
    console.log("lista3");
    console.log(lista3);
    listaFinal.push(lista3);
    
}
console.log("Lista final");
console.log(listaFinal);
var listadoFinalFormato = [];

// Damos formato al array filtrado, para pasarlo al pdf a generar
for (let l = 0; l<listaFinal.length; l++) {
  var arrayAuxiliar=[];
  var arrayAntes = listaFinal[l];
  var totalizado = 0;
  for (let m = 0; m<arrayAntes.length; m++) {
    var pago = [m+1,arrayAntes[m].nombre,arrayAntes[m].moneda,arrayAntes[m].concepto,arrayAntes[m].numero,
    arrayAntes[m].fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3-$2-$1'),"S/."+arrayAntes[m].importe,arrayAntes[m].observacion]
    totalizado = totalizado + arrayAntes[m].importe;
    arrayAuxiliar.push(pago);
  }
  var agregarTotal = [ ,,,,,
    ,"Total","S/."+totalizado.toFixed(2)]
  arrayAuxiliar.push(agregarTotal);

  listadoFinalFormato.push(arrayAuxiliar);
}

console.log("listado final con el formato requerido para generar el pdf");
console.log(listadoFinalFormato);

    var columns = ["N°","Descripción","Moneda","Concepto","Numero Recibo","Fecha","Importe","Observación"];
    
    // Only pt supported (not mm or in)
    //CREAMOS EL PDF 
    var data = "Hola";


    //var doc = new jsPDF('p', 'pt');
    var doc = new jsPDF('landscape','pt');
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(11);
    doc.text("UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS", 35, 40);

    //Agregamos encabezado 2;
    
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Facultad de Ingeniería de Sistemas e Informática", 35, 55);
    //Agregamos encabbezado 3;
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Unidad de Posgrado", 35, 70);

    var f = new Date();
    

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(":", 745, 40); 

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(":", 745, 55); 


    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Fecha", 710, 40);
    doc.setFontType("normal");
    doc.text(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear(), 760, 40);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("Hora", 710, 55);
    doc.setFontType("normal");
    doc.text(f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(), 760, 55);
    
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(12);
    doc.text("SISTEMA DE PAGOS", 35, 100);  

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35, 120,307, 120);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35, 115, 35, 120);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(11);
    doc.text("Resumen de pagos", 37, 118); 

    /*
    
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 310, 208); 
*/
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 175, 140); 

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 175, 160);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.text(":", 175, 180); 
/*
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("Codigo de matricula", 192, 208); 
*/
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    /*doc.text("Nombres y Apellidos", 35, 140); */
    doc.text("ALUMNO", 35, 140);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("CÓDIGO:", 35, 160);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text("IMPORTE TOTAL", 35, 180); 


    

/*
    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(codigo, 322, 208); 
*/
    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(nombres, 185, 140);

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(codigo, 185, 160); 

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text("S/."+importe.toString(), 185, 180);
    
    if(listadoFinalFormato.length>0){
    //Mostramos el encabezado de la primera tabla
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text("PAGO POR CONCEPTO "+conceptos[0],38, 210);
    //linea horizontal
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35,213 ,200,213);
    //linea vertical
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(35, 207, 35, 213);
  //Mostramos el encabezado de la primera tabla
      doc.autoTable(columns, listadoFinalFormato[0], {
        styles: {
            cellPadding: 5, // a number, array or object (see margin below)
            fontSize: 8,
            font: "helvetica", // helvetica, times, courier
            lineColor: 0,
            lineWidth: 0.5,
            fontStyle: 'normal', // normal, bold, italic, bolditalic
            overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
            fillColor: false, // false for transparent or a color as described below
            textColor: 0,
            halign: 'center', // left, center, right
            valign: 'middle', // top, middle, bottom
            columnWidth: 'auto' // 'auto', 'wrap' or a number
        },
        headerStyles: {fillColor: [180, 180, 180],
        textColor:0,
        fontStyle:'bold'},
        startY : 225,
        showHeader:'firstPage'
        
    });
      for (let k = 1; k<listadoFinalFormato.length; k++) {
        var first = doc.autoTable.previous;

        //Mostramos el encabezado de cada tabla
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setFontSize(10);
        doc.text("PAGO POR CONCEPTO "+conceptos[k],38, first.finalY + 25);
        console.log("pago por concepto");
           //linea horizontal
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(35,first.finalY + 28 ,200,first.finalY + 28 );

          //linea vertical
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(35, first.finalY + 22, 35, first.finalY + 28);

        //Mostramos el encabezado de cada tabla

        doc.autoTable(columns, listadoFinalFormato[k], {
          styles: {
              cellPadding: 5, // a number, array or object (see margin below)
              fontSize: 8,
              font: "helvetica", // helvetica, times, courier
              lineColor: 0,
              lineWidth: 0.5,
              fontStyle: 'normal', // normal, bold, italic, bolditalic
              overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
              fillColor: false, // false for transparent or a color as described below
              textColor: 0,
              halign: 'center', // left, center, right
              valign: 'middle', // top, middle, bottom
              columnWidth: 'auto' // 'auto', 'wrap' or a number
          },
          headerStyles: {fillColor: [180, 180, 180],
          textColor:0,
          fontStyle:'bold'},
          startY : first.finalY + 40,
          showHeader:'firstPage'
      });  
    }
    }else{
      doc.setFont("helvetica");
      doc.setFontType("normal");
      doc.setFontSize(10);
      doc.text("No se encontraron pagos", 350, 220);
    }

    
  //Agregamos el footer a cada pagina
  var pageCount = doc.internal.getNumberOfPages();
  for( let n = 0; n < pageCount; n++) { 
  doc.setPage(n); 
  doc.text(410,565,"SIGAP v.1.0");
  doc.text(800,565, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
  }
    //Agregamos el footer a cada pagina

    //doc.save('EstadoPagosAlumno.pdf');
    var string = doc.output('datauristring');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
    }
 //<button  onClick={() => window.print()} className=" waves-effect waves-light btn imprimir ">Imprimir<i className="large material-icons left">local_printshop</i></button>
  render() {

    return (
      <div>
        <button  onClick={() => this.Imprimir()} className=" waves-effect waves-light btn-large imprimir ">IMPRIMIR<i className="large material-icons left">local_printshop</i></button>
      </div>

    )
  }
}
export default Imprimir;
