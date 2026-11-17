import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import './OperationsPages.css';

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try { const { data } = await apiClient.get('/auth/admin/users'); setUsers(data.users || []); }
    catch (e) { if ([401, 403].includes(e.response?.status)) navigate('/login', { replace: true }); else setError(e.response?.data?.message || 'Could not load users.'); }
    finally { setLoading(false); }
  }, [navigate]);
  useEffect(() => { load(); }, [load]);
  const updateRole = async (user, nextRole) => {
    setError('');
    try { const { data } = await apiClient.put(`/auth/admin/user/${user._id}`, { name: user.name, email: user.email, role: nextRole }); setUsers(list => list.map(item => item._id === user._id ? data.user : item)); }
    catch (e) { setError(e.response?.data?.message || 'Could not update this account.'); }
  };
  const remove = async user => {
    if (!window.confirm(`Permanently delete ${user.name}'s account?`)) return;
    try { await apiClient.delete(`/auth/admin/user/${user._id}`); setUsers(list => list.filter(item => item._id !== user._id)); }
    catch (e) { setError(e.response?.data?.message || 'Could not delete this account.'); }
  };
  const visible = users.filter(user => (role === 'all' || user.role === role) && `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="ops-page"><header className="ops-header"><div><button onClick={() => navigate('/admin/dashboard')}>Back to dashboard</button><span>ADMIN CONSOLE</span><h1>User management</h1><p>Search accounts, review access, and manage marketplace roles.</p></div><button className="ops-primary" onClick={() => navigate('/admin/dashboard')}>Create administrator</button></header><main className="ops-shell">{error && <div className="ops-alert" role="alert">{error}</div>}<section className="ops-toolbar"><input aria-label="Search users" placeholder="Search name or email" value={query} onChange={e => setQuery(e.target.value)} /><select aria-label="Filter by role" value={role} onChange={e => setRole(e.target.value)}><option value="all">All roles</option><option value="user">Customers</option><option value="seller">Sellers</option><option value="admin">Administrators</option></select><strong>{visible.length} accounts</strong></section>{loading ? <div className="ops-state">Loading users...</div> : !visible.length ? <div className="ops-state"><h2>No accounts found</h2><p>Try another search or role filter.</p></div> : <section className="ops-table-wrap"><table className="ops-table"><thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead><tbody>{visible.map(user => <tr key={user._id}><td><strong>{user.name}</strong><small>{user.email}</small></td><td><select value={user.role} onChange={e => updateRole(user, e.target.value)} disabled={user.role === 'admin'}><option value="user">Customer</option><option value="seller">Seller</option></select></td><td><span className={`ops-status ${user.accountStatus || 'active'}`}>{user.accountStatus || 'active'}</span></td><td>{new Date(user.createdAt).toLocaleDateString()}</td><td><button className="ops-danger" disabled={user.role === 'admin'} onClick={() => remove(user)}>Delete</button></td></tr>)}</tbody></table></section>}</main></div>;
}
