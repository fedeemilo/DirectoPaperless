const path = window.location.pathname;
const miSesion = window.sessionStorage;

// ID del body de la página actual
const bodyId = document.body.id;

/* FUNCIONES */

// VALIDACIÓN CONTRASEÑA
const validarContraseña = (input) => {
	let letras = 0;
	let numeros = 0;

	for (let i = 0; i < input.value.length; i++) {
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
	// miSesion.clear();
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
	let URL = miSesion.getItem(tipo);

	contenedor.style.backgroundImage = `url(${URL})`;
	contenedor.style.backgroundSize = '100% 100%';
	contenedor.style.backgroundRepeat = 'no-repeat';

	boton.addEventListener('click', (e) => {
		input.click();
	});

	input.addEventListener('change', () => {
		miSesion.clear();
		const repeatReader = new FileReader();

		repeatReader.onloadend = function () {
			miSesion.setItem(tipo, repeatReader.result);
			contenedor.style.backgroundImage = `url(${repeatReader.result})`;
		};

		repeatReader.readAsDataURL(input.files[0]);
	});
};

// FOTO POCO CLARA
const fotoPocoClara = (boton, input) => {
	boton.addEventListener('click', (e) => {
		input.click();
	});

	input.addEventListener('change', () => {
		const unclearReader = new FileReader();

		unclearReader.onloadend = function () {
			let fotoVerificar = 'frente';

			setTimeout(() => {
				window.location.href = `http://ringofox.agency/Directo-Paperless/Etapa3/verificar-foto-${fotoVerificar}.html`;
			}, 1000);
		};

		unclearReader.readAsDataURL(input.files[0]);
	});
};

// TOGGLE TICK VERDE
const toggleTick = (botonTick) => {
	for (let i = 0; i < botonTick.length; i++) {
		botonTick[i].addEventListener('click', () => {
			botonTick[i].childNodes[1].classList.toggle('tick-active');
		});
	}
};

// FILTRAR BÚSQUEDA
const filtrarBusqueda = (item, consulta, idx) => {
	let contenido = `
				<li class="list-group-item persona">
						<span class="persona-nombre"
							>${personaNombre[idx].textContent}</span
						>
						<br />
						<span class="persona-dni">${personaDNI[idx].textContent}</span>
						<a href="#" class="persona-tick">
							<svg class="mt-2 ml-4">
								<use xlink:href="#tick"></use>
							</svg>
						</a>
					</li>					
				`;

	if (item.indexOf(consulta) !== -1) {
		listaResultados.insertAdjacentHTML('afterbegin', contenido);
		let items = listaResultados.children[0].childNodes[7];

		items.onclick = items.addEventListener('click', () => {
			items.childNodes[1].classList.toggle('tick-active');
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
if (bodyId == 'login-comercio') {
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

if (bodyId == 'sacar-foto-frente') {
	miSesion.clear();
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

if (bodyId == 'verificar-foto-frente') {
	verificarFoto(
		botonRepetirFotoFrente,
		inputRepetirFotoFrente,
		contenedorFotoFrente,
		'frente'
	);
}

/* VERIFICAR-FOTO-FRENTE - fin */

/* ============================================================================= */

/* FOTO-POCO-CLARA  - inicio */

const inputFotoPocoClara = document.getElementById('input-foto-poco-clara');
const botonFotoPocoClara = document.getElementById('boton-foto-poco-clara');

if (bodyId == 'foto-poco-clara') {
	fotoPocoClara(botonFotoPocoClara, inputFotoPocoClara);
}

/* FOTO-POCO-CLARA  - fin */

/* ============================================================================= */

/* SACAR-FOTO-DORSO  - fin */

const inputFotoDorso = document.getElementById('input-foto-dorso');
const botonFotoDorso = document.getElementById('boton-foto-dorso');

if (bodyId == 'sacar-foto-dorso') {
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

if (bodyId == 'verificar-foto-dorso') {
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

if (bodyId == 'sacar-foto-selfie') {
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

if (bodyId == 'verificar-foto-selfie') {
	let URL = miSesion.getItem('selfie');
	verificarFoto(
		botonRepetirFotoSelfie,
		inputRepetirFotoSelfie,
		contenedorFotoSelfie,
		'selfie'
	);
	miSesion.clear();
	miSesion.setItem('selfie', URL);
}

/* VERIFICAR-FOTO-SELFIE - fin */

/* ============================================================================= */

/* SACAR-FOTO-GESTUAL  - inicio */

const inputFotoGestual = document.getElementById('input-foto-gestual');
const botonFotoGestual = document.getElementById('boton-foto-gestual');

if (bodyId == 'sacar-foto-gestual') {
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

if (bodyId == 'verificar-foto-gestual') {
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

if (bodyId == 'validar-identidad') {
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
				filtrarBusqueda(persona, personaBuscada, i);
			}
		}

		// Si busco por número DNI
		if (!isNaN(e.target.value)) {
			// Buscar por DNI de la persona
			for (let i = 0; i < personaDNI.length; i++) {
				let dniPersona = personaDNI[i].textContent.split(' ')[1];
				let dniSinPuntos = dniPersona.replace(/\./g, '');
				let dniBuscado = e.target.value;
				filtrarBusqueda(dniSinPuntos, dniBuscado, i);
			}
		}

		// Si no hay nada ingresado en el input la lista vuelve a su estado default
		if (buscador.value == '') {
			listaResultados.innerHTML = '';
			listaResultados.insertAdjacentHTML('afterbegin', resultadosDefault);

			// Añadir función de prender y apagar tick al HTML insertado
			for (let i = 0; i < personaNombre.length; i++) {
				let items;
				i === 0
					? (items = listaResultados.children[i].childNodes[7])
					: (items = listaResultados.children[i].childNodes[7].previousSibling);

				items.onclick = items.addEventListener('click', () => {
					items.childNodes[1].classList.toggle('tick-active');
				});
			}
			// Quitar mensaje de 'no hay coincidencias'
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
	bodyId == 'error-lorem' ||
	bodyId == 'error-conexion' ||
	bodyId == 'error-solicitudes'
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
