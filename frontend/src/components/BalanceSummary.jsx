import '../App.css'

function BalanceSummary({ data }) {
    // Si es el endpoint de balance
    if (data.accountBalance !== undefined) {
        return (
            <div className="balance-summary">
                <h2>Balance Total</h2>
                <div className={`balance-amount ${data.status ? 'positive' : 'negative'}`}>
                    ${data.accountBalance.toLocaleString()}
                </div>
                <p className="balance-status">
                    Estado: {data.status ? 'Cuentas activas encontradas' : 'No hay cuentas activas'}
                </p>
            </div>
        )
    }

    return null
}

export default BalanceSummary