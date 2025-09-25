function EmployeeDashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Dashboard do Funcionário</h2>
      {/* Informações limitadas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3>Vendas do Dia</h3>
          <p>89</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3>Receita do Dia</h3>
          <p>R$ 3.420</p>
        </div>
      </div>
    </div>
  );
}
export default EmployeeDashboard;