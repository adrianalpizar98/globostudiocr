function actualizarInterfaz() {
  const prod = document.getElementById('tipoProducto').value;
  const cantInput = document.getElementById('cantInput');
  const cantLabel = document.getElementById('cantLabel');
  const comboWrap = document.getElementById('comboWrap');

  comboWrap.style.display = 'none';

  if (prod === 'serigrafia') {
    cantLabel.innerText = 'Cantidad (Mínimo 100)';
    cantInput.value = Math.max(100, parseInt(cantInput.value, 10) || 100);
    cantInput.min = 100;
    cantInput.step = 50;
  } else if (prod === 'multicolor') {
    cantLabel.innerText = 'Cantidad (Mínimo 500)';
    cantInput.value = Math.max(500, parseInt(cantInput.value, 10) || 500);
    cantInput.min = 500;
    cantInput.step = 50;
  } else if (prod === 'cinco_caras') {
    cantLabel.innerText = 'Cantidad (Mínimo 500)';
    cantInput.value = Math.max(500, parseInt(cantInput.value, 10) || 500);
    cantInput.min = 500;
    cantInput.step = 50;
  } else if (prod === 'num40') {
    comboWrap.style.display = 'flex';
    const esCombo = document.getElementById('comboCheck').checked;
    if (esCombo) {
      cantLabel.innerText = 'Cantidad N° 40 (Mínimo 1 - Tarifa Combo)';
      cantInput.value = 1;
      cantInput.min = 1;
      cantInput.step = 1;
    } else {
      cantLabel.innerText = 'Cantidad N° 40 (Mínimo 2 - Individual)';
      cantInput.value = 2;
      cantInput.min = 2;
      cantInput.step = 1;
    }
  }
  calcularPresupuesto();
}

function calcularPresupuesto() {
  const prod = document.getElementById('tipoProducto').value;
  const cant = parseInt(document.getElementById('cantInput').value, 10);
  const out = document.getElementById('outCalc');
  const totalTxt = document.getElementById('montoTotalTxt');
  const detTxt = document.getElementById('descDetalleTxt');
  const waBtn = document.getElementById('waLinkBtn');

  let total = 0;
  let detalle = "";

  if (prod === 'serigrafia') {
    if (!cant || cant < 100) {
      out.style.display = 'none';
      alert("El pedido mínimo para globos con impresión de 1 tinta es de 100 unidades.");
      return;
    }

    let unitario = 175;
    if (cant >= 2000) unitario = 110;
    else if (cant >= 1000) unitario = 150;

    total = cant * unitario;
    detalle = `${cant} globos con impresión serigráfica (1 tinta) a ₡${unitario} c/u.`;
  } else if (prod === 'multicolor') {
    if (!cant || cant < 500) {
      out.style.display = 'none';
      alert("El pedido mínimo para impresión multicolor de hasta 5 colores es de 500 unidades.");
      return;
    }

    const unitario = 230;
    total = cant * unitario;
    detalle = `${cant} globos con impresión multicolor de hasta 5 colores a ₡${unitario} c/u.`;
  } else if (prod === 'cinco_caras') {
    if (!cant || cant < 500) {
      out.style.display = 'none';
      alert("El pedido mínimo para impresión de 5 caras es de 500 unidades.");
      return;
    }

    const unitario = 230;
    total = cant * unitario;
    detalle = `${cant} globos con impresión a 5 caras (frente, derecha, izquierda, atrás y arriba) a ₡${unitario} c/u.`;
  } else if (prod === 'num40') {
    const esCombo = document.getElementById('comboCheck').checked;
    const minReq = esCombo ? 1 : 2;
    const unitario = esCombo ? 10000 : 12000;

    if (!cant || cant < minReq) {
      out.style.display = 'none';
      alert(esCombo ? "El pedido mínimo en combo para globos número 40 es de 1 unidad." : "El pedido mínimo individual de globos número 40 es de 2 unidades.");
      return;
    }

    total = cant * unitario;
    detalle = `${cant} Globo(s) Número 40 a ₡${unitario.toLocaleString('es-CR')} c/u (${esCombo ? 'Aplica tarifa combo con otro pedido' : 'Compra directa'}).`;
  }

  const totalFormateado = "₡" + total.toLocaleString('es-CR');
  totalTxt.innerText = `${totalFormateado} CRC`;
  detTxt.innerText = detalle;

  const mensaje = encodeURIComponent(`¡Hola Globo Studio CR! Quiero cotizar: ${detalle} Total estimado: ${totalFormateado}. ¿Tienen disponibilidad?`);
  waBtn.href = `https://wa.me/50671730138?text=${mensaje}`;

  out.style.display = 'block';
}

window.addEventListener('DOMContentLoaded', calcularPresupuesto);