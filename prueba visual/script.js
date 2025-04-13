
function convertirVelocidad() {
    const valor = parseFloat(document.getElementById("velocidadInput").value);
    const tipo = document.getElementById("tipoVelocidad").value;
    let resultado = "";

    if (tipo === "ms-kmh") {
        resultado = `${(valor * 3.6).toString()} km/h`;
    } else if (tipo === "kmh-ms") {
        resultado = `${(valor / 3.6).toString()} m/s`;
    }

    document.getElementById("resultadoVelocidad").innerText = resultado;
}

function convertirTiempo() {
    const valor = parseFloat(document.getElementById("tiempoInput").value);
    const tipo = document.getElementById("tipoTiempo").value;
    let resultado = "";

    if (isNaN(valor)) {
        document.getElementById("resultadoTiempo").innerText = "Por favor ingresa un número válido.";
        return;
    }

    if (tipo === "horas-segundos") {
        resultado = `${(valor * 3600).toLocaleString()} segundos`;
    } else if (tipo === "segundos-horas") {
        const horas = valor / 3600;
        resultado = `${Number(horas).toPrecision(2)} horas`;
    }

    document.getElementById("resultadoTiempo").innerText = resultado;
}

function convertirDistancia() {
    const valor = parseFloat(document.getElementById("distanciaInput").value);
    const tipo = document.getElementById("tipoDistancia").value;
    let resultado = "";

    if (tipo === "km-m") {
        resultado = `${valor * 1000} metros`;
    } else if (tipo === "m-km") {
        resultado = `${(valor / 1000).toString()} kilómetros`;
    }

    document.getElementById("resultadoDistancia").innerText = resultado;
}


function calcular() {
    const V = parseFloat(document.getElementById("V").value);
    const unidadVelocidad = document.getElementById("unidadVelocidad").value;
    const Dx = parseFloat(document.getElementById("Dx").value);
    const unidadDistancia = document.getElementById("unidadDistancia").value;
    const Dt = parseFloat(document.getElementById("Dt").value);
    const unidadTiempo = document.getElementById("unidadTiempo").value;
    const tipo = document.getElementById("tipoCalculo").value;

    let resultado = "";

    // Verificar si hay al menos dos valores válidos
    const valoresValidos = [V, Dx, Dt].filter(valor => !isNaN(valor)); // Contar valores válidos
    if (valoresValidos.length < 2) {
        resultado = "Por favor, ingrese al menos dos valores válidos para calcular.";
        document.getElementById("resultadoCalculo").innerText = resultado;
        return;
    }

    if (tipo === "velocidad") {
        const distancia = unidadDistancia === "m" ? Dx / 1000 : Dx; // Convertir metros a kilómetros si es necesario
        const tiempo = unidadTiempo === "segundos" ? Dt / 3600 : Dt; // Convertir segundos a horas si es necesario
        const velocidad = distancia / tiempo; // Calcular velocidad

        resultado = `La velocidad es ${unidadVelocidad === "ms" ? velocidad * 1000 : velocidad.toString()} ${unidadVelocidad}.`;
    } else if (tipo === "tiempo") {
        const distancia = unidadDistancia === "m" ? Dx / 1000 : Dx; // Convertir metros a kilómetros si es necesario
        const velocidad = unidadVelocidad === "ms" ? V / 3.6 : V; // Convertir m/s a km/h si es necesario
        const tiempo = distancia / velocidad; // Calcular tiempo

        resultado = `El tiempo es ${unidadTiempo === "segundos" ? tiempo * 3600 : tiempo.toString()} ${unidadTiempo}.`;
    } else if (tipo === "distancia") {
        const velocidad = unidadVelocidad === "ms" ? V / 3.6 : V; // Convertir m/s a km/h si es necesario
        const tiempo = unidadTiempo === "segundos" ? Dt / 3600 : Dt; // Convertir segundos a horas si es necesario
        const distancia = velocidad * tiempo; // Calcular distancia

        resultado = `La distancia es ${unidadDistancia === "m" ? distancia * 1000 : distancia.toString()} ${unidadDistancia}.`;
    } else {
        resultado = "Seleccione una opción válida.";
    }

    document.getElementById("resultadoCalculo").innerText = resultado;
}


// Función para actualizar el estado de los campos y el tipo de cálculo
function actualizarEstado() {
    const V = document.getElementById("V").value;
    const Dx = document.getElementById("Dx").value;
    const Dt = document.getElementById("Dt").value;
    const tipoCalculo = document.getElementById("tipoCalculo");

    // Contar cuántos campos están rellenados
    let camposRellenos = 0;
    if (V) camposRellenos++;
    if (Dx) camposRellenos++;
    if (Dt) camposRellenos++;

    // Si hay dos campos rellenados, deshabilitar el campo vacío y sus unidades
    if (camposRellenos === 2) {
        if (!V) {
            document.getElementById("V").disabled = true;
            document.getElementById("unidadVelocidad").disabled = true;
            tipoCalculo.value = "velocidad";
        } else {
            document.getElementById("V").disabled = false;
            document.getElementById("unidadVelocidad").disabled = false;
        }

        if (!Dx) {
            document.getElementById("Dx").disabled = true;
            document.getElementById("unidadDistancia").disabled = true;
            tipoCalculo.value = "distancia";
        } else {
            document.getElementById("Dx").disabled = false;
            document.getElementById("unidadDistancia").disabled = false;
        }

        if (!Dt) {
            document.getElementById("Dt").disabled = true;
            document.getElementById("unidadTiempo").disabled = true;
            tipoCalculo.value = "tiempo";
        } else {
            document.getElementById("Dt").disabled = false;
            document.getElementById("unidadTiempo").disabled = false;
        }
    } else {
        // Si no hay exactamente dos campos rellenados, habilitar todos los campos y sus unidades
        document.getElementById("V").disabled = false;
        document.getElementById("unidadVelocidad").disabled = false;
        document.getElementById("Dx").disabled = false;
        document.getElementById("unidadDistancia").disabled = false;
        document.getElementById("Dt").disabled = false;
        document.getElementById("unidadTiempo").disabled = false;
    }
}

