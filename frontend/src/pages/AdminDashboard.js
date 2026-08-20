import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import './AdminForms.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [activeForm, setActiveForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', password: '', confirmPassword: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!storedUser || storedUser.role !== 'admin') { navigate('/login', { replace: true }); return; }
    setAdmin(storedUser);
    axios.get('/api/auth/admin/users', { withCredentials: true })
      .then(({ data }) => setUsers(data.users || []))
      .catch(() => setError('Could not load users. Please ensure the backend is running.'));
  }, [navigate]);

  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); };
  const showMessage = (message) => { setNotice(message); setError(''); setTimeout(() => setNotice(''), 4000); };

  const createAdmin = async (event) => {
    event.preventDefault(); setError(''); setSaving(true);
    try {
      const { data } = await axios.post('/api/auth/admin/create', adminForm, { withCredentials: true });
      setUsers(current => [...current, data.admin]);
      setAdminForm({ name: '', email: '', password: '' });
      setActiveForm(null); showMessage('New administrator created successfully.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not create administrator.');
    } finally { setSaving(false); }
  };

  const changePassword = async (event) => {
    event.preventDefault(); setError('');
    if (passwordForm.password !== passwordForm.confirmPassword) { setError('New passwords do not match.'); return; }
    setSaving(true);
    try {
      const { data } = await axios.put('/api/auth/password/update', { oldPassword: passwordForm.oldPassword, password: passwordForm.password }, { withCredentials: true });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setPasswordForm({ oldPassword: '', password: '', confirmPassword: '' });
      setActiveForm(null); showMessage('Your password was changed successfully.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not change password.');
    } finally { setSaving(false); }
  };
  if (!admin) return <div className="admin-loading">Checking admin access...</div>;

  return <div className="admin-page">
    <aside className="admin-sidebar"><button className="admin-logo" onClick={()=>navigate('/')}><span>T</span>TechMart</button><nav><button className="active">▦ Dashboard</button><button onClick={()=>navigate('/products')}>▣ Products</button><button>◎ Orders</button><button>♙ Users</button><button onClick={()=>setActiveForm('password')}>⚙ Change Password</button></nav><button className="admin-logout" onClick={logout}>Sign out</button></aside>
    <main className="admin-main"><header><div><span>ADMIN CONSOLE</span><h1>Welcome, {admin.name}</h1><p>Here is an overview of your TechMart store.</p></div><button onClick={()=>navigate('/')}>View Store →</button></header>
      {error && <div className="admin-alert">{error}</div>}{notice && <div className="admin-alert success">{notice}</div>}
      <section className="admin-stats"><article><span>Users</span><strong>{users.filter(u=>u.role==='user').length}</strong><small>Registered accounts</small></article><article><span>Products</span><strong>—</strong><small>Manage catalog</small></article><article><span>Orders</span><strong>—</strong><small>Customer orders</small></article><article><span>Admins</span><strong>{users.filter(u=>u.role==='admin').length || 1}</strong><small>Authorized staff</small></article></section>
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Registered Users</h2><p>Latest accounts with access to TechMart.</p></div><div className="admin-panel-actions"><button onClick={()=>setActiveForm('password')}>Change Password</button><button className="primary" onClick={()=>setActiveForm('admin')}>+ Create Admin</button></div></div><div className="admin-table"><div className="admin-row head"><span>Name</span><span>Email</span><span>Role</span><span>Joined</span></div>{users.length ? users.slice(0,8).map(user=><div className="admin-row" key={user._id || user.id}><span><b>{user.name?.charAt(0)}</b>{user.name}</span><span>{user.email}</span><span><em className={user.role}>{user.role}</em></span><span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Just now'}</span></div>) : <p className="admin-empty">No user records loaded.</p>}</div></section>
    </main>
    {activeForm && <div className="admin-modal-backdrop" onMouseDown={()=>!saving&&setActiveForm(null)}><section className="admin-modal" onMouseDown={event=>event.stopPropagation()}><header><div><span>{activeForm==='admin'?'ADMIN MANAGEMENT':'ACCOUNT SECURITY'}</span><h2>{activeForm==='admin'?'Create New Administrator':'Change Your Password'}</h2><p>{activeForm==='admin'?'The new admin can sign in and manage TechMart.':'Enter your current password to confirm this change.'}</p></div><button type="button" onClick={()=>setActiveForm(null)}>×</button></header>{activeForm==='admin'?<form onSubmit={createAdmin}><label>Full name<input value={adminForm.name} onChange={e=>setAdminForm({...adminForm,name:e.target.value})} placeholder="Administrator name" required/></label><label>Email address<input type="email" value={adminForm.email} onChange={e=>setAdminForm({...adminForm,email:e.target.value})} placeholder="admin@techmart.lk" required/></label><label>Temporary password<input type="password" minLength="6" value={adminForm.password} onChange={e=>setAdminForm({...adminForm,password:e.target.value})} placeholder="Minimum 6 characters" required/></label><small>Share the temporary password securely and ask the administrator to change it after signing in.</small><div className="admin-form-actions"><button type="button" onClick={()=>setActiveForm(null)}>Cancel</button><button className="primary" disabled={saving}>{saving?'Creating...':'Create Admin'}</button></div></form>:<form onSubmit={changePassword}><label>Current password<input type="password" value={passwordForm.oldPassword} onChange={e=>setPasswordForm({...passwordForm,oldPassword:e.target.value})} required/></label><label>New password<input type="password" minLength="6" value={passwordForm.password} onChange={e=>setPasswordForm({...passwordForm,password:e.target.value})} required/></label><label>Confirm new password<input type="password" minLength="6" value={passwordForm.confirmPassword} onChange={e=>setPasswordForm({...passwordForm,confirmPassword:e.target.value})} required/></label><div className="admin-form-actions"><button type="button" onClick={()=>setActiveForm(null)}>Cancel</button><button className="primary" disabled={saving}>{saving?'Updating...':'Update Password'}</button></div></form>}</section></div>}
  </div>;
};
export default AdminDashboard;
