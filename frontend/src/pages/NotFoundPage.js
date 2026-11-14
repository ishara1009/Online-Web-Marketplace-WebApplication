import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './UtilityPages.css';

export default function NotFoundPage(){const navigate=useNavigate();return <><Header/><main className="utility-page not-found"><span>404</span><h1>Page not found</h1><p>The page may have moved, or the address may be incorrect.</p><div><button onClick={()=>navigate('/')}>Go home</button><button onClick={()=>navigate('/products')}>Browse products</button><button className="secondary" onClick={()=>navigate(-1)}>Go back</button></div></main><Footer/></>}