// Añadir eventos para detectar cambios en los campos
document.getElementById("V").addEventListener("input", actualizarEstado);
document.getElementById("Dx").addEventListener("input", actualizarEstado);
document.getElementById("Dt").addEventListener("input", actualizarEstado);


// Función para resetear la conversión de velocidad
function resetearVelocidad() {
    document.getElementById("velocidadInput").value = "";
    document.getElementById("resultadoVelocidad").innerText = "";
    document.getElementById("tipoVelocidad").value = "ms-kmh"; // Restablecer a la opción predeterminada
}

// Función para resetear la conversión de tiempo
function resetearTiempo() {
    document.getElementById("tiempoInput").value = "";
    document.getElementById("resultadoTiempo").innerText = "";
    document.getElementById("tipoTiempo").value = "horas-segundos"; // Restablecer a la opción predeterminada
}

// Función para resetear la conversión de distancia
function resetearDistancia() {
    document.getElementById("distanciaInput").value = "";
    document.getElementById("resultadoDistancia").innerText = "";
    document.getElementById("tipoDistancia").value = "km-m"; // Restablecer a la opción predeterminada
}





function mostrarProblema() {
    const radios = document.getElementsByName("problema");
    const opcion1 = document.getElementById("opcion1");
    const opcion2 = document.getElementById("opcion2");

    opcion1.style.display = "none";
    opcion2.style.display = "none";

    radios.forEach((radio) => {
        if (radio.checked) {
            if (radio.value === "opcion1") {
                opcion1.style.display = "block";
            } else if (radio.value === "opcion2") {
                opcion2.style.display = "block";
            }
        }
    });
}

function calcularOpcion1() {
    // Obtener y convertir valores (coma a punto)
    let vAzul = parseFloat(document.getElementById("velocidadAzul").value.replace(",", "."));
    let unidadVAzul = document.getElementById("unidadVelocidadAzul").value;

    let vRoja = parseFloat(document.getElementById("velocidadRoja").value.replace(",", "."));
    let unidadVRoja = document.getElementById("unidadVelocidadRoja").value;

    let distancia = parseFloat(document.getElementById("distancia").value.replace(",", "."));
    let unidadDistancia = document.getElementById("unidadDistancia").value;

    // Validar que no haya NaN
    if (isNaN(vAzul) || isNaN(vRoja) || isNaN(distancia)) {
        document.getElementById("resultadoCalculo").innerText = "Por favor completa todos los datos.";
        return;
    }

    // Contar unidades en m/s y km/h
    let unidades = [unidadVAzul, unidadVRoja, unidadDistancia];
    let msCount = unidades.filter(u => u === "ms").length;
    let kmhCount = unidades.filter(u => u === "kmh").length;

    // Si hay solo 1 distinta, convertirla
    if (msCount === 1 && kmhCount === 2) {
        if (unidadVAzul === "ms") {
            vAzul *= 3.6;
            unidadVAzul = "kmh";
        } else if (unidadVRoja === "ms") {
            vRoja *= 3.6;
            unidadVRoja = "kmh";
        } else if (unidadDistancia === "ms") {
            distancia *= 3.6;
            unidadDistancia = "kmh";
        }
    } else if (kmhCount === 1 && msCount === 2) {
        if (unidadVAzul === "kmh") {
            vAzul /= 3.6;
            unidadVAzul = "ms";
        } else if (unidadVRoja === "kmh") {
            vRoja /= 3.6;
            unidadVRoja = "ms";
        } else if (unidadDistancia === "kmh") {
            distancia /= 3.6;
            unidadDistancia = "ms";
        }
    }

    // Velocidad roja es negativa
    vRoja = -Math.abs(vRoja);

    // Mostrar las ecuaciones como las planteaste
    let ec1 = `Ecuación 1 (esfera celeste): v_celeste * dt = dx => ${vAzul.toFixed(3)} * dt = x`;
    let ec2 = `Ecuación 2 (esfera roja): v_roja * dt = dx => ${vRoja.toFixed(3)} * dt = x - ${distancia}`;

    // Sustitución
    let sustitucion = `${vRoja.toFixed(3)} * dt = ${vAzul.toFixed(3)} * dt - ${distancia}`;

    // Resolución
    let denominador = vAzul - vRoja;
    if (denominador === 0) {
        document.getElementById("resultadoCalculo").innerText = "Las velocidades no permiten un encuentro.";
        return;
    }

    let dt = distancia / denominador;
    let x = vAzul * dt;

    // Determinar unidades de salida según el sistema usado
    let tiempoUnidad = (unidadVAzul === "kmh") ? "horas" : "segundos";
    let distanciaUnidad = (unidadVAzul === "kmh") ? "kilómetros" : "metros";

    // Mostrar resultado completo
    document.getElementById("resultadoCalculo").innerText =
        "Resultados:\n" +
        `Tiempo (dt): ${dt.toFixed(3)} ${tiempoUnidad}\n` +
        `Desplazamiento(Dx): ${x.toFixed(3)} ${distanciaUnidad}`;
}
