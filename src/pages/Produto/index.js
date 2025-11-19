import Navbar from "../../component/Navbar";
import style from "./Produto.module.css";
import phone1 from "../../assets/mockup-gs-10683-capa-silicon-premium-iphone-16-pro-max-preta-68odzlao8j.png";
import phone2 from "../../assets/download (1).png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Produto(){
    const [corSelecionada, setCorSelecionada] = useState("black");
    const [armazenamentoSelecionado, setArmazenamentoSelecionado] = useState("128");
    const [fotoPrincipal, setFotoPrincipal] = useState(phone1);
    const navigate = useNavigate();
    
    // Preços por armazenamento
    const precos = {
        "128": "R$ 2.500,00",
        "256": "R$ 5.000,00", 
        "512": "R$ 6.000,00",
        "1024": "R$ 8.000,00"
    };

    // Função para trocar a foto principal
    const trocarFotoPrincipal = (novaFoto) => {
        setFotoPrincipal(novaFoto);
    };

    // Função para salvar dados e navegar para checkout
    const comprarAgora = () => {
        const produtoData = {
            nome: "iPhone 16 Pro Max",
            cor: corSelecionada,
            armazenamento: armazenamentoSelecionado,
            preco: precos[armazenamentoSelecionado],
            imagem: fotoPrincipal,
            dataCompra: new Date().toISOString()
        };

        // Salvar no localStorage
        localStorage.setItem('produtoSelecionado', JSON.stringify(produtoData));
        
        // Navegar para página de checkout
        navigate('/Checkout');
    };

    return(
        <>
            <Navbar />
            <br/>
            <div className={style.contanerPai}>
                <div className={style.contanerProduto}>
                    <div className={style.FotoProduto}>
                        <div className={style.FotoPrincipal}>
                            <img src={fotoPrincipal} className={style.phone1} alt="iPhone 16 Pro Max - Vista principal" />
                        </div>
                        <div className={style.Fotoslateral}>
                            <div onClick={() => trocarFotoPrincipal(phone1)} className={style.miniatura}>
                                <img src={phone1} className={style.phone} alt="iPhone 16 Pro Max - Vista 1" />    
                            </div>
                            <div onClick={() => trocarFotoPrincipal(phone2)} className={style.miniatura}>
                                <img src={phone2} className={style.phone} alt="iPhone 16 Pro Max - Vista 2" />    
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className={style.informacoesProduto}>
                        <div className={style.NomeProduto}>
                            <p>Mais vendido</p>
                            <h2>
                                iPhone 16 Pro Max
                            </h2>
                            <h3>Titanium {corSelecionada === "black" ? "Black" : "White"}</h3>
                        </div>
                        <div className={style.mostrarvalor}>
                            <div className={style.estrelasdeavaliacao}>
                                <div className={style.avaliacao}>
                                    <span className={style.estrelas}>★★★★★</span>
                                    <p>4.9 (3.842 avaliações)</p>
                                </div>
                                <br/>
                                <p className={style.disponibilidade}>Disponível para envio imediato</p>
                            </div>
                            <br/>
                            <div className={style.valor}>
                                <h2>{precos[armazenamentoSelecionado]}</h2>
                                <p>ou 12x de R$ {(parseFloat(precos[armazenamentoSelecionado].replace('R$ ', '').replace('.', '').replace(',', '.')) / 12).toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                        <div className={style.escolhacor}>
                            <h3>Cor:</h3>
                            <div className={style.opcoesCor}>
                                <button 
                                    className={`${style.botaoCor} ${corSelecionada === "black" ? style.selecionado : ""} ${style.corBlack}`}
                                    onClick={() => setCorSelecionada("black")}
                                    aria-label="Cor Black Titanium"
                                >
                                    <span className={style.bolinhaCor}></span>
                                </button>
                                <button 
                                    className={`${style.botaoCor} ${corSelecionada === "white" ? style.selecionado : ""} ${style.corWhite}`}
                                    onClick={() => setCorSelecionada("white")}
                                    aria-label="Cor White Titanium"
                                >
                                    <span className={style.bolinhaCor}></span>
                                </button>
                            </div>
                            <p className={style.nomeCorSelecionada}>
                                {corSelecionada === "black" ? "Black Titanium" : "White Titanium"}
                            </p>
                        </div>
                        <div className={style.escolhaarmazenamento}>
                            <h3>Armazenamento:</h3>
                            <div className={style.opcoesArmazenamento}>
                                {["128", "256", "512", "1024"].map((gb) => (
                                    <button
                                        key={gb}
                                        className={`${style.botaoArmazenamento} ${armazenamentoSelecionado === gb ? style.selecionado : ""}`}
                                        onClick={() => setArmazenamentoSelecionado(gb)}
                                    >
                                        {gb === "1024" ? "1 TB" : `${gb} GB`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={style.botaoComprar}>
                            <h4>Entrega rápida e grátis</h4>
                            <p>Receba em 24 horas nas principais capitais</p>
                        </div>
                        <button className={style.botaoPrincipal} onClick={comprarAgora}>
                                Comprar agora
                        </button>
                        <div className={style.textoInformativo}>
                            <p>Garantia Apple: 1 ano de garantia padrão contra defeitos de fabricação.</p>
                            <p>Política de devolução: 14 dias para devolução sem custo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>        
    );
}

export default Produto;