import { useState, useRef } from 'react'
import './App.css'
import AccountCard from './components/AccountCard'
import BalanceSummary from './components/BalanceSummary'
import SearchForm from './components/SearchForm'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const resultsRef = useRef(null)

  const API_BASE = 'http://localhost:3130'

  const scrollToResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  const fetchAllAccounts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/cuentas`)
      const result = await response.json()
      setData(result)
      scrollToResults()
    } catch (err) {
      setError('Error al obtener las cuentas')
    } finally {
      setLoading(false)
    }
  }

  const fetchAccountById = async (id) => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/cuentas/${id}`)
      const result = await response.json()
      setData(result)
      scrollToResults()
    } catch (err) {
      setError('Error al obtener la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const fetchByQuery = async (query) => {
    if (!query) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/cuentasQuery?queryParam=${query}`)
      const result = await response.json()
      setData(result)
      scrollToResults()
    } catch (err) {
      setError('Error en la búsqueda')
    } finally {
      setLoading(false)
    }
  }

  const fetchBalance = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/cuentasBalance`)
      const result = await response.json()
      setData(result)
      scrollToResults()
    } catch (err) {
      setError('Error al obtener el balance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Cuentas</h1>
      </header>

      <main className="app-main">
        <div className="controls">
          <SearchForm
            onSearchById={fetchAccountById}
            onSearchByQuery={fetchByQuery}
            loading={loading}
          />
          <button
            className="btn btn-primary"
            onClick={fetchAllAccounts}
            disabled={loading}
          >
            Obtener Todas las Cuentas
          </button>
          <button
            className="btn btn-secondary"
            onClick={fetchBalance}
            disabled={loading}
          >
            Ver Balance Total
          </button>
        </div>

        {loading && <div className="loading">Cargando...</div>}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <div ref={resultsRef}>
          {data && (
            <div className="results">
              <BalanceSummary data={data} />

              {/* Mostrar cuenta individual */}
              {data.account && (
                <div className="single-result">
                  <h3>Cuenta Encontrada:</h3>
                  <AccountCard account={data.account} />
                </div>
              )}

              {/* Mostrar multipkes cuentas */}
              {data.data && Array.isArray(data.data) && (
                <div className="multiple-results">
                  <h3>
                    {data.count ? `${data.count} Cuentas Encontradas` : `${data.data.length} Resultados`}
                  </h3>
                  <div className="accounts-grid">
                    {data.data.map(account => (
                      <AccountCard key={account._id} account={account} />
                    ))}
                  </div>
                </div>
              )}

              {/* Mostrar estado de busqueda */}
              {data.finded === false && (
                <div className="no-results">
                  No se encontraron resultados
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App