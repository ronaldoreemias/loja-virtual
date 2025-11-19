import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import style from "./Checkout.module.css";

function Checkout() {
    const [produto, setProduto] = useState(null);
    const [dadosEntrega, setDadosEntrega] = useState({
        nome: "",
        email: "",
        telefone: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const produtoSalvo = localStorage.getItem('produtoSelecionado');
        if (produtoSalvo) {
            setProduto(JSON.parse(produtoSalvo));
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDadosEntrega(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const irParaPagamento = () => {
        const compraData = {
            produto,
            dadosEntrega,
            dataCompra: new Date().toISOString(),
            numeroPedido: Math.random().toString(36).substr(2, 9).toUpperCase()
        };

        localStorage.setItem('dadosCompra', JSON.stringify(compraData));
        
        navigate('/Pagamente');
    };

    if (!produto) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Navbar />
            <div className={style.containerPai}>
                <div className={style.containerCheckout}>
                    <div className={style.resumoPedido}>
                        <h2>Resumo do Pedido</h2>
                        <div className={style.produtoResumo}>
                            <img src={produto.imagem} alt={produto.nome} className={style.imagemResumo} />
                            <div className={style.detalhesResumo}>
                                <h3>{produto.nome}</h3>
                                <p>Cor: {produto.cor === "black" ? "Black Titanium" : "White Titanium"}</p>
                                <p>Armazenamento: {produto.armazenamento === "1024" ? "1 TB" : `${produto.armazenamento} GB`}</p>
                                <p className={style.precoResumo}>{produto.preco}</p>
                            </div>
                        </div>
                        <div className={style.total}>
                            <h3>Total: {produto.preco}</h3>
                        </div>
                    </div>

                    <div className={style.formularioEntrega}>
                        <h2>Dados de Entrega</h2>
                        <form className={style.form}>
                            <div className={style.campoDuplo}>
                                <div className={style.campo}>
                                    <label>Nome Completo *</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={dadosEntrega.nome}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={style.campo}>
                                    <label>E-mail *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={dadosEntrega.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={style.campoDuplo}>
                                <div className={style.campo}>
                                    <label>Telefone *</label>
                                    <input
                                        type="tel"
                                        name="telefone"
                                        value={dadosEntrega.telefone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={style.campo}>
                                    <label>CEP *</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={dadosEntrega.cep}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={style.campo}>
                                <label>Endereço *</label>
                                <input
                                    type="text"
                                    name="endereco"
                                    value={dadosEntrega.endereco}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className={style.campoDuplo}>
                                <div className={style.campo}>
                                    <label>Número *</label>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={dadosEntrega.numero}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={style.campo}>
                                    <label>Complemento</label>
                                    <input
                                        type="text"
                                        name="complemento"
                                        value={dadosEntrega.complemento}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className={style.campoDuplo}>
                                <div className={style.campo}>
                                    <label>Cidade *</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        value={dadosEntrega.cidade}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={style.campo}>
                                    <label>Estado *</label>
                                    <input
                                        type="text"
                                        name="estado"
                                        value={dadosEntrega.estado}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </form>

                        <button 
                            className={style.botaoContinuar}
                            onClick={irParaPagamento}
                            disabled={!dadosEntrega.nome || !dadosEntrega.email || !dadosEntrega.telefone || !dadosEntrega.cep || !dadosEntrega.endereco || !dadosEntrega.numero || !dadosEntrega.cidade || !dadosEntrega.estado}
                        >
                            Continuar para Pagamento
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;