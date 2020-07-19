const path = window.location.pathname;
const paginaActual = path.split('/').pop();
const miSesion = window.sessionStorage;
console.log(paginaActual);

/* FUNCIONES */

// VALIDACIÓN CONTRASEÑA
const validarContraseña = (input) => {
	let regex = /[A-Za-z0-9]+/;
	let letras = 0;
	let numeros = 0;

	console.log(input.value);

	for (let i = 0; i < input.value.length; i++) {
		console.log(input.value[i]);

		if (isNaN(input.value[i])) {
			letras += 1;
		} else if (!isNaN(input.value[i])) {
			numeros += 1;
		}
	}

	return letras == 4 && numeros == 4;
};

// SACAR FOTO
const sacarFoto = (boton, input, tipo) => {
	miSesion.clear();
	boton.addEventListener('click', () => {
		input.click();
	});

	input.addEventListener('change', () => {
		if (input.files.length === 0) {
			console.log('No file selected');
			return;
		}
		const reader = new FileReader();

		reader.onloadend = function () {
			miSesion.setItem(`${tipo}`, reader.result);
		};

		reader.readAsDataURL(input.files[0]);

		setTimeout(() => {
			window.location.href = `http://ringofox.agency/Directo-Paperless/Etapa3/verificar-foto-${tipo}.html`;
		}, 1000);
	});
};

// VERIFICAR FOTO
const verificarFoto = (boton, input, contenedor, tipo) => {
	console.log(miSesion);
	let URL = miSesion.getItem(tipo);

	contenedor.style.backgroundImage = `url(${URL})`;
	contenedor.style.backgroundSize = '100% 100%';
	contenedor.style.backgroundRepeat = 'no-repeat';

	boton.addEventListener('click', (e) => {
		input.click();
	});

	input.addEventListener('change', () => {
		const repeatReader = new FileReader();

		repeatReader.onloadend = function () {
			miSesion.setItem(tipo, repeatReader.result);
			contenedor.style.backgroundImage = `url(${repeatReader.result})`;
		};

		repeatReader.readAsDataURL(input.files[0]);
	});
};

// TOGGLE TICK VERDE

const toggleTick = (botonTick) => {
	for (let i = 0; i < botonTick.length; i++) {
		botonTick[i].addEventListener('click', () => {
			console.log(botonTick[i].childNodes[1]);
			botonTick[i].childNodes[1].classList.toggle('tick-active');
		});
	}
};

/* ============================================================================= */

/* LOGIN-COMERCIO - inicio */
const formularioLogin = document.querySelector('.formulario-login');
const inputUsuario = document.querySelector('.input-usuario');
const iconoUsuario = document.querySelector('.icon-usuario');
const errorUsuario = document.querySelector('.error-usuario');
const inputContraseña = document.querySelector('.input-contraseña');
const iconoContraseña = document.querySelector('.icon-contraseña');
const errorContraseña = document.querySelector('.error-contraseña');

// Caracteres permitidos para usuario -> alfanumérico
const caracteres = /[A-Za-z0-9]+/;

