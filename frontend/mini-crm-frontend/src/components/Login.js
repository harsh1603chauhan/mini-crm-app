import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      marginTop: '-56px' 
    }}>
      <div className="card shadow-lg text-center p-4" style={{
        maxWidth: '400px',
        width: '100%',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
      }}>
        <h3 className="mb-3 text-primary fw-bold">Login to Mini CRM</h3>
        <p className="mb-4 text-muted">Manage campaigns easily with Google login</p>
        <button
          className="btn btn-outline-primary btn-lg rounded-pill w-100"
          onClick={handleGoogleLogin}
        >
          <i className="bi bi-google me-2"></i>Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
