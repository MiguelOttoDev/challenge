import { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function SupermercadoDashboard() {
  const [view, setView] = useState('products'); 

  const [products, setProducts] = useState([
    { name: "Arroz Tipo 1", category: "Alimentos", price: 20.50, stock: 150, status: "Disponível" },
    { name: "Leite Integral", category: "Bebidas", price: 4.30, stock: 80, status: "Disponível" },
    { name: "Sabão em Pó", category: "Limpeza", price: 15.00, stock: 40, status: "Pouco estoque" },
    { name: "Pão Francês", category: "Padaria", price: 1.50, stock: 300, status: "Disponível" },
  ]);

  const [sales, setSales] = useState([
    { product: "Arroz Tipo 1", quantity: 5, ticket: 102.5, payment: "Cartão", datetime: "2025-09-24 10:30", profile: "Regular", frequency: "Semanal" },
    { product: "Leite Integral", quantity: 2, ticket: 8.6, payment: "PIX", datetime: "2025-09-24 11:00", profile: "Novo", frequency: "Único" },
    { product: "Pão Francês", quantity: 10, ticket: 15, payment: "Dinheiro", datetime: "2025-09-24 12:00", profile: "Regular", frequency: "Diário" },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', status: '' });

  // Filtros
  const [filterName, setFilterName] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
    };
    setProducts(prev => [...prev, productToAdd]);
    closeModal();
    setNewProduct({ name: '', category: '', price: '', stock: '', status: '' });
  };

  const totalProducts = products.length;
  const salesToday = sales.length;
  const revenueToday = sales.reduce((acc, cur) => acc + cur.ticket, 0);
  const avgTicket = (revenueToday / (salesToday || 1)).toFixed(2);

  // Dados para gráfico de barras: Vendas por categoria
  const categories = [...new Set(products.map(p => p.category))];
  const salesByCategory = categories.map(cat => {
    return sales
      .filter(s => products.find(p => p.name === s.product)?.category === cat)
      .reduce((acc, cur) => acc + cur.ticket, 0);
  });

  const barData = {
    labels: categories,
    datasets: [{
      label: 'Vendas por Categoria',
      data: salesByCategory,
      backgroundColor: '#3b82f6',
    }],
  };

  // Dados para gráfico de pizza: Métodos de pagamento
  const paymentMethods = [...new Set(sales.map(s => s.payment))];
  const salesByPayment = paymentMethods.map(method =>
    sales.filter(s => s.payment === method).reduce((acc, cur) => acc + cur.ticket, 0)
  );

  const pieData = {
    labels: paymentMethods,
    datasets: [{
      data: salesByPayment,
      backgroundColor: ['#1e40af', '#ff9e00', '#10b981', '#ef4444'],
    }],
  };

  // Produtos filtrados
  const filteredProducts = products.filter(prod => {
    const matchesName = prod.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesCategory = prod.category.toLowerCase().includes(filterCategory.toLowerCase());

    if (filterName && filterCategory) return matchesName && matchesCategory;
    if (filterName) return matchesName;
    if (filterCategory) return matchesCategory;
    return true;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard do Supermercado</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total de Produtos</h3>
          <p className="text-3xl font-semibold">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Vendas Hoje</h3>
          <p className="text-3xl font-semibold">{salesToday}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Receita do Dia</h3>
          <p className="text-3xl font-semibold">R$ {revenueToday.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Ticket Médio</h3>
          <p className="text-3xl font-semibold">R$ {avgTicket}</p>
        </div>
      </div>

      {/* Toggle moderno */}
      <div className="flex space-x-2 mb-6">
        {['products', 'sales', 'charts'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm
              ${view === v ? 'bg-gray-300 text-gray-900 shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {v === 'products' ? 'Produtos' : v === 'sales' ? 'Vendas' : 'Gráficos'}
          </button>
        ))}
      </div>

      {/* Views */}
      {view === 'products' && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">Lista de Produtos</h3>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Novo Produto
            </button>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Filtrar por nome..."
              value={filterName}
              onChange={e => setFilterName(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-1/2"
            />
            <input
              type="text"
              placeholder="Filtrar por categoria..."
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-1/2"
            />
          </div>

          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Produto</th>
                <th className="px-4 py-2 text-left">Categoria</th>
                <th className="px-4 py-2 text-left">Preço</th>
                <th className="px-4 py-2 text-left">Estoque</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{prod.name}</td>
                  <td className="px-4 py-2">{prod.category}</td>
                  <td className="px-4 py-2">R$ {prod.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{prod.stock}</td>
                  <td className="px-4 py-2">{prod.status}</td>
                  <td className="px-4 py-2 flex gap-3">
                    <FaEye className="text-blue-600 cursor-pointer" title="Visualizar" />
                    <FaEdit className="text-yellow-600 cursor-pointer" title="Editar" />
                    <FaTrash className="text-red-600 cursor-pointer" title="Excluir" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'sales' && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Lista de Vendas</h3>
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Produto</th>
                <th className="px-4 py-2 text-left">Qtd</th>
                <th className="px-4 py-2 text-left">Ticket</th>
                <th className="px-4 py-2 text-left">Pagamento</th>
                <th className="px-4 py-2 text-left">Data/Hora</th>
                <th className="px-4 py-2 text-left">Perfil do Cliente</th>
                <th className="px-4 py-2 text-left">Frequência</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{sale.product}</td>
                  <td className="px-4 py-2">{sale.quantity}</td>
                  <td className="px-4 py-2">R$ {sale.ticket.toFixed(2)}</td>
                  <td className="px-4 py-2">{sale.payment}</td>
                  <td className="px-4 py-2">{sale.datetime}</td>
                  <td className="px-4 py-2">{sale.profile}</td>
                  <td className="px-4 py-2">{sale.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'charts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow h-80 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2">Vendas por Categoria</h3>
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-80 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4">Métodos de Pagamento</h3>
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Novo Produto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['name', 'category', 'price', 'stock', 'status'].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block font-medium capitalize">{field}</label>
                <input
                  type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                  id={field}
                  name={field}
                  value={newProduct[field]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Criar</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default SupermercadoDashboard;