// Si la página actual es login-comercio.html ejecuto el código
if (paginaActual == 'login-comercio.html') {
	// Validación de formulario
	formularioLogin.addEventListener('submit', (e) => {
		// Input usuario vacío
		if (inputUsuario.value.length === 0) {
			e.preventDefault();
			inputUsuario.classList.add('no-valido-input');
			iconoUsuario.classList.add('no-valido-icon');
			errorUsuario.textContent = 'Debes ingresar un nombre de usuario';
			errorUsuario.style.display = 'block';
		}

		// Input contraseña vacío
		if (inputContraseña.value.length === 0) {
			e.preventDefault();
			inputContraseña.classList.add('no-valido-input');
			iconoContraseña.classList.add('no-valido-icon');
			errorContraseña.textContent = 'Debes ingresar una contraseña';
			errorContraseña.style.display = 'block';
		} else if (inputContraseña.value.length < 8) {
			e.preventDefault();
			inputContraseña.classList.add('no-valido-input');
			iconoContraseña.classList.add('no-valido-icon');
			errorContraseña.style.display = 'block';
		}

		if (!validarContraseña(inputContraseña)) {
			e.preventDefault();
			inputContraseña.classList.add('no-valido-input');
			iconoContraseña.classList.add('no-valido-icon');
			errorContraseña.style.display = 'block';
			errorContraseña.textContent =
				'La contraseña debe contener 8 caracteres alfanuméricos';
		}
	});

	// Validación input usuario
	inputUsuario.addEventListener('input', (e) => {
		if (inputUsuario.value.length > 0) {
			inputUsuario.classList.remove('no-valido-input');
			iconoUsuario.classList.remove('no-valido-icon');
			errorUsuario.style.display = 'none';
		} else {
			inputUsuario.classList.add('no-valido-input');
			iconoUsuario.classList.add('no-valido-icon');
			errorUsuario.textContent = 'Debes ingresar un nombre de usuario';
			errorUsuario.style.display = 'block';
		}
	});

	// Validación input contraseña
	inputContraseña.addEventListener('input', (e) => {
		if (inputContraseña.value.length > 0) {
			inputContraseña.classList.remove('no-valido-input');
			iconoContraseña.classList.remove('no-valido-icon');
			errorContraseña.style.display = 'none';
		} else {
			inputContraseña.classList.add('no-valido-input');
			iconoContraseña.classList.add('no-valido-icon');
			errorContraseña.textContent = 'Debes ingresar una contraseña';
			errorContraseña.style.display = 'block';
		}
	});

	// Mostrar u ocultar password al clickear en el ícono del ojo
	const ojoAbierto = document.querySelector('.password-visible');
	const ojoCerrado = document.querySelector('.password-oculta');

	ojoCerrado.addEventListener('click', (e) => {
		ojoAbierto.style.display = 'block';
		ojoCerrado.style.display = 'none';
		inputContraseña.type = 'text';
	});

	ojoAbierto.addEventListener('click', (e) => {
		ojoAbierto.style.display = 'none';
		ojoCerrado.style.display = 'block';
		inputContraseña.type = 'password';
	});

	// Manejo del popup de error
	const olvideClave = document.getElementById('olvido-contraseña');
	const cerrarPopup = document.querySelector('.cerrar-popup');
	const containerOverlay = document.querySelector('.container-overlay');

	olvideClave.addEventListener('click', (e) => {
		e.preventDefault();
		console.log(e);
		containerOverlay.style.display = 'block';

		containerOverlay.addEventListener('click', () => {
			containerOverlay.style.display = 'none';
		});
	});

	cerrarPopup.addEventListener('click', (e) => {
		e.preventDefault();
		containerOverlay.style.display = 'none';
	});
}

/* LOGIN-COMERCIO - fin */

/* ============================================================================= */

/* SACAR-FOTO-FRENTE - inicio */
const inputFotoFrente = document.getElementById('input-foto-frente');
const botonFotoFrente = document.getElementById('boton-foto-frente');

if (paginaActual == 'sacar-foto-frente.html') {
	sacarFoto(botonFotoFrente, inputFotoFrente, 'frente');
}

// http://127.0.0.1:5500;
// http://ringofox.agency/Directo-Paperless

/* SACAR-FOTO-FRENTE - inicio */

/* ============================================================================= */

/* VERIFICAR-FOTO-FRENTE - inicio */

const contenedorFotoFrente = document.querySelector(
	'.main-verificar-frente__imagen'
);
const inputRepetirFotoFrente = document.getElementById(
	'input-repetir-foto-frente'
);
const botonRepetirFotoFrente = document.getElementById(
	'boton-repetir-foto-frente'
);

if (paginaActual == 'verificar-foto-frente.html') {
	verificarFoto(
		botonRepetirFotoFrente,
		inputRepetirFotoFrente,
		contenedorFotoFrente,
		'frente'
	);
}

/* VERIFICAR-FOTO-FRENTE - fin */

/* ============================================================================= */

/* FRENTE-POCO-CLARA  - inicio */

const inputFotoPocoClara = document.getElementById('input-foto-poco-clara');
const botonFotoPocoClara = document.getElementById('boton-foto-poco-clara');

if (paginaActual == 'frente-poco-clara.html') {
	botonFotoPocoClara.addEventListener('click', (e) => {
		inputFotoPocoClara.click();
	});

	inputFotoPocoClara.addEventListener('change', () => {
		const unclearReader = new FileReader();

		unclearReader.onloadend = function () {
			miSesion.setItem('fotoFrente', unclearReader.result);
			setTimeout(() => {
				window.location.href = `http://ringofox.agency/Directo-Paperless/Etapa3/verificar-foto-frente.html`;
			}, 1000);
		};

		unclearReader.readAsDataURL(inputFotoPocoClara.files[0]);
	});
}

/* FRENTE-POCO-CLARA  - fin */

/* ============================================================================= */

