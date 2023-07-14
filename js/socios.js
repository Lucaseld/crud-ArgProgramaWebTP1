
window.addEventListener('load', function() {
    loadSocios();
  });
  
  function loadSocios() {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    var sociosTable = document.getElementById('sociosBody');
  
    sociosTable.innerHTML = '';
  
    for (var i = 0; i < socios.length; i++) {
      var socio = socios[i];
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + socio.dni + '</td>' +
                      '<td>' + socio.nombre + '</td>' +
                      '<td>' + socio.apellido + '</td>' +
                      '<td>' + socio.direccion + '</td>' +
                      '<td>' + socio.email + '</td>' +
                      '<td>' + socio.estado + '</td>' +
                      '<td>' + socio.categoria + '</td>' +
                      '<td><button type="button"  id="btnBor" onclick="eliminarSocio(' + socio.dni + ')">Eliminar</button></td>'+
                      '<td><button type="button"  id="btnMod"  onclick="modificarSocio(' + socio.dni + ')">Modificar</button></td>';
      sociosTable.appendChild(row);
    }
  }
  
  function eliminarSocio(dni) {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];

    for (var i = 0; i < socios.length; i++) {
        var socio = socios[i];
        if (socio.dni == dni) {
            socios.splice(i, 1);
        }
      }
    localStorage.setItem('socios', JSON.stringify(socios));
    loadSocios();
  }

function buscar(){
    dni = document.getElementById('dniBusqueda').value;
    actualizarTablaSocios(buscarSocio(dni));
}
  function buscarSocio(dni) {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    var resultados = [];
  
    for (var i = 0; i < socios.length; i++) {
      var socio = socios[i];
  
      if (socio.dni == dni) {
        resultados.push(socio);
      }
    }
    return resultados;
  }
  
  function actualizarTablaSocios(socios) {
    var sociosTable = document.getElementById('grillaSocios');
    var sociosBody = document.getElementById('sociosBody');
  
    sociosBody.innerHTML = '';
  
    for (var i = 0; i < socios.length; i++) {
      var socio = socios[i];
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + socio.dni + '</td>' +
                      '<td>' + socio.nombre + '</td>' +
                      '<td>' + socio.apellido + '</td>' +
                      '<td>' + socio.direccion + '</td>' +
                      '<td>' + socio.email + '</td>' +
                      '<td>' + socio.estado + '</td>' +
                      '<td><button type="button" onclick="eliminarSocio(' + socio.dni + ')">Eliminar</button></td>'+
                      '<td><button type="button" id="btnMod" onclick="modificarSocio(' + socio.dni + ')">Modificar</button></td>';
      sociosBody.appendChild(row);
    }
  }

  function modificarSocio(dni){
    
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    for (var i = 0; i < socios.length; i++) {
        var socio = socios[i];
    
        if (socio.dni == dni) {
            document.getElementById('afiliadoDni').textContent = socio.dni;
            document.getElementById('nombre').value = socio.nombre;
            document.getElementById('apellido').value = socio.apellido;
            document.getElementById('direccion').value = socio.direccion;
            document.getElementById('email').value = socio.email;
            document.getElementById('categoria').value = socio.categoria;
            document.getElementById('estado').value = socio.estado;
        }
      }

  }

   function  btnModificarSocio(){

    var dni = document.getElementById('afiliadoDni').textContent;
    if (dni != ""){
        var socios = JSON.parse(localStorage.getItem('socios')) || [];
        for (var i = 0; i < socios.length; i++) {
            var socio = socios[i];
        
            if (socio.dni == dni) {
                
                socio.nombre = document.getElementById('nombre').value;
                socio.apellido = document.getElementById('apellido').value;
                socio.direccion = document.getElementById('direccion').value;
                socio.email = document.getElementById('email').value;
                socio.categoria = document.getElementById('categoria').value;
                socio.estado = document.getElementById('estado').value;
            }
          }
    }
    localStorage.setItem('socios', JSON.stringify(socios));
    

   }
  