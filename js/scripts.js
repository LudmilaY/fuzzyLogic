		$(document).ready(function() {
			$("#executar").on('click', function() {
				var criticidade = parseFloat($("#criticidade").val());
				var coeficiente = parseFloat( $("#coeficiente").val());
				var perda = parseFloat( $("#perda").val());
				var estoque =  parseFloat($("#estoque").val());

				var prioridade = calcularPrioridade(criticidade,coeficiente,perda,estoque);
				// var prioridade = calcularPrioridade(2,55,78,8);

				console.log(prioridade);


				$("#resultado").text(prioridade);

				
			});

			$("#executarArquivo").on('click', function(e) {
				var itens = [
				{
"criticidade" : 2,
"prazo" : 55,
"perda" : 78.163,
"estoque": 8
},
{
"criticidade" : 2,
"prazo" : 50,
"perda" : 38.163,
"estoque": 2
},

{
"criticidade" : 3,
"prazo" : 40,
"perda" : 28.163,
"estoque": 38
},
{
"criticidade" : 2,
"prazo" : 55,
"perda" : 78.163,
"estoque": 8
},
{
"criticidade" : 2,
"prazo" : 50,
"perda" : 38.163,
"estoque": 2
},

{
"criticidade" : 3,
"prazo" : 40,
"perda" : 28.163,
"estoque": 38
},

{
"criticidade" : 2,
"prazo" : 55,
"perda" : 78.163,
"estoque": 8
},

{
"criticidade" : 2,
"prazo" : 50,
"perda" : 38.163,
"estoque": 2
},

{
"criticidade" : 3,
"prazo" : 40,
"perda" : 28.163,
"estoque": 38
}


];
console.log(itens);
				
				var resultadosSistema = [];
				var resultadosReais = [80,75,20];
				for(var i=0;i<itens.length;i++){
					resultadosSistema.push(parseFloat(calcularPrioridade(itens[i].criticidade,itens[i].prazo,itens[i].perda,itens[i].estoque)));
				}
				var chart = $('#grafico').highcharts();
				chart.addSeries({
					name: "Grupo" ,
					data: resultadosSistema
				});
				
				
			});
		});





    // var reader = new FileReader();
        // reader.onload = (function(aImg) {return function(e) {aImg.src = e.target.result;};})(img);
        // reader.readAsDataURL(file);


// Funcoes de pertinencia para estoque esperado

function pertinenciaEstoqueEsperadoMuitoBaixo(x){
	if(x<=12){
		return 1;
	}else if(x>=18){
		return 0;
	}else{
		return (18-x)/6;

	}

}
function pertinenciaEstoqueEsperadoBaixo(x){
	if(x>=18){
		return 1;
	}else if(x<=12){
		return 0;
	}else{
		return (x-12)/6;

	}

}

// Funcoes de pertinencia para criticidade

function pertinenciaCriticidadeBaixa(x){
	if(x == 1) {
		return 1;
	}else if ( (x >= 0.9 ) && (x < 1) ) {
		return (1-x)/0.1;
	}else if( (x > 1 ) && (x <= 1.1) ){
		return (1.1-x)/0.1;
	}else{
		return 0;
	}
}
function pertinenciaCriticidadeMedia(x){
	if(x == 2) {
		return 1;
	}else if ( (x>=1.9) && (x<2) ) {
		return (2-x)/0.1;
	}else if( (x>2) && (x<=2.1)){
		return (2.1-x)/0.1;
	}else{
		return 0;
	}
}

function pertinenciaCriticidadeAlta(x){
	if(x == 3) {
		return 1;
	}else if ( (x>= 2.9) && ( x < 3) )  {
		return (3-x)/0.1;
	}else if ( (x>3) && (x<=3.1) ){
		return (3.1-x)/0.1;
	}else{
		return 0;
	}
}

// Funcoes de pertinencia para perda diaria esperada


function pertinenciaPerdaDiariaNormal (x) {
	if(x<=30){
		return 1;
	}else if(x>40){
		return 0;
	}else{
		return (40-x)/10;
	}
}

function pertinenciaPerdaDiariaAlta (x) {
	if((x>=40) && (x<50)){
		return 1;
	}else if( (x<30) || (x>=60) ) {
		return 0;
	}else if ((x>=30) && (x<40)){
		return (x-30)/10;
	}else{
		return (60-x)/10;
	}
}

function pertinenciaPerdaDiariaMuitoAlta (x) {
	if(x>=60){
		return 1;
	}else if(x<50){
		return 0;
	}else{
		return (x-50)/10;
	}
}

// Funcoes de pertinencia para coeficiente de variacao da demanda
// Funcoes de pertinencia para prazo de entrega


