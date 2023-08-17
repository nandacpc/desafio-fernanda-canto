class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        this.descontos = {
            dinheiro: 0.05,
        };

        this.acrescimos = {
            credito: 0.03,
        };
        
        this.itensPrincipais = {
            cafe: true,
            suco: true,
            sanduiche: true,
            salgado: true,
            combo1: true,
            combo2: true,
        };

        this.itensExtras = {
            chantily: 'cafe',
            queijo: 'sanduiche',
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.validarFormaDePagamento(formaDePagamento) || !this.validarItens(itens)) {
            if (itens.length === 0) {
                return "Não há itens no carrinho de compra!";
            }
            if (itens.some(item => parseInt(item.split(',')[1]) === 0)) {
                return "Quantidade inválida!";
            }
            return "Item inválido!";
        }

        let total = 0;
        let principais = {};

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (!this.cardapio.hasOwnProperty(codigo)) {
                return "Item inválido!";
            }

            if (this.itensPrincipais[codigo]) {
                principais[codigo] = (principais[codigo] || 0) + parseInt(quantidade);
            } else {
                const itemPrincipal = this.itensExtras[codigo];
                if (!principais[itemPrincipal]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }

        for (const codigo in principais) {
            total += this.cardapio[codigo] * principais[codigo];
        }

        if (formaDePagamento === 'dinheiro') {
            total -= total * this.descontos.dinheiro;
        } else if (formaDePagamento === 'credito') {
            total += total * this.acrescimos.credito;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    validarFormaDePagamento(formaDePagamento) {
        return ['debito', 'credito', 'dinheiro'].includes(formaDePagamento);
    }

    validarItens(itens) {
        if (itens.length === 0) {
            return false;
        }

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (!this.cardapio.hasOwnProperty(codigo) && !this.cardapio.hasOwnProperty(codigo.split(':')[0])) {
                return false;
            }

            if (parseInt(quantidade) <= 0) {
                return false;
            }
        }

        return true;
    }
}

export { CaixaDaLanchonete };
