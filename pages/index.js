import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import HeadComponent from '../components/Head';
import Product from '../components/Product';
import CreateProduct from "../components/CreateProduct";

// Constants
const HANDLE = "Sivasankar";
const LINK = "https://proud-truth-2826.on.fleek.co/";

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);

  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://media4.giphy.com/media/ule4vhcY1xEKQ/giphy.gif?cid=ecf05e47nmeqp2tn54quqq9vuqwgyz6ljixhkduednblvv3c&rid=giphy.gif&ct=g" alt="emoji" />

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>    
    </div>
  );

  useEffect(()=>{
    if(publicKey){
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products",data);
        });
    }
  },[publicKey])

  const renderItemBuyContainer=()=>(
    <div className='products-container'>
      {products.map((product)=>(
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App">
    <HeadComponent />
      <div className="container">
        <header className="header-container">
          <p className="header">( ͡❛ ͜ʖ ͡❛) Solana-Marketplace</p>
          <p className="sub-text">Buy Memes on our store using Solana Pay💸</p>

          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        <div className="footer-container">
          <a
            className="handle"
            href={LINK}
              >@{HANDLE}</a>
        </div>
      </div>
    </div>
  );
};

export default App;