function pertinenciaAntesDoPrazo(x){
	if(x<=5){
		return 1;
	}else if(x>7){
		return 0;
	}else{
		return (7-x)/2;
	}
}

function pertinenciaDentroDoPrazo(x){
	if((x>=7) && (x<=9)){
		return 1;
	}else if(( x<5) || (x>11)){
		return 0;
	}else if( (x>=5) && (x<7) ){
		return (x-5)/2;
	}else{
		return (11-x)/2;
	}
}

function pertinenciaForaDoPrazo(x){
	if(x>=11){
		return 1;
	}else if(x<9){
		return 0;
	}else{
		return (x-9)/2;
	}
}



// Regras de prioridade


function prioridadeMuitoBaixa(p){

	if(p == 1){
		var objeto = {
			"pertinencia": p,
			"v1" : 15,
			"v2" : 15
		}

		return objeto;
	}else if(p ==0){
		var objeto = {
			"pertinencia": p,
			"v1" : 28,
			"v2" : 28
		}

		return objeto;


	}else{
		var objeto = {
			"pertinencia": p,
			"v1" : (13*p) + 15,
			"v2" : (13*p) + 15
		}

		return objeto;
	}


}

function prioridadeBaixa(p){

	if(p == 1){
		var objeto = {
			"pertinencia": p,
			"v1" : 28,
			"v2" : 28
		}

		return objeto;
	}else if(p ==0){
		var objeto = {
			"pertinencia": p,
			"v1" : 43,
			"v2" : 15
		}

		return objeto;


	}else{
		var objeto = {
			"pertinencia": p,
			"v1" : (13*p) + 15,
			"v2" : 43 - (15*p) 
		}

		return objeto;
	}


}

function prioridadeMedia(p){

	if(p == 1){
		var objeto = {
			"pertinencia": p,
			"v1" : 43,
			"v2" : 43
		}

		return objeto;
	}else if(p ==0){
		var objeto = {
			"pertinencia": p,
			"v1" : 28,
			"v2" : 57
		}

		return objeto;


	}else{
		var objeto = {
			"pertinencia": p,
			"v1" : (15*p) + 28,
			"v2" : 57 - (14*p) 
		}

		return objeto;
	}


}

function prioridadeAlta(p){

	if(p == 1){
		var objeto = {
			"pertinencia": p,
			"v1" : 57,
			"v2" : 57
		}

		return objeto;
	}else if(p ==0){
		var objeto = {
			"pertinencia": p,
			"v1" : 43,
			"v2" : 73
		}

		return objeto;


	}else{
		var objeto = {
			"pertinencia": p,
			"v1" : (14*p) + 43,
			"v2" : 73 - (26*p) 
		}

		return objeto;
	}


}

function prioridadeMuitoAlta(p){

	if(p == 1){
		var objeto = {
			"pertinencia": p,
			"v1" : 73,
			"v2" : 73
		}

		return objeto;
	}else if(p ==0){
		var objeto = {
			"pertinencia": p,
			"v1" : 57,
			"v2" : 85
		}

		return objeto;


	}else{
		var objeto = {
			"pertinencia": p,
			"v1" : (26*p) + 57,
			"v2" : 85 - (12*p) 
		}

		return objeto;
	}


}
function prioridadeUrgente(p){

	if(p == 1){
		var objeto = {
			"pertinencia": p,
			"v1" : 85,
			"v2" : 85
		}

		return objeto;
	}else if(p ==0){
		var objeto = {
			"pertinencia": p,
			"v1" : 73,
			"v2" : 73
		}

		return objeto;


	}else{
		var objeto = {
			"pertinencia": p,
			"v1" : (12*p) + 73,
			"v2" : (12*p) + 73 
		}

		return objeto;
	}


}

