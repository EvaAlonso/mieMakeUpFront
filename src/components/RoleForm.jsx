import { useState } from 'react';

const RoleForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('costumer');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    // Recordatorio contraseña con mínimo 8 caracteres, una mayúscula y un número
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setIsPasswordValid(regex.test(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    if (role === 'admin' && !isPasswordValid) {
      setErrorMessage('Password must be at least 8 characters, with one uppercase letter and one number.');
      return;
    }

    try {
      
      const response = await fetch('http://localhost:8080/api/consumer/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, password })
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      // Handle success
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Role and Authentication Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            className="mt-1 block w-full p-2 border rounded-md"
            value={role}
            onChange={handleRoleChange}
            required
          >
            <option value="costumer">Costumer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role === 'admin' && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border rounded-md"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {!isPasswordValid && <p className="text-red-500 text-sm">Password must be at least 8 characters, with one uppercase letter and one number.</p>}
          </div>
        )}

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RoleForm;
