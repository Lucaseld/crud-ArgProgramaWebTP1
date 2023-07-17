
window.addEventListener('load', function() {
    
  });
  
  document.getElementById('socioForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    var dni = document.getElementById('dni').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var direccion = document.getElementById('direccion').value;
    var email = document.getElementById('email').value;
  
    var socio = {
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      email: email,
      estado: "inactivo",
      categoria: "adherente",
      accesoClub: 'Denegado',
      acceso: false
    };
  
    if (validarSocio(socio)){
        addSocio(socio);
    }

    document.getElementById('dni').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('email').value = '';
  
  });
  
  function addSocio(socio) {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    socios.push(socio);
    localStorage.setItem('socios', JSON.stringify(socios));
    alert("Alta Exitosa");
  }

  
  function validarSocio(socioAlta) {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    var resultados = [];
  
    for (var i = 0; i < socios.length; i++) {
      var socio = socios[i];
  
      if (socio.dni === socioAlta.dni) {
        alert("Socio con DNI "+socioAlta.dni+" ya dado de alta.");
        return false;
      }
    }
    return true;
  
  }
  
  
  
