import accounts from '../data/accounts.js';

export function getAll(req, res) {
    const response = {
        count: accounts.length,
        data: accounts
    };
    res.json(response);
}

export function getById(req, res) {
    const { id } = req.params;
    const account = accounts.find(acc => acc._id === id);

    const response = {
        finded: !!account,
        account: account || null
    };

    res.json(response);
}

export function getByQuery(req, res) {
    const { queryParam } = req.query;

    if (!queryParam) {
        return res.json({
            finded: false,
            message: "Parámetro de búsqueda requerido"
        });
    }

    // Por id 
    const accountById = accounts.find(acc => acc._id === queryParam);
    if (accountById) {
        return res.json({
            finded: true,
            account: accountById
        });
    }

    // nombre 
    const accountsByName = accounts.filter(acc =>
        acc.client.toLowerCase().includes(queryParam.toLowerCase())
    );

    // genero
    const accountsByGender = accounts.filter(acc =>
        acc.gender.toLowerCase().includes(queryParam.toLowerCase())
    );

    // aqui se unen los resultados
    const allResults = [...accountsByName, ...accountsByGender];
    const uniqueResults = allResults.filter((account, index, self) =>
        index === self.findIndex(a => a._id === account._id)
    );

    if (uniqueResults.length === 0) {
        return res.json({
            finded: false,
            account: null,
            data: []
        });
    }

    if (uniqueResults.length === 1) {
        return res.json({
            finded: true,
            account: uniqueResults[0]
        });
    }

    res.json({
        finded: true,
        data: uniqueResults
    });
}

export function getBalance(req, res) {
    const activeAccounts = accounts.filter(acc => acc.isActive === true);

    const hasActiveAccounts = activeAccounts.length > 0;

    let totalBalance = 0;
    if (hasActiveAccounts) {
        totalBalance = activeAccounts.reduce((sum, account) => {
            const balanceNumber = parseFloat(account.balance.replace(/[$,]/g, ''));
            return sum + balanceNumber;
        }, 0);
    }

    const response = {
        status: hasActiveAccounts,
        accountBalance: totalBalance
    };

    res.json(response);
}