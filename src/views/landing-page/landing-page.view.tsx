import { useState } from "react";
import homeImage from '../../assets/home.png';
import howToUseVideo from '../../assets/how-to-use.webm';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import InputForm from "../../components/forms/input-form.component";
import LabelForm from "../../components/forms/label-form.component";

export default () => {

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<section className="bg-blue-500 py-4 px-8 md:flex md:justify-between md:items-center" style={{  backgroundColor: '#6391EB' }}>
				<div className="flex items-center justify-between">
					<div className="text-white lg:text-3xl font-bold">TrackTerra</div>
					<button className="md:hidden text-white focus:outline-none focus:text-white" onClick={() => setIsOpen(!isOpen)} >
						<svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" >
							{isOpen ? (
								<path d="M6 18L18 6M6 6l12 12"></path>
							) : (
								<path d="M4 6h16M4 12h16m-7 6h7"></path>
							)}
						</svg>
					</button>
				</div>
				<div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:items-center md:space-x-6`}>
					<a href="#como-usar" className="block md:inline-block mt-4 md:mt-0 text-white">¿Cómo usar?</a>
					<a href="#contactenos" className="block md:inline-block mt-4 md:mt-0 text-white">Contáctenos</a>
					<Link to={'/iniciar-sesion'}><button className="block md:inline-block bg-white text-blue-500 px-4 py-2 rounded-md mt-4 md:mt-0">Iniciar sesión</button></Link>
				</div>
			</section>

			<section className="bg-gray-100 py-12 px-8 md:px-16 lg:px-32 xl:px-12 min-h-screen">
				<div className="flex flex-col md:flex-row items-center justify-center">
					<div className="w-full md:w-1/2 mb-8 md:mb-0">
						<img src={homeImage} alt="Imagen de Control de Asistencia" className="w-full h-auto" />
					</div>
					<div className="w-full md:w-1/2 text-center mx-auto">
						<h1 className="text-4xl lg:text-6xl font-bold mb-4  md:mx-auto">Control de Asistencia Simplificado</h1>
						<p className="text-xl lg:text-2xl font-bold mb-8 lg:mt-12 lg:mb-12 md:mx-auto mx-auto" style={{ maxWidth: 400 }}>
							Registra fácilmente tus horas de trabajo con un solo clic
						</p>

						<Link to={'/iniciar-sesion'}>
							<button className="bg-blue-500 text-white px-8 py-4 text-lg lg:text-3xl font-bold rounded-lg md:mx-auto w-1/2" style={{ maxWidth: 400, backgroundColor: '#6391EB'}}>
								¡Empieza Ahora!
							</button>
						</Link>
					</div>
				</div>
			</section>

			<section id="como-usar" className="relative h-screen flex items-center justify-center mb-40">
				<div className="bg-cover bg-center absolute top-0 left-0 w-full h-full z-0" style={{ backgroundImage: 'url("./how-to-use.png")',backgroundRepeat: 'no-repeat'  }}></div>
				<video controls className="md:w-1/2 h-auto md:h-1/2 absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto object-cover z-10" autoPlay muted loop>
					<source src={howToUseVideo} type="video/webm" />
					Your browser does not support the video tag.
				</video>
				<div className="absolute bottom-20 w-full text-center z-20">
					<p className="text-black text-lg lg:text-3xl font-bold text-center mx-auto" style={{ maxWidth: 700 }}>
						Simplifica tu gestión diaria, proporcionando una manera rápida y precisa de controlar tus horarios laborales.
					</p>
				</div>
			</section>


			<section id="contactenos" className="bg-gray-100">
				<div className="container mx-auto py-16 pt-20">
					<h2 className="text-3xl lg:text-5xl font-bold mb-8 text-center">Contáctenos</h2>
					<p className="text-lg lg:text-2xl text-center text-black mb-8 mx-auto" style={{ maxWidth: 1000 }}>
						¡Nos encantaría saber de ti! Si tienes alguna pregunta, comentario o simplemente quieres ponerte en contacto con nosotros, no dudes en hacerlo a través de los siguientes medios. Estamos aquí para ayudarte en lo que necesites y esperamos poder brindarte la mejor asistencia posible.
					</p>
				</div>

				<div className="container mx-auto py-16 flex flex-col lg:flex-row items-center justify-center">
					<div className="lg:w-1/2 mb-8 lg:mb-0 lg:mr-4">
						<MapContainer center={[40.7128, -74.0060]} zoom={10} style={{ width: '100%', height: '500px' }}>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							/>
							<Marker position={[40.7128, -74.0060]}>
							</Marker>
						</MapContainer>
					</div>
					<div className="lg:w-1/2">
						<div className="max-w-lg mx-auto">
							<form className="bg-white p-5 rounded-md">
								<div className="flex flex-col mb-4">
									<LabelForm htmlFor="email" className="mt-2">Nombre</LabelForm>
									<InputForm
											name="name"
											type="text"
									/>
								</div>
								<div className="flex flex-col mb-4">
									<LabelForm htmlFor="email" className="mt-2">Correo</LabelForm>
									<InputForm
											name="email"
											type="email"
									/>
								</div>
								<div className="flex flex-col mb-4">
									<LabelForm htmlFor="email" className="mt-2">Teléfono</LabelForm>
									<InputForm
											name="email"
											type="phone"
									/>
								</div>
								<div className="flex flex-col mb-4">
									<LabelForm htmlFor="email" className="mt-2">¿En qué podemos ayudarte?</LabelForm>
									<InputForm
											name="message"
											type="textarea"
									/>
								</div>
								<button type="button" className="w-full bg-blue-500 text-white px-8 py-4 text-lg lg:text-2xl font-bold rounded-lg md:mx-auto w-1/2" style={{ backgroundColor: '#6391EB'}}>
									Enviar
								</button>
							</form>
						</div>
					</div>
				</div>

			</section>


			<footer className="bg-[#6391EB] py-16 text-white text-center">
				<h2 className="text-2xl font-bold mb-8">Encuéntranos en:</h2>
				<div className="flex justify-center mb-8">
					<a href="URL_DE_FACEBOOK" target="_blank" rel="noopener noreferrer" className="mx-2">
						<FaFacebook className="w-12 h-12 rounded-full bg-black p-3" />
					</a>
					<a href="URL_DE_TWITTER" target="_blank" rel="noopener noreferrer" className="mx-2">
						<FaTwitter className="w-12 h-12 rounded-full bg-black p-3" />
					</a>
					<a href="URL_DE_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="mx-2">
						<FaInstagram className="w-12 h-12 rounded-full bg-black p-3" />
					</a>
				</div>
				<p>Todos los derechos reservados &copy;</p>
			</footer>
		</>
	)
}