function calcularPrioridade(criticidade, prazo, perda, estoque){
	var regras = new Array(55);

	regras[1] = prioridadeUrgente(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[2] = prioridadeUrgente(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[3] = prioridadeUrgente(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	
	regras[4] = prioridadeUrgente(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[5] = prioridadeUrgente(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[6] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	
	regras[7] = prioridadeUrgente(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[8] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[9] = prioridadeAlta(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	
	regras[10] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[11] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[12] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	
	regras[13] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[14] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[15] = prioridadeAlta(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	
	regras[16] = prioridadeMuitoAlta(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[17] = prioridadeAlta(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[18] = prioridadeMedia(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	
	regras[19] = prioridadeAlta(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[20] = prioridadeAlta(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[21] = prioridadeAlta(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));

	regras[22] = prioridadeAlta(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[23] = prioridadeAlta(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[24] = prioridadeMedia(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));

	regras[25] = prioridadeAlta(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[26] = prioridadeMedia(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));
	regras[27] = prioridadeBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoMuitoBaixo(estoque)));

	regras[28] = prioridadeMedia(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[29] = prioridadeMedia(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[30] = prioridadeMedia(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[31] = prioridadeMedia(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[32] = prioridadeMedia(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[33] = prioridadeBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[34] = prioridadeMedia(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[35] = prioridadeBaixa(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[36] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaMuitoAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[37] = prioridadeBaixa(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[38] = prioridadeBaixa(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[39] = prioridadeBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[40] = prioridadeBaixa(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[41] = prioridadeBaixa(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[42] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[43] = prioridadeBaixa(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[44] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[45] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaAlta(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[46] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[47] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[48] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaForaDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[49] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[50] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[51] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaDentroDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	regras[52] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeAlta(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[53] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeMedia(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	regras[54] = prioridadeMuitoBaixa(Math.min(pertinenciaCriticidadeBaixa(criticidade), pertinenciaAntesDoPrazo(prazo),pertinenciaPerdaDiariaNormal(perda),pertinenciaEstoqueEsperadoBaixo(estoque)));
	
	
	var totalValor = 0;
	var totalPertinencia = 0;
	for (var i = 1; i <= 54; i++) {
		if  (regras[i].v1 != regras[i].v2) {

			totalValor += regras[i].v1 * regras[i].pertinencia;
			totalValor += regras[i].v2 * regras[i].pertinencia;
			totalPertinencia += 2 * regras[i].pertinencia;	
		}else{
			totalValor += regras[i].v1 * regras[i].pertinencia;
			totalPertinencia += regras[i].pertinencia;
		} 

	}

	// var total = (totalValor/totalPertinencia).toFixed(1);
	var total = (totalValor/totalPertinencia).toFixed(2);
	// console.log(total);

	return total;

}



// calcularPrioridade(CRITICIDADE , COEFICIENTE DE VARIACAO, PERDA DIARIA, ESTOQUE ESPERADO);
// calcularPrioridade( ( 0.9 a 1.1 ou 1.9 a 2.1 ou 2.9 a 3.1) , ( entre 30 e 70) ,  ( entre 30 e 60) , ( entre 12 e 18));
// calcularPrioridade(2, 55, 78.163, 8);

//////////////// Grafico

var proposto = [80,73,20,34,36,78,93,67,68];
// var sistema = [85,72,24];

//[51.15, 38.87, 38.87, 53.69, 42.86, 48.85, 42.86, 71.40, 71.40, 67.44, 11.43, 57.14, 19.78, 71.40, 51.11, 29.97, 29.49, 57.14, 71.40, 44.17, 42.86, 57.14, 10.87, 59.16, 51.47, 57.14, 57.14, 42.86, 28.60, 11.29, 57.14, 12.04, 71.40, 78.63, 30.49, 57.14, 57.14, 71.40, 19.78, 23.76, 64.62, 28.60, 57.14, 57.14, 57.14, 57.14, 57.14, 57.14, 66.98, 57.14, 58.69, 21.99, 26.68, 64.21, 46.16, 71.40, 89.13, 57.14, 89.00, 57.14, 55.22, 46.16, 57.03, 28.60, 10.87, 17.13, 44.45, 30.49, 52.69, 42.86, 45.30, 63.59, 21.99, 26.68, 57.14, 57.14, 57.15, 57.14, 57.14, 40.03, 10.87, 52.33, 60.91, 71.24, 57.14, 57.14, 26.68, 53.69, 47.65, 50.00]

$(function desenhaGrafico () {
	    Highcharts.setOptions({
        colors: ['#058DC7', '#50B432', '#ED561B']
    });

	$('#grafico').highcharts({
		title: {
			text: 'Prioridade',
		            x: -20 //center
		        },
		        subtitle: {
		        	text: 'Prioridade dos itens',
		        	x: -20
		        },
		        xAxis: {
		        	categories: ["produto1","produto2","produto3","produto4","produto5","produto6","produto7","produto8","produto9"]
		        },
		        yAxis: {
		        	title: {
		        		text: 'Grau de Pertinencia'
		        	},
		        	plotLines: [{
		        		value: 0,
		        		width: 1,
		        		color: '#808080'
		        	}]
		        },
		        tooltip: {
		            // valueSuffix: '°C'
		        },
		        legend: {
		        	layout: 'vertical',
		        	align: 'right',
		        	verticalAlign: 'middle',
		        	borderWidth: 0
		        },
		        series: [{
		        	name: 'Proposto',
		        	data: proposto
		        }
		        ]
		    });
});







