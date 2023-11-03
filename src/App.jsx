import { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import ReactCountryFlag from "react-country-flag"
// import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import './App.css'

function App() {
  const [src, setSrc] = useState(0);
  const [des, setDist] = useState(0);
  const [sCont, setScont] = useState();
  const [dCont, setDcont] = useState();
  const [conv, setConv] = useState(2.1);
  const [s, setS] = useState({iso2:""});
  const [d, setD] = useState({iso2:""});
  const handleVals = (e) => {
    setSrc(parseInt(e.target.value));
  }
  useEffect(() => {
    handleDes();
  }, [src])

  const handleCountry1 = (e) => {
    setS(e);
    setScont(e.currency_code);
  }
  const handleCountry2 = (e) => {
    setD(e);
    setDcont(e.currency_code);
  }
  const handleDes = () => {
    setDist((src * conv));
  }
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://api.exchangeratesapi.io/v1/convert?access_key=9297371cdeee64cfa05ec2c5b34bb6a4&from=USD&to=INR&amount=1',
    };

    axios.request(config)
      .then((res) => {
        console.log("Data received : ");
        console.log(res);
        setConv(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dCont, sCont])
  const [options, setOptions] = useState();
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.jsonbin.io/v3/b/6543f60954105e766fca90df',
      headers: {
        'X-Access-key': '$2a$10$kQJ59cteMLNejRlXf31xvOuyACaVadyJuuhB.hffzH6Qqx9iCAVW.'
      }
    };
    axios.request(config)
      .then((response) => {
        const valArray = response.data.record;
        valArray.forEach((row) => {
          row.value = row["short_name"];
          row.label = row["currency_code"] + " | " + row["short_name"] ;
        })
        setOptions(valArray);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const reverse = () => {
    setS(d);
    setD(s);
    setSrc(des);
    setDist(src);
    setConv(1/conv);
    handleDes();
  }
  return (
    <div className='par-div'>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div className='head-div'><p className='heading'>What amount are you looking to transfer?</p></div>
        <div style={{ display: "flex", rowGap: "29px", flexDirection: "column" }}>
          <div>
            <div style={{ width: "14.6rem" }} className='sel-div' >
              <Select options={options} placeholder="Country" value={s} onChange={handleCountry1} />
            </div>
              <ReactCountryFlag countryCode={s.iso2}
                svg
                style={{
                    width: '2em',
                    height: '3em',
                    paddingBottom:"17px"
                }}
                />
            <input className='input-design' type='number' onChange={handleVals} value={src.toFixed(3)} />
          </div>
          <div style={{textAlign:"center"}}>
            <button onClick={reverse}>
              reverse
            </button>
          </div>
          <div>
            <div style={{ width: "14.6rem" }} className='sel-div'>
              <Select options={options} placeholder="Country" value={d} onChange={handleCountry2} />
            </div>
            <ReactCountryFlag countryCode={d.iso2}
                svg
                style={{
                    width: '2em',
                    height: '3em',
                    paddingBottom:"17px"
                }}
                />
            <input className='input-design' type='number' value={des.toFixed(3)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
