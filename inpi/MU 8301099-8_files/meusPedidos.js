/********************************************************************** 
Fun��o de verificar o status do checkbox de meus pedidos
Objetivos :
- fun��o toggle do elemento
Par�metros :
objeto  -> Nome do campo de formul�rio (Usar this)
Requirido :
Fun��o ValidaData
/**********************************************************************/
function checkboxStatus(f){
	if(f.form.TodosMeusPedidos.checked == 1) {
		f.form.TodosMeusPedidos.checked = 0;
		checkboxChecked(f);
	} else {
		f.form.TodosMeusPedidos.checked = 1;
		checkboxUnChecked(f);
	}
	f.form.submit();
}
function checkboxChecked(f){
	var i;
   for (i=0;i<f.form.elements.length;i++)
	  if(f.form.elements[i].type == "checkbox")
		 f.form.elements[i].checked=1;
}
function checkboxUnChecked(f){
	var i;
   for (i=0;i<f.form.elements.length;i++)
	  if(f.form.elements[i].type == "checkbox")
		 f.form.elements[i].checked=0;
}
function ConfirmMyList(frm, numPedido, j) {
	alert("Atualizando a Lista de Meus Pedidos!");
	frm.NumPedido.value=numPedido;
	frm.Action.value="MeuPedido";
	frm.submit();
    return true;
}
