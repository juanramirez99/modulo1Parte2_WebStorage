 




 $( document ).ready(function() {
        console.log( "documento cargado" );
		//localStorage.clear();
		var operation = "A"; //"A"=Adding; "E"=Editing
		var selected_index = -1; //Index of the selected list item
		var tbClients = localStorage.getItem("tbClients");//Retrieve the stored data
		tbClients = JSON.parse(tbClients); //Converts string to object
		if(tbClients == null) //inicializar
				tbClients = [];
		List();
		console.log( "variables  inicializadas"+tbClients );
	
	$("#frmDatos").bind("submit",function(){
	console.log( "voy a hacer " +operation);
	if(operation == "A")
	{
		console.log("llamando a agregar");
		return Add();
		}
	else
		return Edit();		
}); 

function Add(){
	var client = JSON.stringify({
		Nombre    : $("#txtNombre").val(),
		Direccion  : $("#txtDireccion").val(),
		Celular : $("#txtCelular").val()
	});
	tbClients.push(client);
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("The data was saved.");
	console.log( "se guardo un item en el array");
	return true;
} 

$(".btnDelete").bind("click", function(){
	selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
	Delete();
	List();
}); 

function Delete(){
	tbClients.splice(selected_index, 1);
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("registro borrado.");
} 

function Edit(){
	tbClients[selected_index] = JSON.stringify({
			Nombre    : $("#txtNombre").val(),
			Direccion  : $("#txtDireccion").val(),
			Celular : $("#txtCelular").val(),
			
		});//Alter the selected item on the table
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("The data was edited.")
	operation = "A"; //Return to default value
	return true;
} 

$(".btnEdit").bind("click", function(){
	operation = "E";
	selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
	var cli = JSON.parse(tbClients[selected_index]);
	$("#txtNombre").val(cli.Nombre);
	$("#txtDireccion").val(cli.Direccion);
	$("#txtCelular").val(cli.Celular);
	$("#txtNombre").attr("readonly","readonly");
	$("#txtDireccion").focus();
}); 

function List(){		
	$("#tblList").html("");
	$("#tblList").html(
		"<thead>"+
		"	<tr>"+
		"	<th></th>"+
		"	<th>Nombre</th>"+
		"	<th>Direccion</th>"+
		"	<th>Celular</th>"+
		"	</tr>"+
		"</thead>"+
		"<tbody>"+
		"</tbody>"
		);
	for(var i in tbClients){
		var cli = JSON.parse(tbClients[i]);
	  	$("#tblList tbody").append("<tr>"+
								 	 "	<td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
									 "	<td>"+cli.Nombre+"</td>" + 
									 "	<td>"+cli.Direccion+"</td>" + 
									 "	<td>"+cli.Celular+"</td>" + 
	  								 "</tr>");
	}
}
		
});