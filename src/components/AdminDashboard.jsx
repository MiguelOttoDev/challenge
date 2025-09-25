import { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function AdminDashboard() {
  const [view, setView] = useState('supermarkets');
  const [supermarkets, setSupermarkets] = useState([
    { name: "SuperMax Centro", location: "Centro", products: 1250, sales: 3420, avgTicket: 45.80, status: "Bom" },
    { name: "MegaMart Norte", location: "Zona Norte", products: 980, sales: 2890, avgTicket: 52.30, status: "Regular" },
    { name: "EconoPlus Sul", location: "Zona Sul", products: 1450, sales: 4120, avgTicket: 38.90, status: "Excelente" },
    { name: "FreshMarket Leste", location: "Zona Leste", products: 1120, sales: 3250, avgTicket: 41.70, status: "Bom" },
  ]);

  const [filterName, setFilterName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSupermarket, setNewSupermarket] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    responsible: ''
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSupermarket(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMarket = {
      ...newSupermarket,
      products: 0,
      sales: 0,
      avgTicket: 0,
      status: 'Bom',
    };
    setSupermarkets(prev => [...prev, newMarket]);
    closeModal();
    setNewSupermarket({
      name: '',
      location: '',
      phone: '',
      email: '',
      responsible: '',
    });
  };

  const filteredSupermarkets = supermarkets.filter(market => {
    const matchesName = market.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesLocation = market.location.toLowerCase().includes(filterLocation.toLowerCase());
    if (filterName && filterLocation) return matchesName && matchesLocation;
    if (filterName) return matchesName;
    if (filterLocation) return matchesLocation;
    return true;
  });

  const totalSales = filteredSupermarkets.reduce((acc, cur) => acc + cur.sales, 0);
  const avgTicket = (totalSales / (filteredSupermarkets.length || 1)).toFixed(2);

  const salesData = {
    labels: ['Arroz', 'Leite', 'Pão', 'Refrigerante', 'Sabão'],
    datasets: [
      {
        label: 'Top 5 Produtos',
        data: [1200, 800, 600, 400, 300],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const paymentMethods = {
    labels: ['Cartão de Débito', 'Cartão de Crédito', 'PIX', 'Dinheiro'],
    datasets: [
      {
        data: [35, 22, 28, 15],
        backgroundColor: ['#1e40af', '#ff9e00', '#10b981', '#ef4444'],
      },
    ],
  };

  const salesEvolution = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Evolução de Vendas',
        data: [14000, 16000, 17000, 16500, 18000, 21000],
        borderColor: '#3b82f6',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    return () => {
      if (ChartJS.instances) {
        Object.values(ChartJS.instances).forEach(instance => {
          instance.destroy();
        });
      }
    };
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard do Administrador</h2>

      {/* Toggle de views */}
      <div className="flex space-x-2 mb-6">
        {['supermarkets', 'businessIntelligence'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm
              ${view === v ? 'bg-gray-300 text-gray-900 shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {v === 'supermarkets' ? 'Supermercados' : 'Business Intelligence'}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total de Supermercados</h3>
          <p className="text-3xl font-semibold">{filteredSupermarkets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Vendas do Mês</h3>
          <p className="text-3xl font-semibold">{totalSales}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Ticket Médio Geral</h3>
          <p className="text-3xl font-semibold">R$ {avgTicket}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Formas de Pagamento</h3>
          <p className="text-3xl font-semibold">{paymentMethods.labels.length}</p>
        </div>
      </div>

      {/* Views */}
      {view === 'supermarkets' ? (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">Gestão de Supermercados</h3>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Novo Supermercado
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
              placeholder="Filtrar por localização..."
              value={filterLocation}
              onChange={e => setFilterLocation(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-1/2"
            />
          </div>

          {/* Tabela responsiva */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[700px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Localização</th>
                  <th className="px-4 py-2 text-left">Nº de Produtos</th>
                  <th className="px-4 py-2 text-left">Nº de Vendas</th>
                  <th className="px-4 py-2 text-left">Ticket Médio</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupermarkets.map((market, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{market.name}</td>
                    <td className="px-4 py-2">{market.location}</td>
                    <td className="px-4 py-2">{market.products}</td>
                    <td className="px-4 py-2">{market.sales}</td>
                    <td className="px-4 py-2">R$ {market.avgTicket.toFixed(2)}</td>
                    <td className="px-4 py-2">{market.status}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <FaEye className="text-blue-600 cursor-pointer" />
                      <FaEdit className="text-yellow-600 cursor-pointer" />
                      <FaTrash className="text-red-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-12 rounded shadow h-80">
              <h3 className="text-lg font-semibold mb-2">Formas de Pagamento</h3>
              <Pie data={paymentMethods} options={{ maintainAspectRatio: false }} height={200} />
            </div>
            <div className="bg-white p-6 rounded shadow h-80">
              <h3 className="text-lg font-semibold mb-2">Vendas por Produto</h3>
              <Bar data={salesData} options={{ maintainAspectRatio: false }} height={200} />
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow h-80">
            <h3 className="text-lg font-semibold mb-2">Evolução de Vendas</h3>
            <Line data={salesEvolution} options={{ maintainAspectRatio: false }} height={200} />
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Novo Supermercado</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['name', 'location', 'phone', 'email', 'responsible'].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block font-medium capitalize">
                  {field === 'responsible' ? 'Responsável' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={newSupermarket[field]}
                  onChange={handleChange}
                  required={['name', 'location'].includes(field)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-300 rounded">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Criar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
