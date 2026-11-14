import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiClient, { getApiError } from '../services/apiClient';
import './WishlistPage.css';

export default function WishlistPage(){
 const navigate=useNavigate();const[products,setProducts]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[busy,setBusy]=useState('');
 useEffect(()=>{let active=true;apiClient.get('/wishlist').then(({data})=>active&&setProducts(data.products||[])).catch(e=>active&&setError(getApiError(e,'Could not load your wishlist.'))).finally(()=>active&&setLoading(false));return()=>{active=false};},[]);
 const remove=async id=>{setBusy(id);setError('');try{await apiClient.delete(`/wishlist/${id}`);setProducts(items=>items.filter(p=>p._id!==id));}catch(e){setError(getApiError(e,'Could not remove this product.'));}finally{setBusy('');}};
 const moveToCart=async product=>{if(product.stock<=0||product.status==='out_of_stock')return;const cart=JSON.parse(localStorage.getItem('cart')||'[]'),item=cart.find(x=>x._id===product._id);item?item.quantity++:cart.push({...product,quantity:1});localStorage.setItem('cart',JSON.stringify(cart));await remove(product._id);navigate('/cart');};
 return <><Header/><main className="wishlist-page"><header><span>YOUR ACCOUNT</span><h1>Wishlist</h1><p>Products you saved for later.</p></header>{error&&<div className="wishlist-alert" role="alert">{error}</div>}{loading?<div className="wishlist-state">Loading your wishlist…</div>:!products.length?<div className="wishlist-state"><div>♡</div><h2>Your wishlist is empty</h2><p>Save products you are interested in and return to them later.</p><button onClick={()=>navigate('/products')}>Browse products</button></div>:<section className="wishlist-grid">{products.map(product=>{const out=product.stock<=0||product.status==='out_of_stock';return <article key={product._id}><button className="wishlist-remove" aria-label={`Remove ${product.name}`} disabled={busy===product._id} onClick={()=>remove(product._id)}>×</button>{product.images?.[0]?.url?<img src={product.images[0].url} alt={product.name}/>:<div className="wishlist-image-empty">No image</div>}<div><span>{product.category}</span><h2>{product.name}</h2><p>{product.description}</p><strong>${Number(product.discountPrice??product.price).toFixed(2)}</strong><em className={out?'out':''}>{out?'Out of stock':`${product.stock} in stock`}</em><footer><button onClick={()=>navigate(`/product/${product._id}`)}>View details</button><button className="primary" disabled={out||busy===product._id} onClick={()=>moveToCart(product)}>Move to cart</button></footer></div></article>})}</section>}</main><Footer/></>;
}
