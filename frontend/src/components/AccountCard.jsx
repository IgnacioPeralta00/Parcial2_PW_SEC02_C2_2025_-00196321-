import '../App.css'

function AccountCard({ account }) {
    if (!account) return null

    return (
        <div className={`account-card ${account.isActive ? 'active' : 'inactive'}`}>
            <div className="account-header">
                <img src={account.picture} alt={account.client} className="account-picture" />
                <div className="account-info">
                    <h3 className="account-name">{account.client}</h3>
                    <span className={`account-status ${account.isActive ? 'status-active' : 'status-inactive'}`}>
                        {account.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                </div>
            </div>

            <div className="account-details">
                <p><strong>ID:</strong> {account._id}</p>
                <p><strong>Balance:</strong> {account.balance}</p>
                <p><strong>Género:</strong> {account.gender}</p>
            </div>
        </div>
    )
}

export default AccountCard