window.addEventListener('load', function() {
    loadSocios();
  });
  
  function loadSocios() {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
    var accesoTable = document.getElementById('accesoBody');
  
    accesoTable.innerHTML = '';
  
    for (var i = 0; i < socios.length; i++) {
      var socio = socios[i];
      var cuota = verificarCuota(socio.dni);
  
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + socio.dni + '</td>' +
                      '<td>' + socio.nombre + '</td>' +
                      '<td>' + socio.categoria + '</td>' +
                      '<td>' + cuota + '</td>' +
                      '<td>' + socio.estado + '</td>' +
                      '<td>' + socio.accesoClub + '</td>';
  
      var accesoCell = document.createElement('td');
      var accesoButton = document.createElement('button');
      accesoButton.setAttribute('data-socio-index', i);
      accesoButton.addEventListener('click', function() {
        var socioIndex = this.getAttribute('data-socio-index');
        toggleAcceso(socioIndex);
      });
  
      if (socio.acceso) {
        accesoButton.innerHTML = 'Denegar Acceso';
        accesoButton.id="btnBor";
      } else {
        accesoButton.innerHTML = 'Autorizar Acceso';
        accesoButton.id="btnMod";
      }
  
      accesoCell.appendChild(accesoButton);
      row.appendChild(accesoCell);
  
      accesoTable.appendChild(row);
    }
  }
  
  function toggleAcceso(socioIndex) {
    var socios = JSON.parse(localStorage.getItem('socios')) || [];
  
    if (socioIndex >= 0 && socioIndex < socios.length) {
      var socio = socios[socioIndex];
      socio.acceso = !socio.acceso;
  
      if (socio.acceso) {
        socio.accesoClub = 'Autorizado';
      } else {
        socio.accesoClub = 'Denegado';
      }
  
      socios[socioIndex] = socio;
      localStorage.setItem('socios', JSON.stringify(socios));
  
      loadSocios();
    }
  }
  
  function verificarCuota(dni) {
    var pagos = JSON.parse(localStorage.getItem('pagos')) || [];
    var cuotaPagada = pagos.some(function(pago) {
      return pago.nroSocio === dni;
    });
  
    return cuotaPagada ? 'Pagada' : 'Impaga';
  }
  