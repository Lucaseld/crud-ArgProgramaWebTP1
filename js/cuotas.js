window.addEventListener('load', function() {
    loadSocios();
  
    var socioSelect = document.getElementById('socioSelect');
    socioSelect.addEventListener('change', function() {
      actualizarDatosSocio();
    });
  });
  
  var pagos = JSON.parse(localStorage.getItem('pagos')) || [];
  var socios = JSON.parse(localStorage.getItem('socios')) || [];

  function loadSocios() {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    var socioSelect = document.getElementById('socioSelect');
  
  
    for (var i = 0; i < socios.length; i++) {
      var socio = socios[i];
      var optionciones = document.createElement('option');
      optionciones.value = socio.dni;
      optionciones.textContent = socio.dni + " - " + socio.apellido + " " + socio.nombre;
      socioSelect.appendChild(optionciones);
    }


  }
  
  function actualizarDatosSocio() {
    var socioSelect = document.getElementById('socioSelect');
    var socioApellido = document.getElementById('socioApellido');
    var socioNombre = document.getElementById('socioNombre');
    var socioEstadoCuota = document.getElementById('socioEstadoCuota');
  
    var selectedDNI = socioSelect.value;
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    var selectedSocio = socios.find(function(socio) {
      return socio.dni === selectedDNI;
    });
  
    if (selectedSocio) {
      socioApellido.textContent = selectedSocio.apellido;
      socioNombre.textContent = selectedSocio.nombre;
      socioEstadoCuota.textContent = estadoDeCuota(selectedSocio.dni);
    } else {
      socioApellido.textContent = '';
      socioNombre.textContent = '';
      socioEstadoCuota.textContent = '';
    }
  }
  
  document.getElementById('pagoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    

    var dni = socioSelect.value;
    var comprobante = document.getElementById('nroComp').value;
  
    var pago = {
        nroSocio : dni,
        nroComprobante : comprobante,
        transaccionFecha : new Date()
    };
    
    pagos.push(pago);
    
    for (var i = 0; i < socios.length; i++) {
        var socio = socios[i];
    
        if (socio.dni == dni) {
            socio.accesoClub = "Autorizado";
            socio.acceso = true;
        }
      }
    
    localStorage.setItem('socios', JSON.stringify(socios));
    localStorage.setItem('pagos', JSON.stringify(pagos));
    alert("Pago Registrado");
  });
  
  function buscar() {
    var dni = document.getElementById('dni').value;
    var socioSelect = document.getElementById('socioSelect');
    var socioApellido = document.getElementById('socioApellido');
    var socioNombre = document.getElementById('socioNombre');
    var socioEstadoCuota = document.getElementById('socioEstadoCuota');
  
    var selectedSocio = socios.find(function(socio) {
      return socio.dni === dni;
    });
  
    if (selectedSocio) {
      socioSelect.value = selectedSocio.dni;
      socioApellido.textContent = selectedSocio.apellido;
      socioNombre.textContent = selectedSocio.nombre;
      socioEstadoCuota.textContent = estadoDeCuota(selectedSocio.dni);
    } else {
      socioSelect.value = '';
      socioApellido.textContent = '';
      socioNombre.textContent = '';
      socioEstadoCuota.textContent = '';
      alert("Socio " + dni + " Inexistente");
    }
  }

  function estadoDeCuota(dni){
    return cuotaAlDia(dni) == true ? "Cuota al dia" : "Cuota Atrasada";
  }
  function cuotaAlDia(dni){

    for (var i = 0; i < pagos.length; i++) {
        var pago = pagos[i];
    
        if (pago.nroSocio == dni) {
            return true
        }
      }
      return false
  }