/* SACAR-FOTO-DORSO  - fin */

const inputFotoDorso = document.getElementById('input-foto-dorso');
const botonFotoDorso = document.getElementById('boton-foto-dorso');

if (paginaActual == 'sacar-foto-dorso.html') {
	sacarFoto(botonFotoDorso, inputFotoDorso, 'dorso');
}

/* SACAR-FOTO-DORSO  - fin */

/* ============================================================================= */

/* VERIFICAR-FOTO-DORSO - inicio */

const contenedorFotoDorso = document.querySelector(
	'.main-verificar-dorso__imagen'
);
const inputRepetirFotoDorso = document.getElementById(
	'input-repetir-foto-dorso'
);
const botonRepetirFotoDorso = document.getElementById(
	'boton-repetir-foto-dorso'
);

if (paginaActual == 'verificar-foto-dorso.html') {
	verificarFoto(
		botonRepetirFotoDorso,
		inputRepetirFotoDorso,
		contenedorFotoDorso,
		'dorso'
	);
}

/* VERIFICAR-FOTO-DORSO - fin */

/* ============================================================================= */

/* SACAR-FOTO-SELFIE  - inicio */

const inputFotoSelfie = document.getElementById('input-foto-selfie');
const botonFotoSelfie = document.getElementById('boton-foto-selfie');

if (paginaActual == 'sacar-foto-selfie.html') {
	sacarFoto(botonFotoSelfie, inputFotoSelfie, 'selfie');
}

/* SACAR-FOTO-SELFIE  - fin */

/* ============================================================================= */

/* VERIFICAR-FOTO-SELFIE - inicio */

const contenedorFotoSelfie = document.querySelector(
	'.main-verificar-selfie__imagen'
);
const inputRepetirFotoSelfie = document.getElementById(
	'input-verificar-foto-selfie'
);
const botonRepetirFotoSelfie = document.getElementById(
	'boton-verificar-foto-selfie'
);

if (paginaActual == 'verificar-foto-selfie.html') {
	verificarFoto(
		botonRepetirFotoSelfie,
		inputRepetirFotoSelfie,
		contenedorFotoSelfie,
		'selfie'
	);
}

/* VERIFICAR-FOTO-SELFIE - fin */

/* ============================================================================= */

/* SACAR-FOTO-GESTUAL  - inicio */

const inputFotoGestual = document.getElementById('input-foto-gestual');
const botonFotoGestual = document.getElementById('boton-foto-gestual');

if (paginaActual == 'sacar-foto-gestual.html') {
	sacarFoto(botonFotoGestual, inputFotoGestual, 'gestual');
}

/* SACAR-FOTO-GESTUAL  - fin */

/* ============================================================================= */

/* VERIFICAR-FOTO-GESTUAL - inicio */

const contenedorFotoGestual = document.querySelector(
	'.main-verificar-gestual__imagen'
);
const inputRepetirFotoGestual = document.getElementById(
	'input-verificar-foto-gestual'
);
const botonRepetirFotoGestual = document.getElementById(
	'boton-verificar-foto-gestual'
);

if (paginaActual == 'verificar-foto-gestual.html') {
	verificarFoto(
		botonRepetirFotoGestual,
		inputRepetirFotoGestual,
		contenedorFotoGestual,
		'gestual'
	);
}

/* VERIFICAR-FOTO-GESTUAL - fin */

/* ============================================================================= */

/* VALIDAR-IDENTIDAD - inicio */

// VARIABLES
const botonTick = document.querySelectorAll('.persona-tick');
const personaNombre = document.querySelectorAll('.persona-nombre');
const personaDNI = document.querySelectorAll('.persona-dni');
const buscador = document.getElementById('buscador');
const listaResultados = document.querySelector(
	'.main-validar-identidad__resultados--lista'
);
const mensajeErrorOverlay = document.querySelector('.container-overlay');
const mensajeError = document.querySelector('.error-sin-resultado');

