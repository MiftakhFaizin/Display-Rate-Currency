import { useEffect, useState } from "react";

function App() {
  const currencys = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"]
  const weBuy = rate => (rate + ((rate * 5) / 100))
  const weSell = rate => (rate - ((rate * 5) / 100))
  const [rates, setRates] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=c071ba5383f1423597750b4cfbda10be')
        if (!res.ok) {
          let resError = await res.json()
          throw new Error(resError)
        }
  
        let datas = await res.json()
        setRates(datas.rates)
  
      } catch(error) {
        console.log("fetch data failed")
        console.log(error)
      }
    }
    
    fetchData()
  },[])

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-[30px] bg-orange-400">
        <table className="table w-[800px] text-center text-neutral-50">
          <thead className="text-[20px]">
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {rates !== undefined ? currencys.map((currency, index) => {
              return (
                <tr key={index}>
                  <td>{currency}</td>
                  <td>{weBuy(Number(rates[currency]))}</td>
                  <td>{Number(rates[currency])}</td>
                  <td>{weSell(Number(rates[currency]))}</td>
                </tr>
              )
            } ) : "" }
          </tbody>
        </table>
        <div className="flex flex-col text-center">
            <p className="text-neutral-50 text-[13px]">Rates are based from 1 USD.</p>
            <p className="text-neutral-50 text-[13px]">This Application Uses API from <a href="https://currencyfreaks.com">https://currencyfreaks.com.</a></p>
        </div>
    </div>
  )
}

export default App;
