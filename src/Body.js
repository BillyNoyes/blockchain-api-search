import React, { useState, useEffect } from "react";
import "./Body.css";
import axios from "axios";

function Body() {
  const [input, setInput] = useState("");
  const [btcAddress, setBtcAddress] = useState();
  const [btcBalance, setBtcBalance] = useState("");
  const [btcTransactions, setBtcTransactions] = useState([]);

  useEffect(() => {
    // setBtcTransactions();
  }, []);

  const searchAddress = (e) => {
    e.preventDefault();

    async function fetchData() {
      const request = await axios.get(
        `https://blockchain.info/rawaddr/${input}?cors=true`
      );
      setBtcAddress(input);
      setBtcTransactions(request.data.txs);
      setBtcBalance(request.data.final_balance / 100000000);
      console.log(request.data);
      return request;
    }
    fetchData();

    setInput("");
  };

  return (
    <div className="body">
      <img
        src="https://www.blockchain.com/Resources/white-blockchain.svg?7ba0652cdc5a312d"
        alt="Blockchain logo"
      />
      <div className="body__displayInfo">
        <h2>Example BTC Address: 15NEWH9m5fsemifaxg2Q3o3gDWdoqSUzjD</h2>
        {btcAddress && (
          <p className="body__btcAddress">BTC Address: {btcAddress}</p>
        )}
        {btcBalance && (
          <p className="body__btcBalance">BTC Balance: {btcBalance} BTC</p>
        )}
      </div>

      <form>
        <input
          inputMode="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search 34 Character BTC Address"
        />
        <button
          type="submit"
          onClick={searchAddress}
          disabled={input.length !== 34}
        >
          SEARCH
        </button>
      </form>
      {btcTransactions.map((btcTransaction, index) => (
        <p key={index} className="body__transaction">
          <span>Transaction: </span> {btcTransaction.block_height}{" "}
          {btcTransaction.hash} {btcTransaction.size} {btcTransaction.weight}
        </p>
      ))}
    </div>
  );
}

export default Body;
