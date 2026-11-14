import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './UtilityPages.css';

const pages={
 about:['About TechMart','TechMart is a Sri Lankan technology marketplace focused on making genuine products easier to discover and purchase. We connect customers with a clear catalog, transparent availability, and secure account tools.'],
 contact:['Contact TechMart','For product, order, or account support, email support@techmart.lk or call +94 11 234 5678. Please do not include passwords or payment credentials in your message.'],
 faq:['Frequently Asked Questions','Find answers about accounts, products, delivery, returns, and ordering. For help with a specific order, sign in and open My Orders.'],
 support:['Help Center','Our support team can help with account access, product questions, orders, delivery, and returns. Contact support@techmart.lk with the relevant order number.'],
 shipping:['Shipping Information','Delivery availability, charges, and estimates are presented during checkout. Actual delivery times depend on the destination and product availability.'],
 returns:['Return Policy','Return eligibility depends on the product condition, delivery date, and reason for return. Contact support before sending an item back. This policy content should receive legal review before production use.'],
 terms:['Terms and Conditions','These application-ready terms are placeholders and require legal review before TechMart is deployed for commercial use.'],
 privacy:['Privacy Policy','TechMart processes account, delivery, and order information to provide marketplace services. This placeholder must be reviewed by a qualified privacy professional before production use.'],
 cookies:['Cookie Policy','TechMart uses essential session cookies for authentication. Any analytics or advertising cookies should be documented here before production deployment.'],
 'intellectual-property':['Intellectual Property','Product names and trademarks belong to their respective owners. This placeholder requires legal review before production use.'],
 'seller-policy':['Seller Policy','Seller onboarding, product standards, fulfillment responsibilities, and marketplace conduct must be reviewed and accepted before a seller account is approved.'],
};
export default function InformationPage(){const{slug}=useParams(),content=pages[slug];if(!content)return null;return <><Header/><main className="utility-page policy-page"><span>TECHMART</span><h1>{content[0]}</h1><p>{content[1]}</p></main><Footer/></>}
