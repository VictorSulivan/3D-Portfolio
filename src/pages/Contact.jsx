import React, { Suspense, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import Fox from '../models/Fox';

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)}% loaded</Html>;
};

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const [currentAnimation, setCurrentAnimation] = useState('idle'); // Ajout de l'état

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Matheo',
          from_email: form.email,
          to_email: 'matheoprofessionnel12@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        showAlert({ show: true, text: 'Message sent successfully!', type: 'success' });
        setTimeout(() => {
          hideAlert();
          setForm({ name: '', email: '', message: '' });
        }, 3000);
        e.target.reset(); // Réinitialise le formulaire après envoi
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('EmailJS Error:', error);
        showAlert({ show: true, text: 'I didn’t receive your message', type: 'danger' });
      });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form className="w-full flex-col gap-7 mt-14" onSubmit={handleSubmit} ref={formRef}>
          <label className="text-black-500 font-semibold">
            Name
            <input type="text" name="name" className="input" placeholder="John" required value={form.name} onChange={handleChange} />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input type="email" name="email" className="input" placeholder="John@gmail.com" required value={form.email} onChange={handleChange} />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea name="message" rows={4} className="textarea" placeholder="Let me know how I can help you!" required value={form.message} onChange={handleChange} />
          </label>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
          frameloop="demand"
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox currentAnimation={currentAnimation} position={[0.5, 0.35, 0]} rotation={[12.6, -0.6, 0]} scale={[0.5, 0.5, 0.5]} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
