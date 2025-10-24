import { useState } from 'react'
import '../App.css'

function SearchForm({ onSearchById, onSearchByQuery, loading }) {
    const [searchId, setSearchId] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const handleIdSearch = (e) => {
        e.preventDefault()
        onSearchById(searchId)
        setSearchId('')
    }

    const handleQuerySearch = (e) => {
        e.preventDefault()
        onSearchByQuery(searchQuery)
        setSearchQuery('')
    }

    return (
        <div className="search-section">
            <div className="search-header">
                <h3>Buscar cuentas</h3>
            </div>
            
            <div className="search-forms">
                <div className="search-group">
                    <label htmlFor="id-search">Buscar por ID</label>
                    <form onSubmit={handleIdSearch} className="search-form">
                        <input
                            id="id-search"
                            type="text"
                            placeholder="Ej: 68fac8aedb6ccbae7b13ad89"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !searchId}>
                            Buscar
                        </button>
                    </form>
                </div>

                <div className="search-group">
                    <label htmlFor="query-search">Buscar por nombre o género</label>
                    <form onSubmit={handleQuerySearch} className="search-form">
                        <input
                            id="query-search"
                            type="text"
                            placeholder="Ej: Priscilla, Blair, female, male"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !searchQuery}>
                            Buscar
                        </button>
                    </form>
                    <div className="search-hint">
                        <small>Buscar por nombre completo, primer nombre, apellido o género</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchForm