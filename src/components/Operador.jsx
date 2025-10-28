import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';

function Operador() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState({
    gender: '',
    socioeconomicClass: '',
    ageGroup: '',
    purchaseFrequency: ''
  });

  const [salesData, setSalesData] = useState({
    salesToday: 23,
    itemsSold: 67,
    revenueToday: 1248.0,
    lastSaleTime: "15:32"
  });

  const productList = [
    { name: "Arroz 5kg", price: 25.90 },
    { name: "Leite Integral 1L", price: 4.50 },
    { name: "Pão Francês", price: 12.00 },
    { name: "Refrigerante 2L", price: 8.90 },
    { name: "Óleo 900ml", price: 7.20 },
    { name: "Café Torrado 500g", price: 15.00 },
    { name: "Açúcar 1kg", price: 3.80 },
    { name: "Farinha de Trigo 1kg", price: 4.30 }
  ];

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProduct = (productName) => {
    setSelectedProducts(prevSelected => {
      const exists = prevSelected.find(item => item.name === productName);
      if (exists) {
        return prevSelected.filter(item => item.name !== productName);
      } else {
        const product = productList.find(item => item.name === productName);
        return [...prevSelected, { ...product, quantity }];
      }
    });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  };

  const total = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Venda registrada! ✅');

    setSelectedProducts([]);
    setQuantity(1);
    setPaymentMethod('');
    setDate('');
    setSearchTerm('');
    setClientData({
      gender: '',
      socioeconomicClass: '',
      ageGroup: '',
      purchaseFrequency: ''
    });
  };

  const isFormValid =
    selectedProducts.length > 0 &&
    quantity &&
    paymentMethod &&
    clientData.gender &&
    clientData.socioeconomicClass &&
    clientData.ageGroup &&
    clientData.purchaseFrequency;

  return (
    <div className="p-8 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Vendas Hoje", value: salesData.salesToday },
          { label: "Itens Vendidos", value: salesData.itemsSold },
          { label: "Receita do Dia", value: `R$ ${salesData.revenueToday.toFixed(2)}` },
          { label: "Última Venda", value: salesData.lastSaleTime }
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-sm text-gray-500">{card.label}</h3>
            <p className="text-3xl font-semibold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Dados do Cliente</h3>

            {[
              { label: 'Gênero', options: ['Masculino', 'Feminino', 'Outro'], field: 'gender' },
              { label: 'Classe Socioeconômica', options: ['A', 'B', 'C', 'D', 'E'], field: 'socioeconomicClass' },
              { label: 'Faixa Etária', options: ['18-24 anos', '25-34 anos', '35-44 anos', '45-54 anos', '55+ anos'], field: 'ageGroup' },
              { label: 'Frequência de Compra', options: ['Diária', 'Semanal', 'Mensal', 'Ocasional'], field: 'purchaseFrequency' }
            ].map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm text-gray-700">{field.label}</label>
                <select
                  value={clientData[field.field]}
                  onChange={(e) => setClientData({ ...clientData, [field.field]: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Dados da Compra</h3>

            {/* Filtro */}
            <div className="space-y-2">
              <label className="text-sm text-gray-700">Buscar Produtos</label>
              <input
                type="text"
                placeholder="Digite para filtrar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lista de produtos */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredProducts.map((productItem, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.some(item => item.name === productItem.name)}
                    onChange={() => toggleProduct(productItem.name)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-gray-600">
                    {productItem.name} - R$ {productItem.price.toFixed(2)}
                  </label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Quantidade</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Forma de Pagamento</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="credito">Cartão de Crédito</option>
                <option value="debito">Cartão de Débito</option>
                <option value="pix">PIX</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Data e Hora</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="text-right mb-6">
          <p className="text-lg font-semibold text-gray-700">
            Total: R$ {total.toFixed(2)}
          </p>
        </div>

        <button
          type="submit"
          className={`w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-all ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isFormValid}
        >
          Registrar Venda <FaCartPlus className="inline ml-2" />
        </button>
      </form>
    </div>
  );
}

export default Operador;