if (paginaActual == 'validar-identidad.html') {
	const resultadosDefault = listaResultados.innerHTML;
	// Al clickear el tick el mismo hace toggle de color verde
	toggleTick(botonTick);

	// Al hacer una busqueda se filtran los resultados
	buscador.addEventListener('input', (e) => {
		listaResultados.innerHTML = '';
		toggleTick(botonTick);

		// Si busco por nombre
		if (isNaN(e.target.value)) {
			// Buscar por nombre de la persona
			for (let i = 0; i < personaNombre.length; i++) {
				let persona = personaNombre[i].textContent.toLowerCase();
				let personaBuscada = e.target.value.toLowerCase();
				let contenido = `
				<li class="list-group-item persona">
						<span class="persona-nombre"
							>${personaNombre[i].textContent}</span
						>
						<br />
						<span class="persona-dni">${personaDNI[i].textContent}</span>
						<a href="#" class="persona-tick">
							<svg class="mt-2 ml-4">
								<use xlink:href="#tick"></use>
							</svg>
						</a>
					</li>
			
				
				`;

				if (persona.split(',')[0].indexOf(personaBuscada) !== -1) {
					listaResultados.insertAdjacentHTML('afterbegin', contenido);
					console.log(listaResultados.children[0].childNodes[7]);
					let items = listaResultados.children[0].childNodes[7];

					items.onclick = items.addEventListener('click', () => {
						items.childNodes[1].classList.toggle('tick-active');
					});
				}
			}
		}

		// Si busco por número DNI
		if (!isNaN(e.target.value)) {
			// Buscar por DNI de la persona
			for (let i = 0; i < personaDNI.length; i++) {
				let dniPersona = personaDNI[i].textContent.split(' ')[1];
				let dniSinPuntos = dniPersona.replace(/\./g, '');
				let contenido = `
				<li class="list-group-item persona">
						<span class="persona-nombre"
							>${personaNombre[i].textContent}</span
						>
						<br />
						<span class="persona-dni">${personaDNI[i].textContent}</span>
						<a href="#" class="persona-tick">
							<svg class="mt-2 ml-4">
								<use xlink:href="#tick"></use>
							</svg>
						</a>
					</li>
			
				
				`;

				if (dniSinPuntos.indexOf(e.target.value) !== -1) {
					listaResultados.insertAdjacentHTML('afterbegin', contenido);
					console.log(listaResultados.children[0].childNodes[7]);
					let items = listaResultados.children[0].childNodes[7];

					items.onclick = items.addEventListener('click', () => {
						items.childNodes[1].classList.toggle('tick-active');
					});
				}
			}
		}

		// Si no hay nada ingresado en el input la lista vuelve a su estado default
		if (buscador.value == '') {
			listaResultados.innerHTML = '';
			listaResultados.insertAdjacentHTML('afterbegin', resultadosDefault);

			for (let i = 0; i < personaNombre.length; i++) {
				let items;
				if (i === 0) {
					items = listaResultados.children[i].childNodes[7];
				} else {
					items = listaResultados.children[i].childNodes[7].previousSibling;
				}
				console.log(items);

				items.onclick = items.addEventListener('click', () => {
					items.childNodes[1].classList.toggle('tick-active');
				});
			}
			mensajeError.style.display = '';
		}

		// Si no se encuentra lo que el usuario está buscando
		if (listaResultados.innerHTML === '') {
			let separadores = document.querySelectorAll('hr');
			for (let i = 0; i < separadores.length; i++) {
				separadores[i].style.display = 'none';
			}
			listaResultados.innerHTML = '';
			mensajeError.style.cssText = `

			position: relative;
			left: 1.6rem;
			bottom: .5rem;
			font-size: .85rem;
			font-family: 'Roboto', sans-serif;
			color: #e41f26;
			display: block !important;
				
			`;
		} else {
			mensajeError.style.display = 'none';
		}
	});
}

/* VALIDAR-IDENTIDAD - fin */

/* ============================================================================= */

/* PANTALLAS DE ERROR - inicio */

// Manejo del popup de error
const olvideClave = document.getElementById('olvido-contraseña');
const cerrarPopup = document.querySelector('.cerrar-popup');
const containerOverlayError = document.querySelector('.container-overlay');
const bodyError = document.querySelector('.body-error');

if (
	paginaActual == 'error-lorem.html' ||
	paginaActual == 'error-conexion.html' ||
	paginaActual == 'error-solicitudes.html'
) {
	olvideClave.addEventListener('click', (e) => {
		e.preventDefault();
		containerOverlayError.style.display = 'block';

		containerOverlayError.addEventListener('click', () => {
			containerOverlayError.style.display = 'none';
		});
	});

	cerrarPopup.addEventListener('click', (e) => {
		e.preventDefault();
		containerOverlayError.style.display = 'none';
	});

	containerOverlayError.addEventListener('click', () => {
		containerOverlayError.style.display = 'none';
	});
}

/* PANTALLAS DE ERROR - fin */

/* ============================================================================= */
