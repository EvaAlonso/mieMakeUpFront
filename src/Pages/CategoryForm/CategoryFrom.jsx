import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryForm({ categoryId }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await response.json();
      setCategory(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = categoryId ? `/api/categories/${categoryId}` : "/api/categories";
      const method = categoryId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error("Failed to save category");
      }
      navigate("/admin/categories");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="h-150">
    <form onSubmit={handleSubmit} className="space-y-4 mt-50 ">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Nombre de la Categoría
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={category.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {categoryId ? "Actualizar Categoría" : "Crear Categoría"}
      </button>
    </form>
    </section>
  );
}
